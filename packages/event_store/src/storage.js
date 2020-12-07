const { Op } = require("sequelize");

class Storage {
    constructor(models, pubsub = null) {
        this.models = models;
        this.pubsub = pubsub;
    }

    async onFinalizedBlock(event) {
        let existingBlock = await this.models.Block.findOne({where: {blockHeight: event.height}});
        if (existingBlock !== null) {
            // logs msg
            console.warn("\n\tWARN: event is a duplicate of existing block at height: " + event.height);
            console.warn("\tThis may cause problems in subsequent events\n");
            return;
        };
        await this.models.Block.create({
            blockHeight: event.height,
            blockHash: null,
            timestamp: event.timestamp,
            eraId: event.era_id,
            proposer: event.proposer,
            state: 'finalized',
            Deploys: event.proto_block.deploys.map(deployHash => {
                return {
                    deployHash: deployHash,
                    state: 'finalized'
                }
            })
        }, {
            include: [ this.models.Block.Deploys ]
        });
    }

    async onDeployProcessed(event) {
        let deploy = await this.findDeployByHash(event.deploy_hash);
        if (deploy === null || deploy.state !== 'finalized'){
            // logs msg
            console.warn("\n\tWARN: Could not find existing finalized deploy to process");
            console.warn("\tThis might be due to a problem in the corresponding blockFinalized event\n");
            return;
        }

        deploy.account = event.account;
        deploy.state = 'processed';

        if (event.execution_result.Success) {
            let result = event.execution_result.Success;
            deploy.cost = result.cost;
            deploy.errorMessage = null;
            result.transfers.forEach(transferHash => {
                result.effect.transforms.forEach(async transform => {
                    if(transform.key != transferHash) {
                        return;
                    }
                    let transferEvent = transform.transform.WriteTransfer;
                    await this.models.Transfer.create({
                        transferHash: transferHash,
                        deployHash: deploy.deployHash,
                        fromAccount: transferEvent.from.substring(13),
                        sourcePurse: transferEvent.source,
                        targetPurse: transferEvent.target,
                        amount: transferEvent.amount,
                        id: transferEvent.id
                    });
                });
            });
        } else {
            let result = event.execution_result.Failure;
            deploy.errorMessage = result.error_message;
            deploy.cost = result.cost;
        }

        await deploy.save();

        if(this.pubsub !== null) {
            this.pubsub.broadcast_deploy(await deploy.toJSON());
        }
    }

    async onBlockAdded(event) {
        let block = await this.findBlockByHeight(event.block_header.height);
        if (block === null || block.state !== 'finalized') {
            // logs msg
            console.warn("\n\tWARN: block missing at height: " + event.block_header.height);
            console.warn("\tThis might be due to a problem in the corresponding blockFinalized event\n");
            return;
        }
        block.state = 'added';
        block.parentHash = event.block_header.parent_hash;
        block.blockHash = event.block_hash;
        await block.save();

        if(this.pubsub !== null){
            this.pubsub.broadcast_block(await block.toJSON());
        }
    }

    async findBlockByHeight(height) {
        return this.models.Block.findByPk(height, {
            include: this.models.Deploy
        });
    }

    async findBlockByHash(blockHash) {
        return this.models.Block.findOne({
            where: { 
                blockHash: blockHash 
            } 
        }, {
            include: this.models.Deploy
        });
    }

    async findBlocks(limit, offset) {
        // console.("findBlocks");
        let blocks = await this.models.Block.findAll({
            limit: limit,
            offset: offset,
            order: [['blockHeight', 'DESC']]
        });
        // console.timeEnd("findBlocks");
        let count = await this.models.Block.count();
        return {
            rows: blocks,
            count: count
        }
    }

    async findDeployByHash(deployHash) {
        return this.models.Deploy.findByPk(deployHash, {
            include: this.models.Block
        });
    }

    async findDeploysByAccount(account, limit, offset) {
        return this.models.Deploy.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['blockHeight', 'DESC']],
            where: {
                account: account
            }
        });
    }

    async findTransfers(purseUref) {
        return this.models.Transfer.findAll({
            where: {
                [Op.or]: [
                    {
                        sourcePurse: purseUref
                    },{
                        targetPurse: purseUref
                    }
                ]
            }
        });
    }
    

}

module.exports = Storage
const { Op } = require("sequelize");

class Storage {
    constructor(models, pubsub = null) {
        this.models = models;
        this.pubsub = pubsub;
    }

    async onEventId(id) {
        console.log(`Processing Id event: ${id}`);

        let found = await this.findEventId(id);
        if (found !== null) {
            // logs msg
            console.warn(`Id ${id} already exists. Skipping`);
            return;
        }

        await this.models.EventId.create({ id });
    }

    async onDeployProcessed(event) {

        console.log(`Processing DeployProcessed event. DeployHash: ${event.deploy_hash}.`);
        let deploy = await this.findDeployByHash(event.deploy_hash);
        if (deploy !== null){
            // logs msg
            console.warn(`Deploy ${event.deploy_hash} already exists. Skipping.`);
            return;
        }

        let deployData = {
            deployHash: event.deploy_hash,
            account: event.account,
            timestamp: null, // BlockAdded event will have that info.
        };

        if (event.execution_result.Success) {
            let result = event.execution_result.Success;
            deployData.cost = result.cost;
            deployData.errorMessage = null;
        } else {
            let result = event.execution_result.Failure;
            deployData.errorMessage = result.error_message;
            deployData.cost = result.cost;
        }

        await this.models.Deploy.create(deployData);

        if (event.execution_result.Success) {
            let result = event.execution_result.Success;
            result.transfers.forEach(transferHash => {
                result.effect.transforms.forEach(async transform => {
                    if(transform.key != transferHash) {
                        return;
                    }
                    let transferEvent = transform.transform.WriteTransfer;
                    await this.models.Transfer.create({
                        transferHash: transferHash,
                        deployHash: deployData.deployHash,
                        fromAccount: transferEvent.from.substring(13),
                        toAccount: transferEvent.to.substring(13),
                        sourcePurse: transferEvent.source,
                        targetPurse: transferEvent.target,
                        amount: transferEvent.amount,
                        id: transferEvent.id
                    });
                });
            });
        }


        if(this.pubsub !== null) {
            this.pubsub.broadcast_deploy(await deploy.toJSON());
        }
    }

    async onBlockAdded(event) {
        let deploysStr = event.block_header.deploy_hashes.join(', ');
        let deployCount = event.block_header.deploy_hashes.length;
        console.log(
            `Processing BlockAdded event. BlockHash: ${event.block_hash}, ` +
            `Deploys: [${deploysStr}].`
        );

        let block = await this.findBlockByHash(event.block_hash);
        if (block !== null) {
            // logs msg
            console.warn(`Block ${event.block_header.height} already exists. Skipping`);
            return;
        }

        await this.models.Block.create({
            blockHash: event.block_hash,
            blockHeight: event.block_header.height,
            parentHash: event.block_header.parent_hash,
            timestamp: event.block_header.timestamp,
            state: event.block_header.state_root_hash,
            deployCount: deployCount,
            eraId: event.block_header.era_id,
            proposer: event.block_header.proposer,
        });

        // Update deploys.
        await this.models.Deploy.update({
            timestamp: event.block_header.timestamp,
            blockHash: event.block_hash
        }, {
            where: {
                deployHash: event.block_header.deploy_hashes
            }
        });

        if(this.pubsub !== null){
            this.pubsub.broadcast_block(await block.toJSON());
        }
    }

    async findBlockByHeight(height) {
        return this.models.Block.findByPk(height);
    }

    async findEventId(id) {
        return this.models.EventId.findOne({
            where: {
                id: id
            }
        });
    }

    async getLastEventId() {
        const eventId = await this.models.EventId.findOne({
            order: [[ 'id', 'DESC' ]],
        });

        return eventId ? eventId.id : null;
    }

    async findBlockByHash(blockHash) {
        return this.models.Block.findOne({
            where: {
                blockHash: blockHash
            }
        });
    }

    async findBlocks(limit, offset) {
        let blocks = await this.models.Block.findAll({
            limit: limit,
            offset: offset,
            order: [['blockHeight', 'DESC']]
        });
        let count = await this.models.Block.count();
        return {
            rows: blocks,
            count: count
        }
    }

    async findDeployByHash(deployHash) {
        return this.models.Deploy.findByPk(deployHash);
    }

    async findDeploysByAccount(account, limit, offset) {
        return this.models.Deploy.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['timestamp', 'DESC']],
            where: {
                account: account
            }
        });
    }

    async findDeployHashesByBlockHash(blockHash) {
        return this.models.Deploy.findAll({
            attributes: ['deployHash'],
            where: {
                blockHash: blockHash
            }
        }).then(deploys => {
            return deploys.map(deploy => deploy.deployHash)
        });
    }

    async findTransfers(purseUref) {
        return this.models.Transfer.findAll({
            where: {
                [Op.or]: [
                    {
                        fromAccount: purseUref
                    },{
                        toAccount: purseUref
                    }
                ]
            }
        });
    }
}

module.exports = Storage

const sequelize = require("sequelize");
const crypto = require('crypto')

const { Op } = sequelize;

class Storage {
    constructor(models, pubsub = null) {
        this.models = models;
        this.pubsub = pubsub;
    }

    async storeEntity(model, entity) {
        try {
            return await this.models[model].create(entity);
        }
        catch (err) {
            if (err instanceof sequelize.UniqueConstraintError) {
                console.warn(`Warning: ${model} with primary key ${err.fields.PRIMARY} already exists. Skipping.`);
                return false;
            }
            else {
                console.warn(err);
                throw err;
            }
        }
    }

    async onEventId(id) {
        console.log(`Info: Processing id ${id}`);
        await this.storeEntity('EventId', {id});
    }

    async onEvent(jsonBody) {
        const event = JSON.parse(jsonBody);

        let eventType,
            primaryEntityHash,
            entityProcessing;

        if (event.DeployProcessed) {
            eventType = 'DeployProcessed';
            primaryEntityHash = event.DeployProcessed.deploy_hash;
            entityProcessing = this.onDeployProcessedEvent(event.DeployProcessed);
        } else if (event.BlockAdded) {
            eventType = 'BlockAdded';
            primaryEntityHash = event.BlockAdded.block_hash;
            entityProcessing = this.onBlockAddedEvent(event.BlockAdded);
        } else if (event.FinalitySignature) {
            eventType = 'FinalitySignature';
            primaryEntityHash = event.FinalitySignature.signature;
            entityProcessing = this.onFinalitySignatureEvent(event.FinalitySignature);
        }

        const eventHash = crypto.createHash('sha256')
            .update(jsonBody, 'utf8')
            .digest('hex');

        const storingRawEvent = this.storeEntity('RawEvent', {
            eventHash,
            eventType,
            primaryEntityHash,
            jsonBody
        });

        await Promise.all([
            storingRawEvent,
            entityProcessing
        ]);
    }

    async onDeployProcessedEvent(event) {
        console.log(`Info: Processing DeployProcessed event. DeployHash: ${event.deploy_hash}.`);

        let deployData = {
            blockHash: event.block_hash,
            deployHash: event.deploy_hash,
            account: event.account,
            timestamp: event.timestamp,
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

        const result = await this.storeEntity('Deploy', deployData);

        if (result !== false && event.execution_result.Success) {
            let result = event.execution_result.Success;
            result.transfers.forEach(transferHash => {
                result.effect.transforms.forEach(async transform => {
                    if(transform.key != transferHash) {
                        return;
                    }

                    let transferEvent = transform.transform.WriteTransfer;
                    await this.storeEntity('Transfer', {
                        transferHash: transferHash,
                        deployHash: deployData.deployHash,
                        fromAccount: transferEvent.from.substring(13),
                        toAccount: transferEvent.to
                            ? transferEvent.to.substring(13)
                            : null,
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

    async onBlockAddedEvent(event) {
        let deploysStr = event.block_header.deploy_hashes.join(', ');
        let deployCount = event.block_header.deploy_hashes.length;
        console.log(
            `Info: Processing BlockAdded event. BlockHash: ${event.block_hash}, ` +
            `Deploys: [${deploysStr}].`
        );

        await this.storeEntity('Block', {
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
        // @todo Remove this with the next release (backward compatibility)
        await this.models.Deploy.update({
            timestamp: event.block_header.timestamp,
            blockHash: event.block_hash
        }, {
            where: {
                deployHash: event.block_header.deploy_hashes
            }
        });

        if(this.pubsub !== null) {
            this.pubsub.broadcast_block(await block.toJSON());
        }
    }

    async onFinalitySignatureEvent(event) {
        console.log(`Info: Processing FinalitySignature event. Signature: ${event.signature}.`);

        await this.storeEntity('FinalitySignature', {
            signature: event.signature,
            blockHash: event.block_hash,
            publicKey: event.public_key,
            eraId: event.era_id,
        });
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

module.exports = Storage;

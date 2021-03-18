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

    async onEventId(sourceNodeId, id) {
        console.log(`Info: Processing id ${id} from source node ${sourceNodeId}`);
        this.storeEntity('EventId', { sourceNodeId, id });
    }

    async onEvent(sourceNodeId, apiVersionId, jsonBody) {
        const event = JSON.parse(jsonBody);

        let eventType,
            primaryEntityHash;

        if (event.DeployProcessed) {
            eventType = 'DeployProcessed';
            primaryEntityHash = event.DeployProcessed.deploy_hash;
            this.onDeployProcessedEvent(event.DeployProcessed);
        } else if (event.BlockAdded) {
            eventType = 'BlockAdded';
            primaryEntityHash = event.BlockAdded.block_hash;
            this.onBlockAddedEvent(event.BlockAdded);
        } else if (event.FinalitySignature) {
            eventType = 'FinalitySignature';
            primaryEntityHash = event.FinalitySignature.signature;
            this.onFinalitySignatureEvent(event.FinalitySignature);
        }

        const eventHash = crypto.createHash('sha256')
            .update(jsonBody, 'utf8')
            .digest('hex');

        this.storeEntity('RawEvent', {
            sourceNodeId,
            apiVersionId,
            eventHash,
            eventType,
            primaryEntityHash,
            jsonBody
        });
    }

    async onDeployProcessedEvent(event) {
        console.log(`Info: Processing DeployProcessed event. DeployHash: ${event.deploy_hash}.`);

        let deployData = {
            blockHash: event.block_hash,
            blockHeight: event.height,
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

        const result = this.storeEntity('Deploy', deployData);

        if (result !== false && event.execution_result.Success) {
            let result = event.execution_result.Success;
            result.transfers.forEach(transferHash => {
                result.effect.transforms.forEach(async transform => {
                    if(transform.key != transferHash) {
                        return;
                    }

                    let transferEvent = transform.transform.WriteTransfer;
                    this.storeEntity('Transfer', {
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
        // If after https://github.com/CasperLabs/casper-node/pull/978 (note that version remained the same 1.0.0)
        if (event.block) {
            let deploysStr = event.block.body.deploy_hashes.join(', ');
            let deployCount = event.block.body.deploy_hashes.length;
            console.log(
                `Info: Processing BlockAdded event. BlockHash: ${event.block_hash}, ` +
                `Deploys: [${deploysStr}].`
            );

            this.storeEntity('Block', {
                blockHash: event.block.hash,
                blockHeight: event.block.header.height,
                parentHash: event.block.header.parent_hash,
                timestamp: event.block.header.timestamp,
                state: event.block.header.state_root_hash,
                deployCount: deployCount,
                eraId: event.block.header.era_id,
                proposer: event.block.body.proposer,
            });

            // Update deploys.
            // @todo Remove this with the next release (backward compatibility)
            await this.models.Deploy.update({
                timestamp: event.block.header.timestamp,
                blockHash: event.block.hash
            }, {
                where: {
                    deployHash: event.block.body.deploy_hashes
                }
            });
        }
        else {
            let deploysStr = event.block_header.deploy_hashes.join(', ');
            let deployCount = event.block_header.deploy_hashes.length;
            console.log(
                `Info: Processing BlockAdded event. BlockHash: ${event.block_hash}, ` +
                `Deploys: [${deploysStr}].`
            );

            this.storeEntity('Block', {
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
        }

        if(this.pubsub !== null) {
            this.pubsub.broadcast_block(await block.toJSON());
        }
    }

    async onFinalitySignatureEvent(event) {
        console.log(`Info: Processing FinalitySignature event. Signature: ${event.signature}.`);

        this.storeEntity('FinalitySignature', {
            signature: event.signature,
            blockHash: event.block_hash,
            publicKey: event.public_key,
            eraId: event.era_id,
        });
    }

    async findBlockByHeight(height) {
        return this.models.Block.findByPk(height);
    }

    async findSourceNodeByAddressOrCreate(address) {
        const found = await this.models.SourceNode.findOne({
            where: { address }
        });

        if (found) {
            return found;
        }

        return await this.storeEntity('SourceNode', { address });
    }

    async findApiVersionByVersionOrCreate(version) {
        const found = await this.models.ApiVersion.findOne({
            where: { version }
        });

        if (found) {
            return found;
        }

        return await this.storeEntity('ApiVersion', { version });
    }

    async getLastEventId(sourceNodeId) {
        const eventId = await this.models.EventId.findOne({
            where: { sourceNodeId },
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

    async getDeploys(limit, offset) {
        let deploys = await this.models.Deploy.findAll({
            limit: limit,
            offset: offset,
            order: [['blockHeight', 'DESC'],['deployHash','ASC']] // deployHash added in order to have deterministic order
        });
        let count = await this.models.Deploy.count();
        return {
            rows: deploys,
            count: count
        }
    }
}

module.exports = Storage;

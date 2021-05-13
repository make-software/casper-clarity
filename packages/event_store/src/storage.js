const sequelize = require("sequelize");

const { Op } = sequelize;

class Storage {
    constructor(models, casperClient, pubsub = null) {
        this.models = models;
        this.casperClient = casperClient;
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

    async onEventId(sourceNodeId, apiVersionId, id) {
        console.log(`Info: Processing id ${id} from source node ${sourceNodeId}, protocol version ${apiVersionId}`);
        this.storeEntity('EventId', { sourceNodeId, apiVersionId, id });
    }

    async onEvent(sourceNodeId, apiVersionId, jsonBody) {
        const event = JSON.parse(jsonBody);

        let eventType,
            primaryEntityHash;

        if (event.ApiVersion) {
            eventType = 'ApiVersion';
            primaryEntityHash = event.ApiVersion;
        } else if (event.DeployProcessed) {
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

        this.storeEntity('RawEvent', {
            sourceNodeId,
            apiVersionId,
            eventType,
            primaryEntityHash,
            jsonBody
        });
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

        const result = this.storeEntity('Deploy', deployData);

        if (result !== false && event.execution_result.Success) {
            let result = event.execution_result.Success;
            let transferHashes = result.transfers;

            for (let transform of result.effect.transforms) {
                if (transferHashes.includes(transform.key)) {
                    let transferEvent = transform.transform.WriteTransfer;
                    this.storeEntity('Transfer', {
                        transferHash: transform.key,
                        deployHash: deployData.deployHash,
                        blockHash: deployData.blockHash,
                        fromAccount: transferEvent.from.substring(13),
                        toAccount: transferEvent.to
                            ? transferEvent.to.substring(13)
                            : null,
                        sourcePurse: transferEvent.source,
                        targetPurse: transferEvent.target,
                        amount: transferEvent.amount,
                        id: transferEvent.id,
                        timestamp: event.timestamp,
                    });
                }

                if (transform.transform) {
                    if (transform.transform.WriteBid) {
                        let bidEvent = transform.transform.WriteBid;
                        this.storeEntity('Bid', {
                            key: transform.key,
                            deployHash: event.deploy_hash,
                            validatorPublicKey: bidEvent.validator_public_key,
                            bondingPurse: bidEvent.bonding_purse,
                            stakedAmount: bidEvent.staked_amount,
                            delegationRate: bidEvent.delegation_rate,
                            inactive: bidEvent.inactive,
                            vestingSchedule: bidEvent.vesting_schedule,
                            delegators: bidEvent.delegators,
                            timestamp: event.timestamp,
                        });
                    }
                    else if (transform.transform.WriteWithdraw) {
                        for (let withdrawalEvent of transform.transform.WriteWithdraw) {
                            this.storeEntity('Withdrawal', {
                                key: transform.key,
                                deployHash: event.deploy_hash,
                                validatorPublicKey: withdrawalEvent.validator_public_key,
                                unbonderPublicKey: withdrawalEvent.unbonder_public_key,
                                bondingPurse: withdrawalEvent.bonding_purse,
                                amount: withdrawalEvent.amount,
                                eraOfCreation: withdrawalEvent.era_of_creation,
                                timestamp: event.timestamp,
                            });
                        }
                    }
                }
            }
        }

        if (this.pubsub !== null) {
            this.pubsub.broadcast_deploy(await deploy.toJSON());
        }
    }

    async onBlockAddedEvent(event) {
        // If after https://github.com/CasperLabs/casper-node/pull/978 (note that version remained the same 1.0.0)
        if (event.block) {
            const deployCount = event.block.body.deploy_hashes.length;
            const transferCount = event.block.body.transfer_hashes.length;

            console.log(`Info: Processing BlockAdded event. BlockHash: ${event.block_hash}`);

            this.storeEntity('Block', {
                blockHash: event.block.hash,
                blockHeight: event.block.header.height,
                parentHash: event.block.header.parent_hash,
                timestamp: event.block.header.timestamp,
                state: event.block.header.state_root_hash,
                deployCount: deployCount,
                transferCount: transferCount,
                eraId: event.block.header.era_id,
                proposer: event.block.body.proposer,
            });

            if (event.block.header.era_end) {
                this.storeEntity('Era', {
                    id: event.block.header.era_id,
                    endBlockHeight: event.block.header.height,
                    endTimestamp: event.block.header.timestamp,
                    protocolVersion: event.block.header.protocol_version,
                });

                const eraSummary = await this.casperClient.getEraInfoBySwitchBlockHeight(event.block.header.height);

                for (const reward of eraSummary.stored_value.EraInfo.seigniorage_allocations) {
                    if (reward.Validator) {
                        this.storeEntity('ValidatorReward', {
                            eraId: eraSummary.era_id,
                            publicKey: reward.Validator.validator_public_key,
                            amount: reward.Validator.amount,
                        });
                    }
                    else if (reward.Delegator) {
                        this.storeEntity('DelegatorReward', {
                            eraId: eraSummary.era_id,
                            publicKey: reward.Delegator.delegator_public_key,
                            validatorPublicKey: reward.Delegator.validator_public_key,
                            amount: reward.Delegator.amount,
                        });
                    }
                }

                for (let publicKeyHex in event.block.header.era_end.next_era_validator_weights) {
                    this.storeEntity('EraValidator', {
                        eraId: event.block.header.era_id + 1,
                        publicKeyHex: publicKeyHex,
                        weight: event.block.header.era_end.next_era_validator_weights[publicKeyHex],
                        rewards: 0,
                        hasEquivocation: 0,
                        wasActive: 0,
                    });
                }

                const updatedValidators = [];
                for (let publicKeyHex in event.block.header.era_end.era_report.rewards) {
                    updatedValidators.push(publicKeyHex);

                    this.models.EraValidator.update({
                        rewards: event.block.header.era_end.era_report.rewards[publicKeyHex],
                        hasEquivocation: event.block.header.era_end.era_report.equivocators.includes(publicKeyHex),
                        wasActive: !event.block.header.era_end.era_report.inactive_validators.includes(publicKeyHex),
                    }, {
                        where: {
                            eraId: event.block.header.era_id,
                            publicKeyHex: publicKeyHex,
                        }
                    });
                }

                for (let publicKeyHex of event.block.header.era_end.era_report.equivocators) {
                    if (updatedValidators.includes(publicKeyHex)) {
                        continue;
                    }

                    updatedValidators.push(publicKeyHex);

                    this.models.EraValidator.update({
                        hasEquivocation: true,
                        wasActive: !event.block.header.era_end.era_report.inactive_validators.includes(publicKeyHex),
                    }, {
                        where: {
                            eraId: event.block.header.era_id,
                            publicKeyHex: publicKeyHex,
                        }
                    });
                }

                for (let publicKeyHex of event.block.header.era_end.era_report.inactive_validators) {
                    if (updatedValidators.includes(publicKeyHex)) {
                        continue;
                    }

                    this.models.EraValidator.update({
                        wasActive: false,
                    }, {
                        where: {
                            eraId: event.block.header.era_id,
                            publicKeyHex: publicKeyHex,
                        }
                    });
                }
            }

            // Update deploys.
            // @todo Remove this with the next release (backward compatibility)
            // await this.models.Deploy.update({
            //     timestamp: event.block.header.timestamp,
            //     blockHash: event.block.hash
            // }, {
            //     where: {
            //         deployHash: event.block.body.deploy_hashes
            //     }
            // });
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
            // await this.models.Deploy.update({
            //     timestamp: event.block_header.timestamp,
            //     blockHash: event.block_hash
            // }, {
            //     where: {
            //         deployHash: event.block_header.deploy_hashes
            //     }
            // });
        }

        if(this.pubsub !== null) {
            this.pubsub.broadcast_block(await block.toJSON());
        }
    }

    async onEraEnd(eraEnd) {
        this.storeEntity('Era', {
            eraId: eraEnd.era_id,
            eraEndBlockHeight: eraEnd.era_end_block_height,
            eraEndTimestamp: eraEnd.era_end_timestamp,
            eraProtocolVersion: eraEnd.era_protocol_version,
        });
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

    async getLastEventId(sourceNodeId, apiVersionId) {
        const eventId = await this.models.EventId.findOne({
            where: { sourceNodeId, apiVersionId },
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

    buildWhere(criteria, availableCriteriaFields) {
        const where = {};
        for (let criterion in criteria) {
            if (availableCriteriaFields.includes(criterion)) {
                where[criterion] = criteria[criterion]
            }
        }

        return where
    }

    buildOrder(orderBy, orderDirection, availableOrderFields, defaultOrder) {
        let order = defaultOrder;
        if (orderBy && availableOrderFields.includes(orderBy)) {
            order = [[orderBy, orderDirection ? orderDirection : 'DESC']];
        }

        return order
    }

    async findBlocks(criteria, limit, offset, orderBy, orderDirection) {
        return await this.models.Block.findAndCountAll({
            where: this.buildWhere(criteria, ['proposer']),
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['blockHeight', 'deployCount', 'transferCount', 'timestamp', 'eraId'],
                [['blockHeight', 'DESC']]
            ),
            limit: limit,
            offset: offset,
        });
    }

    async findDeployByHash(deployHash) {
        return this.models.Deploy.findByPk(deployHash);
    }

    async findDeploysByAccount(account, limit, offset, orderBy, orderDirection) {
        return this.models.Deploy.findAndCountAll({
            where: {
                account: account
            },
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['cost', 'timestamp', 'errorMessage'],
                [['timestamp', 'DESC']]
            ),
            limit: limit,
            offset: offset,
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

    async findAccountTransfers(accountHash, limit, offset, orderBy, orderDirection) {
        return this.models.Transfer.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        fromAccount: accountHash
                    },{
                        toAccount: accountHash
                    }
                ]
            },
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['amount', 'timestamp'],
                [['timestamp', 'DESC']]
            ),
            limit: limit,
            offset: offset,
        });
    }

    async getDeploys(criteria, limit, offset, orderBy, orderDirection) {
        return await this.models.Deploy.findAndCountAll({
            where: this.buildWhere(criteria, ['blockHash']),
            limit: limit,
            offset: offset,
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['cost', 'timestamp', 'errorMessage'],
                [['timestamp', 'DESC']]
            ),
        });
    }

    async findTransfers(criteria, limit, offset, orderBy, orderDirection) {
        return await this.models.Transfer.findAndCountAll({
            where: this.buildWhere(criteria, ['blockHash', 'deployHash']),
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['amount', 'timestamp'],
                [['timestamp', 'DESC']]
            ),
            limit: limit,
            offset: offset,
        });
    }

    async findEraValidators(criteria, limit, offset, orderBy, orderDirection) {
        return await this.models.EraValidator.findAndCountAll({
            where: this.buildWhere(criteria, ['eraId', 'publicKeyHex', 'hasEquivocation', 'wasActive']),
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['eraId', 'weight', 'rewards', 'hasEquivocation', 'wasActive', 'createdAt'],
                [['eraId', 'DESC']]
            ),
            limit,
            offset,
        });
    }

    async getTotalValidatorRewards(publicKey) {
        return await this.models.ValidatorReward
            .sum('amount', {where: {publicKey}});
    }

    async getTotalValidatorDelegatorRewards(validatorPublicKey) {
        return await this.models.DelegatorReward
            .sum('amount', {where: {validatorPublicKey}});
    }

    async findValidatorRewards(criteria, limit, offset, orderBy, orderDirection) {
        return await this.models.ValidatorReward.findAndCountAll({
            where: this.buildWhere(criteria, ['publicKey']),
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['eraId', 'amount'],
                [['eraId', 'DESC']]
            ),
            limit: limit,
            offset: offset,
        });
    }

    async findDelegatorRewards(criteria, limit, offset, orderBy, orderDirection) {
        return await this.models.DelegatorReward.findAndCountAll({
            limit: limit,
            offset: offset,
            where: this.buildWhere(criteria, ['publicKey', 'validatorPublicKey']),
            order: this.buildOrder(
                orderBy,
                orderDirection,
                ['eraId', 'amount'],
                [['eraId', 'DESC']]
            ),
        });
    }
}

module.exports = Storage;

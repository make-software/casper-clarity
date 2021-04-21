const mysql = require('mysql2');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/db-config.json')[env];
const Storage = require('../storage');
const CasperClient = require('../casperClient');
const models = require('../models/index');

async function populateRewards() {
    try {
        console.log('Info: Syncing database schema');
        await models.sequelize.sync({ force: false, logging: false });
        console.log('Info: Database schema synced');

        const casperClient = new CasperClient(process.env.NODE_ADDRESS);

        const storage = new Storage(models, casperClient);

        const streamingConnection = mysql.createConnection(process.env['DATABASE_URI']
            ? process.env['DATABASE_URI']
            : config.uri
        );

        const query = streamingConnection.query(`
            select *
            from Eras
            order by id asc
        `);

        query
            .on('error', function(err) {
                console.error(err);
            })
            .on('result', async function(era) {
                streamingConnection.pause();
                const eraSummary = await casperClient.getEraInfoBySwitchBlockHeight(era.endBlockHeight);

                console.log('Info: Processing era ' + eraSummary.era_id);
                for (const reward of eraSummary.stored_value.EraInfo.seigniorage_allocations) {
                    if (reward.Validator) {
                        storage.storeEntity('ValidatorReward', {
                            eraId: eraSummary.era_id,
                            publicKey: reward.Validator.validator_public_key,
                            amount: reward.Validator.amount,
                        });
                    }
                    else if (reward.Delegator) {
                        storage.storeEntity('DelegatorReward', {
                            eraId: eraSummary.era_id,
                            publicKey: reward.Delegator.delegator_public_key,
                            validatorPublicKey: reward.Delegator.validator_public_key,
                            amount: reward.Delegator.amount,
                        });
                    }
                }

                // Trying to not go over the 250 RPC requests per second limit
                await new Promise(resolve => setTimeout(resolve, 1000));
                streamingConnection.resume();
            })
            .on('end', function() {
                console.log('Done')
            });
    } catch (err) {
        console.error(err);
    }
}

populateRewards();

const mysql = require('mysql2');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/db-config.json')[env];
const Storage = require('../storage');
const models = require('../models/index');

async function populateBids() {
    try {
        console.log('Info: Syncing database schema');
        await models.sequelize.sync({ force: false, logging: false });

        const storage = new Storage(models);

        const streamingConnection = mysql.createConnection(process.env['DATABASE_URI']
            ? process.env['DATABASE_URI']
            : config.uri
        );

        const query = streamingConnection.query(`
            select *
            from RawEvents
            where eventType='DeployProcessed' and  jsonBody like '%WriteWithdraw%'
            order by createdAt asc
        `);

        query
            .on('error', function(err) {
                console.error(err);
            })
            .on('result', function(rawEvent) {
                streamingConnection.pause();
                // console.log(rawEvent.jsonBody);
                const event = JSON.parse(rawEvent.jsonBody).DeployProcessed;

                console.log(`Info: Processing DeployProcessed event. DeployHash: ${event.deploy_hash}.`);

                if (event.execution_result.Success) {
                    for (let transform of event.execution_result.Success.effect.transforms) {
                        if (transform.transform.WriteWithdraw) {
                            for (let withdrawalEvent of transform.transform.WriteWithdraw) {
                                storage.storeEntity('Withdrawal', {
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

                streamingConnection.resume();
            })
            .on('end', function() {
                console.log('Done')
            });
    } catch (err) {
        console.error(err);
    }
}

populateBids();

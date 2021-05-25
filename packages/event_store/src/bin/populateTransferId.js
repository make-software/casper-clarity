const mysql = require('mysql2');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/db-config.json')[env];
const Storage = require('../storage');
const models = require('../models/index');

async function populateTransferId() {
    try {
        const storage = new Storage(models);

        const streamingConnection = mysql.createConnection(process.env['DATABASE_URI']
            ? process.env['DATABASE_URI']
            : config.uri
        );

        const query = streamingConnection.query(`
            select *
            from Transfers
            where transferId is null and createdAt > '2021-05-11 23:43:53'
            order by createdAt asc
        `);

        query
            .on('error', function(err) {
                console.error(err);
            })
            .on('result', async function(transfer) {
                streamingConnection.pause();

                const rawDeployEvent = await storage.getRawDeployEvent(transfer.deployHash);
                const event = JSON.parse(rawDeployEvent.jsonBody).DeployProcessed;

                console.log(`Info: Processing DeployProcessed event. DeployHash: ${event.deploy_hash}.`);

                if (event.execution_result.Success) {
                    for (let transform of event.execution_result.Success.effect.transforms) {
                        if (transform.key === transfer.transferHash && transform.transform.WriteTransfer.id !== null) {
                            console.log(`Info: Updating transfer ${transfer.transferHash} with id ${transform.transform.WriteTransfer.id}.`);
                            storage.models.Transfer.update({
                                transferId: transform.transform.WriteTransfer.id,
                            }, {
                                where: {
                                    deployHash: transfer.deployHash,
                                    transferHash: transfer.transferHash,
                                }
                            });
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

populateTransferId();

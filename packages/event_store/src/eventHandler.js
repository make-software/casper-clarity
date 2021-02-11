const got = require('got');
const readline = require('readline');
const Storage = require('./storage');
const models = require('../src/models/index');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/eh-config.json')[env];

// Tagging test
function formNodeURL(lastEventId) {
    const protocol = config.EH_STREAM_PROTOCOL;
    const domain = process.env.NODE_ADDRESS ? process.env.NODE_ADDRESS : config.EH_STREAM_DOMAIN;
    const port = config.EH_STREAM_PORT;
    const path = process.env.NODE_PATH ? process.env.NODE_PATH : config.EH_STREAM_PATH;
    const bufferSize = process.env.BUFFER_SIZE ? process.env.BUFFER_SIZE : 100;

    const startFromEventId = lastEventId
        ? Math.max(1, lastEventId - bufferSize)
        : 1;

    if (startFromEventId) {
        console.log('Catching up from event id ' + startFromEventId);
    }

    return protocol + '://' + domain +
        (port ? ':' + port : '') +
        (path ? '/' + path : '') +
        (startFromEventId ? '?start_from=' + startFromEventId : '');
}

async function runEventHandler() {
    try {
        console.log('Syncing database schema...');
        await models.sequelize.sync({ force: false, logging: false });
        console.log('Syncing database schema... DONE');

        const storage = new Storage(models);

        const lastEventId = await storage.getLastEventId();

        // @todo Retry on failed connection
        const stream = readline.createInterface({
            input: got.stream(formNodeURL(lastEventId)),
            crlfDelay: Infinity
        });

        stream.on('line', async (eventString) => {
            console.log(eventString);

            if (eventString.startsWith('id')) {
                try {
                    const id = eventString.substr(3);
                    await storage.onEventId(id);
                } catch (err) {
                    console.log(`Error while processing an event.\nEvent: ${eventString}\nError: ${err}`);
                }
            }
            else if (eventString.startsWith('data')) {
                try {
                    const event = JSON.parse(eventString.substr(5));
                    if (event.DeployProcessed) {
                        await storage.onDeployProcessed(event.DeployProcessed);
                    } else if (event.BlockAdded) {
                        await storage.onBlockAdded(event.BlockAdded);
                    }
                } catch (err) {
                    console.log(`Error while processing an event.\nEvent: ${eventString}\nError: ${err}`);
                }
            }
        });
    } catch (err) {
        console.log(err);
        if (err instanceof got.stream.RequestError) {
            throw new Error("Connection Failed - check the status of the node:\n" + err);
        } else {
            throw new Error(err);
        }
    }
}

// For debugging
if (env !== 'test') {
    runEventHandler();
}

module.exports = runEventHandler;

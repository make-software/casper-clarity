const got = require('got');
const readline = require('readline');
const Storage = require('./storage');
const models = require('../src/models/index');
const env = process.env.NODE_ENV || 'local';
const config = require(__dirname + '/../config/eh-config.json')[env];

function formNodeURL() {
    const protocol = config.EH_STREAM_PROTOCOL;
    const domain = config.EH_STREAM_DOMAIN;
    const port = config.EH_STREAM_PORT;
    const path = config.EH_STREAM_PATH;

    return protocol + '://' + domain +
        (port ? ':' + port : '') +
        (path ? '/' + path : '');
}

async function runEventHandler() {
    try {
        (async () => {
            console.log('Syncing database schema...');
            await models.sequelize.sync({ force: false, logging: false });
            console.log('Syncing database schema... DONE');
        })();

        const storage = new Storage(models);

        // @todo Retry on failed connection
        const stream = readline.createInterface({
            input: got.stream(formNodeURL()),
            crlfDelay: Infinity
        });

        stream.on('line', async (eventString) => {
            console.log(eventString);
            if (!eventString.startsWith('data')) {
                return;
            }

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
        });
    } catch (err) {
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

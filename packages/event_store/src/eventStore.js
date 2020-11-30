#!/usr/bin/env node

/** 
 * Read config 
 */
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/web-config.json')[env];

/**
 * Module dependencies.
 */
var models = require('./models/index');
var http = require('http');

/**
 * Sync database schema.
 */
if (env == "production") {
    (async () => {
        console.log("Syncing database schema...");
        await models.sequelize.sync({ force: false, logging: false });
        console.log("Syncing database schema... DONE");
    })();
}

/**
 * Test data for developement env.
 */
if (env == 'development') {
    (async () => {
        await models.sequelize.sync({ force: true, logging: false });
        if (process.env.MOCK_DATA) {
            const Storage = require('./storage');
            let storage = new Storage(models);
            if (process.env.MOCK_DATA == 2) {
                var data = require('../test/testData/duplicateEvents.js');
            } else {
                var data = require('../test/mockData.js');
            }
            await storage.onFinalizedBlock(data.finalizedBlockEvent1);
            await storage.onFinalizedBlock(data.finalizedBlockEvent2);
            await storage.onFinalizedBlock(data.finalizedBlockEvent3);
            await storage.onDeployProcessed(data.deployProcessedEvent1);
            await storage.onDeployProcessed(data.deployProcessedEvent2);
            await storage.onDeployProcessed(data.deployProcessedEvent3);
            await storage.onBlockAdded(data.blockAddedEvent1);
            await storage.onBlockAdded(data.blockAddedEvent2);
            await storage.onBlockAdded(data.blockAddedEvent3);
            console.log('Data loaded!');
        };
    })();
}

/**
 * Build the Express app.
 */

const httpServer = require('./httpServer');
app = httpServer(models);

/**
 * Set port.
 */
app.set('port', config.PORT);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.PORT, config.HOST);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof config.PORT === 'string'
        ? 'Pipe ' + config.PORT
        : 'Port ' + config.PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : addr.address + ':' + addr.port;
    console.log('Listening on ' + bind);
}

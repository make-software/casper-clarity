const stream = require('stream');
const { promisify } = require('util');
const got = require('got');
const fs = require('fs');
const Storage = require('./storage');
const models = require('../src/models/index');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/eh-config.json')[env];

class EventHandler {
    constructor() {}

    /**
     * Returns readable stream when provided with url of event stream.
     * Url can be created with EventHandler.formURL()
     * 
     * @param {string} url 
     */
    async createInputStream(url) {
        try {
            const readStream = got.stream(url);
            // Still to implement retry on failed connection
            return readStream;
        } catch (err) {
            if (err instanceof got.stream.RequestError) {
                throw new Error("Connection Failed - check the status of the node:\n" + err);
            } else {
                throw new Error(err);
            }
        }
    }

    /**
     * Returns writeable stream pointed to the storage component
     */
    async createOutputStream() {
        
        // Sync database schema.
        if (env == "production") {
            (async () => {
                console.log("Syncing database schema...");
                await models.sequelize.sync({ force: false, logging: false });
                console.log("Syncing database schema... DONE");
            })();
        }
                
        // Initialise storage
        let storage = new Storage(models);

        // Extend empty writeable object
        let outputStream = new stream.Writable();
        
        outputStream._write = async (chunk, encoding, done) => {
            // Removes 'data:' prefix from the event to convert it to JSON
            chunk.toString().split("\n")
                .filter(str => str.startsWith('data'))
                .forEach(async str => {
                    let event;
                    try {
                        event = JSON.parse(str.substr(5));
                        if (event.DeployProcessed) {
                            console.log("Saving Deploys..."); // For debugging
                            await storage.onDeployProcessed(event.DeployProcessed);
                        } else if (event.BlockAdded) {
                            console.log("Saving Added Block..."); // For debugging
                            await storage.onBlockAdded(event.BlockAdded);
                        }
                    } catch (err) {
                        console.log(`Error while processing an event.\nEvent: ${str}\nError: ${err}`);
                    }
                });
            done();
        }

        return outputStream;
    }

    /**
     * Attempts to create a streaming pipeline given an input and output stream.
     * 
     * @param {stream.Readable} inputStream 
     * @param {stream.Writable} outputStream 
     */
    async createPipeline(inputStream, outputStream) {

        // initialise pipeline
        const pipeline = promisify(stream.pipeline);

        try {
            await pipeline(
                inputStream,
                outputStream
            );
        } catch (err) {
            console.error(err);
        }
    }


    /**
     * Returns a url based on given args.
     * If all args are omitted then it will return the default url of:
     * http://localhost:50101/events  -  The node event stream when using nctl.
     * This is defined and is configurable in eh-config.json
     * 
     * @param {string} protocol 
     * @param {string} domain 
     * @param {int} port 
     * @param {string} path 
     */
    async formURL(
        protocol,
        domain,
        port,
        path
    ) {

        // Set defaults if args not passed
        this.protocol = (protocol !== undefined) ? protocol : config.EH_STREAM_PROTOCOL;
        this.domain = (domain !== undefined) ? domain : config.EH_STREAM_DOMAIN;
        this.port = (port !== undefined) ? port : config.EH_STREAM_PORT;
        this.path = (path !== undefined) ? path : config.EH_STREAM_PATH;

        return (
            this.protocol + "://" + 
            this.domain +
            (this.port 
                ? ":" + this.port
                : ""
            ) +
            (this.path
                ? "/" + this.path
                : ""
            ) 
        );

    }

}

// For debugging
if (env !== 'test') {

    runEventHandler = async () => {

        let eventHandler = new EventHandler();
        let nodeUrl = await eventHandler.formURL();
        let eventStream = await eventHandler.createInputStream(nodeUrl);
        let storageStream = await eventHandler.createOutputStream();

        eventHandler.createPipeline(eventStream, storageStream);
    }

    runEventHandler();
}

module.exports = EventHandler
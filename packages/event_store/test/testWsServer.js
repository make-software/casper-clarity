const chai = require('chai');
const WebSocket = require('ws');
const redis = require("redis-mock");
const assert = chai.assert;

const models = require('../src/models/index');
const Storage = require('../src/storage');
const wsServer = require('../src/wsServer');
const PubSub = require('../src/pubsub');

const data = require('./mockData');
const e = require('express');

var wsApp = null;
var server = null;
var client = null;
var storage = null;

describe('WebSocket Server', async () => {
    beforeEach(async () => {
        await models.sequelize.sync({ force: true, logging: false });
        pubsub = new PubSub(redis.createClient());
        storage = new Storage(models, pubsub);
        wsApp = wsServer(pubsub);
        server = wsApp.app.listen(4000);
    });
    
    // it('Should handle block stream', (done) => {
    //     client = new WebSocket('ws://localhost:4000/blocks');
    //     let responses = [];
    //     client.on('message', async (block) => {
    //         responses.push(block);
    //         let expected1 = {
    //             blockHash: 'block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
    //             parentHash: '16815a580c3c1005a7df485e77e31c89e5fb1dec4d57988ffb29f1e699977414',
    //             timestamp: '2020-10-08T12:11:35.808Z',
    //             eraId: 163,
    //             proposer: '01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606',
    //             state: 'added',
    //             height: 1800,
    //             deploys: [
    //                 'deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3',
    //                 'deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3'
    //             ]
    //         };
    //         let expected2 = {
    //             blockHash: 'block2_09191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
    //             parentHash: 'aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
    //             timestamp: '2020-10-08T12:12:35.808Z',
    //             eraId: 163,
    //             proposer: '01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606',
    //             state: 'added',
    //             height: 1801,
    //             deploys: []
    //         };
    //         try {
    //             if (responses.length > 2) {
    //                 done();
    //             } else if (responses.length == 1) {
    //                 assert.deepEqual(JSON.parse(block), expected1);
    //             } else if (responses.length == 2) {
    //                 assert.deepEqual(JSON.parse(block), expected2);
    //                 done();
    //             }
    //         } catch (err) {
    //             done(err);
    //         }
    //     });
    //     client.on('open', async () => {
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent1);
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent2);
    //         await storage.onBlockAdded(data.blockAddedEvent1);
    //         await storage.onBlockAdded(data.blockAddedEvent2);
    //     });
    // });

    // it('Should handle block by block hash query', (done) => {
    //     let block_hash = data.blockAddedEvent1.block_hash;
    //     client = new WebSocket(`ws://localhost:4000/block/${block_hash}`);
    //     client.on('message', async (block) => {
    //        let expected = {
    //         blockHash: "block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
    //         parentHash: "16815a580c3c1005a7df485e77e31c89e5fb1dec4d57988ffb29f1e699977414",
    //         timestamp: "2020-10-08T12:11:35.808Z",
    //         eraId: 163,
    //         proposer: "01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606",
    //         state: "added",
    //         height: 1800,
    //         deploys: [
    //           "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
    //           "deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3"
    //         ]
    //       };
    //        try {
    //            assert.deepEqual(JSON.parse(block), expected, "Not expected block");
    //            done();
    //        } catch (err) {
    //            done(err);
    //        }
    //     });      
    //     client.on('open', async () => {
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent1);
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent2);
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent3);
    //         await storage.onBlockAdded(data.blockAddedEvent1);
    //         await storage.onBlockAdded(data.blockAddedEvent2);
    //         await storage.onBlockAdded(data.blockAddedEvent3);
    //     })
    // });

    // it('Should handle deploy by account query', (done) => {
    //     // Proposer's account hash
    //     let account_hash = data.deployProcessedEvent1.account;
    //     client = new WebSocket(`ws://localhost:4000/accountDeploys/${account_hash}`);
    //     let deploys = [];
    //     client.on('message', async (deploy) => {
    //         deploys.push(deploy);
    //         let expected1 =
    //             {
    //               deployHash: "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
    //               account: "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
    //               state: "processed",
    //               cost: "11",
    //               errorMessage: null,
    //               blockHash: null
    //             }
    //         let expected2 = 
    //             {
    //               deployHash: "deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
    //               account: "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
    //               state: "processed",
    //               cost: "12",
    //               errorMessage: null,
    //               blockHash: null
    //             }
    //         try { 
    //             if (deploys.length == 1) {
    //                 assert.deepEqual(JSON.parse(deploy), expected1, "Not expected deploy1");   
    //             } else if (deploys.length == 2) {
    //                 assert.deepEqual(JSON.parse(deploy), expected2, "Not expected deploy2");
    //                 done();
    //             }
    //         } catch (err) {
    //             done(err);
    //         }
    //     });
    //     client.on('open', async () => {
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent1);
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent2);
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent3);
    //         await storage.onDeployProcessed(data.deployProcessedEvent1);
    //         await storage.onDeployProcessed(data.deployProcessedEvent2);
    //         await storage.onDeployProcessed(data.deployProcessedEvent3);
    //     });
    // });

    // it('Should handle deploy by deployHash query', (done) => {
    //     let deployHash = data.deployProcessedEvent1.deploy_hash;
    //     client = new WebSocket(`ws://localhost:4000/deploy/${deployHash}`);
    //     client.on('message', async (deploy) => {
    //         let expected =
    //             {
    //               "deployHash": "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
    //               "account": "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
    //               "state": "processed",
    //               "cost": "11",
    //               "errorMessage": null,
    //               "blockHash": null
    //             }
    //         try {
    //             assert.deepEqual(JSON.parse(deploy), expected, "Not expected deploy");
    //             done();
    //         } catch (err) {
    //             done(err);
    //         }
    //     });
    //     client.on('open', async () => {
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent1);
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent2);
    //         await storage.onFinalizedBlock(data.finalizedBlockEvent3);
    //         await storage.onDeployProcessed(data.deployProcessedEvent1);
    //         await storage.onDeployProcessed(data.deployProcessedEvent2);
    //         await storage.onDeployProcessed(data.deployProcessedEvent3);
    //     });
    // });
    
    afterEach(async () => {
        client.terminate();
        pubsub.unsubscribe();   
        server.close();
        wsApp.getWss().close();
    });
});
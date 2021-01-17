var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;
var models = require('../src/models/index');
const Storage = require('../src/storage');
const httpServer = require('../src/httpServer');
chai.use(chaiHttp);

const data = require('./mockData');
var app = null;

describe('HttpServer', async () => {
    beforeEach(async () => {
        await models.sequelize.sync({ force: true, logging: false });
        storage = new Storage(models);
        await storage.onDeployProcessed(data.deployProcessedEvent1);
        await storage.onDeployProcessed(data.deployProcessedEvent2);
        await storage.onDeployProcessed(data.deployProcessedEvent3);
        await storage.onBlockAdded(data.blockAddedEvent1);
        await storage.onBlockAdded(data.blockAddedEvent2);
        await storage.onBlockAdded(data.blockAddedEvent3);
        app = httpServer(models);
    });
  
    it('Should respond with 404 on unknown block.', async () => {
        let response = await chai.request(app).get('/block/unknown');
        assert.strictEqual(response.statusCode, 404);
        assert.strictEqual(response.text, "Block not found.");
    });

    it('Should handle block query.', async () => {
        let blockHash = data.blockAddedEvent1.block_hash;
        let response = await chai.request(app).get(`/block/${blockHash}`);
        assert.strictEqual(response.statusCode, 200);
        let expected = {
            blockHash: 'block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
            parentHash: '16815a580c3c1005a7df485e77e31c89e5fb1dec4d57988ffb29f1e699977414',
            timestamp: '2020-10-08T12:11:35.808Z',
            eraId: 163,
            state: "cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
            proposer: '01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606',
            height: 1800,
            deployCount: 2,
            deploys: [
                'deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3',
                'deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3'
            ]
        }
        assert.deepEqual(response.body, expected);
    });
    
    it('Should list all the blocks in the height order.', async () => {
        let response = await chai.request(app).get('/blocks');
        assert.strictEqual(response.statusCode, 200);
        let expected = {
            data: [
                {
                    blockHash: 'block3_09191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
                    parentHash: 'aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
                    timestamp: '2020-10-08T12:13:35.808Z',
                    eraId: 163,
                    proposer: '01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606',
                    state: "cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
                    deployCount: 1,
                    height: 1802
                }, {
                    blockHash: 'block2_09191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
                    parentHash: 'aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
                    timestamp: '2020-10-08T12:12:35.808Z',
                    eraId: 163,
                    proposer: '01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606',
                    state: "cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
                    deployCount: 0,
                    height: 1801
                }, {
                    blockHash: 'block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111',
                    parentHash: '16815a580c3c1005a7df485e77e31c89e5fb1dec4d57988ffb29f1e699977414',
                    timestamp: '2020-10-08T12:11:35.808Z',
                    eraId: 163,
                    proposer: '01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606',
                    state: "cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
                    deployCount: 2,
                    height: 1800
                }
            ],
            pageCount: 1,
            itemCount: 3,
            pages: [ { number: 1, url: '/blocks?page=1&limit=10' } ]
        }
        assert.deepEqual(response.body, expected);
    });

    it('Should respond with 404 on unknown deploy.', async () => {
        let response = await chai.request(app).get('/deploy/unknown');
        assert.strictEqual(response.statusCode, 404);
        assert.strictEqual(response.text, "Deploy not found.");
    });

    it('Should handle the deploy query.', async () => {
        let deployHash = data.deployProcessedEvent1.deploy_hash;
        let response = await chai.request(app).get(`/deploy/${deployHash}`);
        assert.strictEqual(response.statusCode, 200);
        let expected = {
            account: "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
            blockHash: "block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
            deployHash: 'deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3',
            cost: 11,
            errorMessage: null,
            transfers: [
                {
                    amount: "1000000000",
                    deployHash: "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
                    sourcePurse: "uref-f8f32523da86b93b40adee95a05c8b7229887e0d345641a914b1c09d5052563b-007",
                    targetPurse: "uref-ab9a01563bfd412cd63f03fa99de8c1a4bd573a79e0697229e1844fcf7bb9e04-004",
                    id: "1233",
                    fromAccount: "8338671be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef",
                    toAccount: "bbbbbb1be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef"
                }
            ]
        };
        assert.deepEqual(expected, response.body)
    });

    it('Should handle the deploy by account query.', async () => {
        let account = data.deployProcessedEvent1.account;
        let response = await chai.request(app).get(`/accountDeploys/${account}`);
        assert.strictEqual(response.statusCode, 200);
        let expected = {
            data:
                [ 
                    { 
                        deployHash: 'deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3',
                        account: '010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932',
                        cost: 11,
                        errorMessage: null,
                        blockHash: 'block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111' 
                    },
                    { 
                        deployHash: 'deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3',
                        account: '010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932',
                        cost: 12,
                        errorMessage: null,
                        blockHash: 'block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111' 
                    } 
                ],
                pageCount: 1,
                itemCount: 2,
                pages:
                [ 
                    {
                        number: 1,
                        url: '/accountDeploys/010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932?page=1&limit=10' 
                    } 
                ]
        };
        assert.deepEqual(expected, response.body)
    });

    it('Should server transfers.', async () => {
        let transfer1 = {
            deployHash: "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
            sourcePurse: "uref-f8f32523da86b93b40adee95a05c8b7229887e0d345641a914b1c09d5052563b-007",
            targetPurse: "uref-ab9a01563bfd412cd63f03fa99de8c1a4bd573a79e0697229e1844fcf7bb9e04-004",
            amount: "1000000000",
            id: "1233",
            toAccount: "bbbbbb1be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef",
            fromAccount: "8338671be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef"
        }
        let transfer2 = {
            amount: "40000000",
            deployHash: "deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
            id: null,
            sourcePurse: "uref-f8f32523da86b93b40adee95a05c8b7229887e0d345641a914b1c09d5052563b-007",
            targetPurse: "uref-ffff01563bfd412cd63f03fa99de8c1a4bd573a79e0697229e1844fcf7bbffff-004",
            toAccount: "aaaaaa1be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef",
            fromAccount: "8338671be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef"

       }

        let response = await chai.request(app).get(`/transfers/${transfer1.fromAccount}`);
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.length, 2);
        assert.deepEqual(response.body[0], transfer1);
        assert.deepEqual(response.body[1], transfer2);
        
        response = await chai.request(app).get(`/transfers/${transfer1.toAccount}`);
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.statusCode, 200);
        assert.deepEqual(response.body[0], transfer1);
        
        response = await chai.request(app).get(`/transfers/${transfer2.toAccount}`);
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.statusCode, 200);
        assert.deepEqual(response.body[0], transfer2);
    })

    it('Should server 404 for transfers with wrong purse.', async () => {
        let response = await chai.request(app).get('/transfers/purse');
        assert.strictEqual(response.statusCode, 404);
    })
});

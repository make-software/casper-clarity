var assert = require('chai').assert;
var models = require('../src/models/index');
const Storage = require('../src/storage');
const { deployProcessedEvent2 } = require('./mockData');
const data = require('./mockData');

var storge = null;

describe('Storage', async () => {
    beforeEach(async () => {
        await models.sequelize.sync({ force: true, logging: false });
        storage = new Storage(models);
    });

    it('Should handle DeployProcessed event', async () => {
        let e = data.deployProcessedEvent1;
        await storage.onDeployProcessed(e);

        let deploy = await storage.findDeployByHash(e.deploy_hash);
        assert.strictEqual(deploy.cost, parseInt(e.execution_result.Success.cost));
        assert.strictEqual(deploy.errorMessage, null);

        let transfers = await deploy.getTransfers();
        let transfer = transfers[0];
        assert.strictEqual(transfers.length, 1);
        
        let expectedTransfer = e.execution_result.Success.effect.transforms[1];
        let expectedTransferKey = expectedTransfer.key;
        expectedTransfer = expectedTransfer.transform.WriteTransfer;

        assert.strictEqual(transfer.transferHash, expectedTransferKey);
        assert.strictEqual(transfer.deployHash, e.deploy_hash);
        // TODO: more tests.
    });

    it('Should handle BlockAdded event', async () => {
        let deployEvent1 = data.deployProcessedEvent1;
        let deployEvent2 = data.deployProcessedEvent2;
        let deployEvent3 = data.deployProcessedEvent3;
        let blockEvent = data.blockAddedEvent1;
        
        await storage.onDeployProcessed(deployEvent1);
        await storage.onDeployProcessed(deployEvent2);
        await storage.onDeployProcessed(deployEvent3);
        await storage.onBlockAdded(blockEvent);

        let block = await storage.findBlockByHash(blockEvent.block_hash);
        assert.strictEqual(block.parentHash, blockEvent.block_header.parent_hash);
        
        // Deploys are updated.
        let deploy1 = await storage.findDeployByHash(blockEvent.block_header.deploy_hashes[0]);
        let deploy2 = await storage.findDeployByHash(blockEvent.block_header.deploy_hashes[1]);
        assert.strictEqual(blockEvent.block_hash, deploy1.blockHash);
        assert.strictEqual(blockEvent.block_hash, deploy2.blockHash);
        assert.strictEqual(blockEvent.block_header.timestamp, deploy1.timestamp.toISOString());
        assert.strictEqual(blockEvent.block_header.timestamp, deploy2.timestamp.toISOString());
        
        let deployHashes = await storage.findDeployHashesByBlockHash(blockEvent.block_hash);
        let expectedDeployHashes = [
            'deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3',
            'deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3'
        ];
        assert.deepEqual(deployHashes, expectedDeployHashes);

        // Other deploys are intackt.
        let deploy3 = await storage.findDeployByHash(deployEvent3.deploy_hash);
        assert.isNull(deploy3.blockHash);
    });
});

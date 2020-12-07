var assert = require('chai').assert;
var models = require('../src/models/index');
const Storage = require('../src/storage');
const data = require('./mockData');

var storge = null;

describe('Storage', async () => {
    beforeEach(async () => {
        await models.sequelize.sync({ force: true, logging: false });
        storage = new Storage(models);
    });
  
    it('Should handle Blockfinalized event', async () => {
        let e = data.finalizedBlockEvent1;
        await storage.onFinalizedBlock(e);
        
        let block = await storage.findBlockByHeight(e.height);

        assert.strictEqual(block.blockHeight, e.height);
        assert.strictEqual(block.timestamp.toISOString(), e.timestamp);
        assert.strictEqual(block.eraId, e.era_id);
        assert.strictEqual(block.proposer, e.proposer);
        assert.strictEqual(block.state, 'finalized');
        assert.isNull(block.blockHash)
        assert.isNull(block.parentHash)

        let deploys = await block.getDeploys();

        assert.strictEqual(deploys[0].deployHash, e.proto_block.deploys[0]);
        assert.strictEqual(deploys[0].blockHeight, e.height);
        assert.strictEqual(deploys[0].state, 'finalized');
        
        assert.strictEqual(deploys[1].deployHash, e.proto_block.deploys[1]);
        assert.strictEqual(deploys[1].blockHeight, e.height);
        assert.strictEqual(deploys[1].state, 'finalized');
    });

    it('Should log warning on duplicated BlockFinalized event', async () => {
        let e = data.finalizedBlockEvent1;
        await storage.onFinalizedBlock(e);
        await storage.onFinalizedBlock(e);
    });

    it('Should handle DeployProcessed event', async () => {
        await storage.onFinalizedBlock(data.finalizedBlockEvent1);

        let e = data.deployProcessedEvent1;
        await storage.onDeployProcessed(e);

        let deploy = await storage.findDeployByHash(e.deploy_hash);
        assert.strictEqual(deploy.cost, parseInt(e.execution_result.Success.cost));
        assert.strictEqual(deploy.errorMessage, null);
        assert.strictEqual(deploy.state, 'processed');
        
        let transfers = await deploy.getTransfers();
        let transfer = transfers[0];
        assert.strictEqual(transfers.length, 1);
        
        let expectedTransfer = e.execution_result.Success.effect.transforms[1];
        let expectedTransferKey = expectedTransfer.key;
        expectedTransfer = expectedTransfer.transform.WriteTransfer;

        assert.strictEqual(transfer.transferHash, expectedTransferKey);
        assert.strictEqual(transfer.deployHash, e.deploy_hash);
        // TODO: more test.
    });

    it('Should handle BlockAdded event', async () => {
        await storage.onFinalizedBlock(data.finalizedBlockEvent1);
        let e = data.blockAddedEvent1;
        await storage.onBlockAdded(e);

        let block = await storage.findBlockByHash(e.block_hash);
        assert.strictEqual(block.state, 'added');
        assert.strictEqual(block.parentHash, e.block_header.parent_hash);
    });
});

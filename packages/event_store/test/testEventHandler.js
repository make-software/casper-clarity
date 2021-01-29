var assert = require('chai').assert;
const cp = require('child_process');

const runEventHandler = require('../src/eventHandler');
var models = require('../src/models/index');
const Storage = require('../src/storage');

/**
 * Event Handler stream can be configured in eh-config.json
 * 
 * Tests to be Added
 *  - Handle connection drop 
 */

describe('EventHandler', async () => {
    beforeEach(async () => {
        await models.sequelize.sync({ force: true, logging: false});
        storage = new Storage(models);
    })

    it('TODO: Should handle stream connection drop', async () => {

        // const ssh = cp.spawn('ssh', [
        //     // Operate in the background & Don't execute commands on the remote host
        //     '-fN',
        //     // Local to Remote tunnel
        //     '-L', '',
        //     // Remote to Local tunnel
        //     '-R', '',
        // ])

        assert.strictEqual(1,1);
    });
})
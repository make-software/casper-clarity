const utils = require('./utils');
const chai = require('chai');

describe('Testing SDK', () => {

    beforeEach(() => {
        let masterKey = utils.randomMasterKey();
        this.mainAccount = masterKey.deriveIndex(1);
        this.firstAccount = masterKey.deriveIndex(2);
        this.secondAccount = masterKey.deriveIndex(3);

    });

    it('Should fund account', async () => {
        // Account needs to be funded before getAccount can be called
        await utils.fund(this.mainAccount, 1000);
        let account = await utils.getAccount(this.mainAccount.publicKey);

        let initialBalance = await utils.getBalanceOfByAccountHash(utils.toAccountHashString(this.mainAccount.publicKey));
        console.log(`Initial Balance: ${initialBalance}`);

        await utils.fund(this.mainAccount, 100);

        let finalBalance =  await utils.getBalanceOfByAccountHash(utils.toAccountHashString(this.mainAccount.publicKey));
        console.log(`Final Balance: ${finalBalance}`);

        // Balance should be 1100
        chai.assert(finalBalance > initialBalance, "Balance did not increase");
    });
    
    it('Should make a transfer...', async () => {

        let deployThreshold = 2;
        let keyManagementThreshold = 2;
        let accounts = [
            { publicKey: this.mainAccount.publicKey, weight: 1 },
            { publicKey: this.firstAccount.publicKey, weight: 1 }, 
        ];

        let deploy = utils.keys.setAll(this.mainAccount, deployThreshold, keyManagementThreshold, accounts);
        await utils.sendDeploy(deploy, [this.mainAccount]);

        deploy = utils.transferDeploy(this.mainAccount, this.secondAccount, 1000);
        await utils.sendDeploy(deploy, [this.mainAccount, this.firstAccount]);

        chai.assert();
    });
});
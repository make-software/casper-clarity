const utils = require('./utils');
const chai = require('chai');

describe('Testing SDK', () => {

    beforeEach(() => {
        let masterKey = utils.randomMasterKey();
        this.mainAccount = masterKey.deriveIndex(1);
        this.firstAccount = masterKey.deriveIndex(2);
        this.secondAccount = masterKey.deriveIndex(3);
        console.log("Setting up accounts...");
        console.log("KEY: ", utils.toAccountHashString(this.mainAccount.publicKey));
    });

    it('Should fund account', async () => {
        console.log("KEY: ", this.mainAccount.publicKey);
        
        let account = await utils.printAccount(this.mainAccount);
        let initialBalance = account.mainPurse;
        console.log(initialBalance);
    });
    
    // it('Should make a transfer...', () => {


    //     chai.assert.equal(1, 1, "Transfer failed");
    // });
});
const Storage = require('../storage');
const models = require('../models/index');
const { QueryTypes } = require('sequelize');
const CasperClient = require('../casperClient');

async function generateShortNetworkReport() {
    try {
        const storage = new Storage(models);

        const casperClient = new CasperClient(process.env.NODE_ADDRESS);

        // Peers number
        // @todo

        const auctionInfo = await casperClient.getAuctionInfo();

        // Validators
        const validatorsNum = auctionInfo.era_validators[0].validator_weights.length;
        console.log('Validators: ' + validatorsNum.toString());

        // Delegators
        const delegatorsPublicKeysCountMap = {};
        for (const bidInfo of auctionInfo.bids) {
            if (!bidInfo.bid.inactive && bidInfo.bid.delegators.length > 0) {
                for (const delegation of bidInfo.bid.delegators) {
                    if (!delegatorsPublicKeysCountMap[delegation.public_key]) {
                        delegatorsPublicKeysCountMap[delegation.public_key] = true;
                    }
                }
            }

        }

        const delegatorsNum = Object.keys(delegatorsPublicKeysCountMap).length;
        console.log('Delegators: ' + delegatorsNum.toString());

        // Accounts
        const accountHashesCountMap = {}

        const uniqueSendersAccountHashes = await storage.models.sequelize.query(`
            SELECT DISTINCT fromAccount AS senderAccountHash
            FROM Transfers;
        `, {
            type: QueryTypes.SELECT,
        });

        for (const record of uniqueSendersAccountHashes) {
            accountHashesCountMap[record.senderAccountHash] = true;
        }

        const uniqueRecipientsAccountHashes = await storage.models.sequelize.query(`
            SELECT DISTINCT toAccount AS recipientAccountHash
            FROM Transfers;
        `, {
            type: QueryTypes.SELECT,
        });

        for (const record of uniqueRecipientsAccountHashes) {
            if (!accountHashesCountMap[record.recipientAccountHash]) {
                accountHashesCountMap[record.recipientAccountHash] = true;
            }
        }

        const genesisAccountHashes = await storage.models.sequelize.query(`
            SELECT accountHash
            FROM GenesisAccounts;
        `, {
            type: QueryTypes.SELECT,
        });

        for (const record of genesisAccountHashes) {
            if (!accountHashesCountMap[record.accountHash]) {
                accountHashesCountMap[record.accountHash] = true;
            }
        }

        const accountsNum = Object.keys(accountHashesCountMap).length;
        console.log('Accounts: ' + accountsNum.toString());

        // Deploys
        const deploysNumRecord = await storage.models.sequelize.query(`
            SELECT count(*) as deploysNum
            FROM Deploys;
        `, {
            type: QueryTypes.SELECT,
            plain: true,
        });
        const deploysNum = deploysNumRecord.deploysNum;
        console.log('Deploys: ' + deploysNum.toString());

        // Transfers
        const transfersNumRecord = await storage.models.sequelize.query(`
            SELECT count(*) as transfersNum
            FROM Deploys
            WHERE cost = 10000;
        `, {
            type: QueryTypes.SELECT,
            plain: true,
        });
        const transfersNum = transfersNumRecord.transfersNum;
        console.log('Native transfers: ' + transfersNum.toString());

    } catch (err) {
        console.error(err);
    }
}

generateShortNetworkReport();

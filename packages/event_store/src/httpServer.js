const express = require('express');
const paginate = require('express-paginate');
const cors = require('cors');
const Storage = require('./storage');

let httpServer = (models) => {
    const app = express();
    const storage = new Storage(models);

    const sendPreparedPaginatedResponse = async (req, res, paginatedResult) => {
        const itemCount = paginatedResult.count;
        const pageCount = Math.ceil(paginatedResult.count / req.query.limit);

        const jsonRecords = await Promise.all(paginatedResult.rows.map(row => {
            return row.toJSON();
        }));

        if (req.query.with_amounts_in_currency_id && paginatedResult.rows.length > 0) {
            // Adding amounts in requested currency @todo Extract into a separate function
            if (!paginatedResult.rows[0].timestamp) {
                res.status(404).send('Cannot added ');
                return;
            }

            let minTimestamp, maxTimestamp;
            for (let row of paginatedResult.rows) {
                if (!minTimestamp || row.timestamp < minTimestamp) {
                    minTimestamp = row.timestamp;
                }

                if (!maxTimestamp || row.timestamp > maxTimestamp) {
                    maxTimestamp = row.timestamp;
                }
            }

            minTimestamp.setMinutes(minTimestamp.getMinutes() - 5);
            maxTimestamp.setMinutes(maxTimestamp.getMinutes() + 5);

            const rates = await storage.findCurrencyRatesInDateRange(
                req.query.with_amounts_in_currency_id,
                minTimestamp,
                maxTimestamp
            );

            let fiveMinutes = 1000 * 60 * 5;
            const latestRates = await storage.findCurrencyRatesInDateRange(
                req.query.with_amounts_in_currency_id,
                new Date( Date.now() - fiveMinutes),
                Date.now()
            );

            const currentRate = latestRates.length > 0 ? latestRates[0] : null;

            let currentDiff, bestDiff;

            let amountField;
            const availableAmountFields = [
                'amount',
                'cost',
                'stakedAmount'
            ];

            for (let field of availableAmountFields) {
                if (jsonRecords[0][field]) {
                    amountField = field;
                }
            }

            let amount, csprAmount;
            for (let i in paginatedResult.rows) {
                amount = jsonRecords[i][amountField];
                if (typeof amount === 'string') {
                    csprAmount = parseFloat(
                        amount.substr(0, amount.length  - 9) + '.' + amount.substr(-9)
                    )
                }
                else {
                    csprAmount = amount / 1000000000; // motes to CSPR rate
                }

                currentDiff = 0;
                bestDiff = -(new Date(0,0,0)).valueOf();
                for (let j = 0; j < rates.length; ++j) {
                    currentDiff = Math.abs(paginatedResult.rows[i].timestamp - rates[j].created);
                    if (currentDiff < bestDiff && currentDiff < fiveMinutes) {
                        bestDiff = currentDiff;
                        jsonRecords[i]['currency_' + amountField] = csprAmount * rates[j].rate;
                    }
                    else {
                        break;
                    }
                }

                if (!jsonRecords[i]['currency_' + amountField]) {
                    jsonRecords[i]['currency_' + amountField] = null;
                }

                jsonRecords[i]['current_currency_' + amountField] = currentRate !== null
                    ? csprAmount * currentRate.rate
                    : null;
            }
        }

        res.send({
            data: jsonRecords,
            pageCount: pageCount,
            itemCount: itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        })
    };

    // app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(paginate.middleware(10, 20));

    // Blocks
    app.get('/blocks', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findBlocks(
            {},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get([
        '/block/:blockHash', // @deprecated
        '/blocks/:blockHash',
    ], async (req, res, next) => {
        let block = await storage.findBlockByHash(req.params.blockHash);
        if (block === null) {
            res.status(404).send("Block not found.");
        } else {
            let deploys = await storage.findDeployHashesByBlockHash(block.blockHash);
            res.send(await block.toJSON(deploys));
        }
    });

    app.get('/blocks/:blockHash/deploys', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.getDeploys(
            {blockHash: req.params.blockHash},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get('/blocks/:blockHash/transfers', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findTransfers(
            {blockHash: req.params.blockHash},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    // Deploys
    app.get('/deploys', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.getDeploys(
            {},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get([
        '/deploy/:deployHash', // @deprecated
        '/deploys/:deployHash',
    ], async (req, res, next) => {
        let deploy = await storage.findDeployByHash(req.params.deployHash);
        if (deploy === null) {
            res.status(404).send("Deploy not found.");
        } else {
            res.send(await deploy.toJSON());
        }
    });

    app.get(['/deploys/:deployHash/raw'], async (req, res, next) => {
        let deploy = await storage.findRawDeploy(req.params.deployHash);
        if (deploy === null) {
            res.status(404).send("Deploy not found.");
        } else {
            res.send(JSON.stringify(deploy));
        }
    });

    app.get('/deploys/:deployHash/transfers', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findTransfers(
            {deployHash: req.params.deployHash},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    // Accounts
    app.get([
        '/accountDeploys/:account', // @deprecated
        '/accounts/:account/deploys',
    ], async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findDeploysByAccount(
            req.params.account,
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get('/accounts/:accountHash/transfers', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findAccountTransfers(
            req.params.accountHash,
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    // Era validators
    app.get('/era-validators', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findEraValidators(
            req.query,
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    // Validators
    app.get('/validators/:publicKey/total-rewards', async (req, res, next) => {
        const result = await storage.getTotalValidatorRewards(req.params.publicKey);
        if (Number.isNaN(result)) {
            res.send('0');
        }
        else {
            res.send(result.toString());
        }
    });

    app.get('/validators/:publicKey/total-delegator-rewards', async (req, res, next) => {
        const result = await storage.getTotalValidatorDelegatorRewards(req.params.publicKey);
        if (Number.isNaN(result)) {
            res.send('0');
        }
        else {
            res.send(result.toString());
        }
    });

    app.get('/validators/:publicKeyHex/blocks', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findBlocks(
            {proposer: req.params.publicKeyHex},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get('/validators/:publicKey/rewards', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findValidatorRewards(
            {publicKey: req.params.publicKey},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    // Delegators
    app.get('/delegators/:publicKey/rewards', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findDelegatorRewards(
            {publicKey: req.params.publicKey},
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.use(function (req,res,next){
        res.status(400).send('Bad Request');
    });

    return app;
}

module.exports = httpServer;

const express = require('express');
const paginate = require('express-paginate');
const cors = require('cors');
const Storage = require('./storage');
const CasperClient = require('./casperClient');
const { BigNumber } = require('@ethersproject/bignumber');
const { formatDate } = require('./utility');

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
                res.status(400).send('Cannot add amounts in the requested currency');
                return;
            }

            let amountField;
            const availableAmountFields = [
                'amount',
                'cost',
                'stakedAmount'
            ];

            for (let field of availableAmountFields) {
                if (paginatedResult.rows[0][field] !== undefined) {
                    amountField = field;
                    break;
                }
            }

            if (!amountField) {
                res.status(400).send('There is no amount field in the requested data');
                return;
            }

            let oneMinute = 1000 * 60;

            const minutes = new Set();
            for (let row of paginatedResult.rows) {
                minutes.add(formatDate(new Date( row.timestamp - oneMinute * 2)));
                minutes.add(formatDate(new Date( row.timestamp - oneMinute)));
                minutes.add(formatDate(new Date( row.timestamp)));
                minutes.add(formatDate(new Date( row.timestamp + oneMinute)));
                minutes.add(formatDate(new Date( row.timestamp + oneMinute * 2)));
            }

            const rates = await storage.findCurrencyRatesForDates(
                req.query.with_amounts_in_currency_id,
                Array.from(minutes.values())
            );

            const currentRate = await storage.getLatestRate(req.query.with_amounts_in_currency_id);

            let currentDiff, bestDiff;
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
                    if (currentDiff < bestDiff) {
                        bestDiff = currentDiff;
                        jsonRecords[i]['currency_' + amountField] = csprAmount * rates[j].rate;
                    }
                    else {
                        break;
                    }
                }

                if (jsonRecords[i]['currency_' + amountField] === undefined) {
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
            {
                ...req.query,
                blockHash: req.params.blockHash
            },
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
            {
                ...req.query,
                deployHash: req.params.deployHash
            },
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
        await sendPreparedPaginatedResponse(req, res, await storage.findTransfers(
            {
                ...req.query,
                accountHash: req.params.accountHash
            },
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    // Transfers
    app.get('/transfers', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findTransfers(
            req.query,
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
        const preparedResult = Number.isNaN(result) ? 0 : result;

        if (req.query.as_scalar) {
            res.send(preparedResult.toString());
        }
        else {
            res.send(JSON.stringify({
                data: preparedResult
            }));
        }
    });

    app.get('/validators/:publicKey/total-delegator-rewards', async (req, res, next) => {
        const result = await storage.getTotalValidatorDelegatorRewards(req.params.publicKey);
        const preparedResult = Number.isNaN(result) ? 0 : result;

        if (req.query.as_scalar) {
            res.send(preparedResult.toString());
        }
        else {
            res.send(JSON.stringify({
                data: preparedResult
            }));
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

    app.get('/delegators/:publicKey/total-rewards', async (req, res, next) => {
        const result = await storage.getTotalDelegatorRewards(req.params.publicKey);
        const preparedResult = Number.isNaN(result) ? 0 : result;

        if (req.query.as_scalar) {
            res.send(preparedResult.toString());
        }
        else {
            res.send(JSON.stringify({
                data: preparedResult
            }));
        }
    });

    // Supply
    const getTotalSupply = async () => {
        const motesToCSPRRate = 1000000000;
        const casperClient = new CasperClient(process.env.NODE_ADDRESS);
        const latestBlock = await casperClient.getLatestBlock();
        const totalSupplyInMotes = await casperClient.getStoredValue(latestBlock.header.state_root_hash, process.env.TOTAL_SUPPLY_UREF);
        return BigNumber.from(totalSupplyInMotes.CLValue.parsed).div(motesToCSPRRate);
    };

    const getCirculatingSupply = async (totalSupply) => {
        const genesisTokensAmount = 10000000000;
        const seigniorageAmount = totalSupply.sub(genesisTokensAmount);

        const now = Date.now();
        const releaseSchedule = await storage.findReleaseSchedule(now);
        const releasedGenesisTokensAmount = releaseSchedule.amount;

        const releasedSeigniorageProportion = releasedGenesisTokensAmount / genesisTokensAmount;
        const releasedSeigniorageAmount = seigniorageAmount * releasedSeigniorageProportion;

        return BigNumber.from(Math.round(releasedGenesisTokensAmount + releasedSeigniorageAmount));
    };

    app.get('/supply', async (req, res, next) => {
        const totalSupply = await getTotalSupply();
        const circulatingSupply = await getCirculatingSupply(totalSupply);

        res.send(JSON.stringify({
            data: {
                token: 'CSPR',
                total: totalSupply.toNumber(),
                circulating: circulatingSupply.toNumber(),
                timestamp: Date.now()
            }
        }));
    });

    app.get('/supply/total', async (req, res, next) => {
        const totalSupply = await getTotalSupply();

        if (req.query.as_scalar) {
            res.send(totalSupply.toString());
        }
        else {
            res.send(JSON.stringify({
                data: totalSupply.toNumber()
            }));
        }
    });

    app.get('/supply/circulating', async (req, res, next) => {
        const totalSupply = await getTotalSupply();
        const circulatingSupply = await getCirculatingSupply(totalSupply);

        if (req.query.as_scalar) {
            res.send(circulatingSupply.toString());
        }
        else {
            res.send(JSON.stringify({
                data: circulatingSupply.toNumber()
            }));
        }
    });

    // Rate
    app.get('/rates/:currencyId/amount', async (req, res, next) => {
        const currentRate = await storage.getLatestRate(req.params.currencyId);

        if (req.query.as_scalar) {
            res.send(currentRate.rate.toString());
        }
        else {
            res.send(JSON.stringify({
                data: currentRate.rate
            }));
        }
    });

    app.use(function (req,res,next){
        res.status(400).send('Bad Request');
    });

    return app;
};

module.exports = httpServer;

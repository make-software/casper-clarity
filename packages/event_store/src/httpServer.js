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
                res.status(400).send({error: {message: 'Cannot add amounts in the requested currency'}});
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
                res.status(400).send({error: {message: 'There is no amount field in the requested data'}});
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
                        amount.substr(0, amount.length  - 9) + '.'  + '0'.repeat(Math.max(9 - amount.length, 0)) + amount.substr(-9)
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
            req.query,
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get([
        '/block/:blockHash', // @deprecated
    ], async (req, res, next) => {
        let block = await storage.findBlockByHash(req.params.blockHash);
        if (block === null) {
            res.status(404).send("Block not found.");
        } else {
            let deploys = await storage.findDeployHashesByBlockHash(block.blockHash);
            res.send(await block.toJSON(deploys));
        }
    });

    app.get([
        '/blocks/:blockHash',
    ], async (req, res, next) => {
        let block = await storage.findBlockByHash(req.params.blockHash);
        if (block === null) {
            res.status(404).send({error: {message: "Block not found."}});
        } else {
            let deploys = await storage.findDeployHashesByBlockHash(block.blockHash);
            res.send({data: await block.toJSON(deploys)});
        }
    });

    app.get('/blocks/:blockHash/deploys', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.getDeploys(
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
            req.query,
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get([
        '/deploy/:deployHash', // @deprecated
    ], async (req, res, next) => {
        let deploy = await storage.findDeployByHash(req.params.deployHash);
        if (deploy === null) {
            res.status(404).send("Deploy not found.");
        } else {
            res.send(await deploy.toJSON());
        }
    });

    app.get([
        '/deploys/:deployHash',
    ], async (req, res, next) => {
        let deploy = await storage.findDeployByHash(req.params.deployHash);
        if (deploy === null) {
            res.status(404).send({error: {message: "Deploy not found."}});
        } else {
            res.send({data: await deploy.toJSON()});
        }
    });

    app.get(['/deploys/:deployHash/raw'], async (req, res, next) => {
        let deploy = await storage.findRawDeploy(req.params.deployHash);
        if (deploy === null) {
            res.status(404).send({error: {message: "Deploy not found."}});
        } else {
            res.send({data: JSON.stringify(deploy)});
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
        await sendPreparedPaginatedResponse(req, res, await storage.getDeploys(
            {
                ...req.query,
                account: req.params.account
            },
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

    // Genesis accounts transfers
    app.get('/genesis-accounts-transfers', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findGenesisAccountsTransfers(
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

        if (req.query.as_scalar) {
            res.send(result);
        }
        else {
            res.send(JSON.stringify({
                data: result
            }));
        }
    });

    app.get('/validators/:publicKey/total-delegator-rewards', async (req, res, next) => {
        const result = await storage.getTotalValidatorDelegatorRewards(req.params.publicKey);

        if (req.query.as_scalar) {
            res.send(result);
        }
        else {
            res.send(JSON.stringify({
                data: result
            }));
        }
    });

    app.get('/validators/:publicKeyHex/blocks', async (req, res, next) => {
        await sendPreparedPaginatedResponse(req, res, await storage.findBlocks(
            {
                ...req.query,
                proposer: req.params.publicKeyHex
            },
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
            {
                ...req.query,
                publicKey: req.params.publicKey
            },
            req.query.limit,
            req.skip,
            req.query.order_by,
            req.query.order_direction
        ));
    });

    app.get('/delegators/:publicKey/total-rewards', async (req, res, next) => {
        const result = await storage.getTotalDelegatorRewards(req.params.publicKey);

        if (req.query.as_scalar) {
            res.send(result);
        }
        else {
            res.send(JSON.stringify({
                data: result
            }));
        }
    });

    // Supply
    const motesToCSPRRate = '1000000000';

    const getTotalSupply = async () => {
        const casperClient = new CasperClient(process.env.NODE_ADDRESS);
        const latestBlock = await casperClient.getLatestBlock();
        const totalSupplyInMotes = await casperClient.getStoredValue(latestBlock.header.state_root_hash, process.env.TOTAL_SUPPLY_UREF);
        return BigNumber.from(totalSupplyInMotes.CLValue.parsed.toString()).div(motesToCSPRRate);
    };

    const getReleasedGenesisAccountTokens = async () => {
        const genesisAccounts = await storage.getGenesisAccounts();

        // Index genesis account motes by account hashes
        const indexedGenesisBalances = {};
        for (const genesisAccount of genesisAccounts) {
            indexedGenesisBalances[genesisAccount.accountHash] = BigNumber.from(genesisAccount.balance);
        }

        // Rebalance genesis account balances based on the transfers between genesis accounts
        const internalGenesisAccountTransfers = await storage.getTokensMovedBetweenGenesisAccounts();
        for (const transfer of internalGenesisAccountTransfers) {
            // Note, that here we can also count a transfer of non-genesis tokens (since they are fungible)
            // It is addressed in the transfer overflow correction logic
            indexedGenesisBalances[transfer.fromAccount] = indexedGenesisBalances[transfer.fromAccount]
                .sub(transfer.amount);

            indexedGenesisBalances[transfer.toAccount] = indexedGenesisBalances[transfer.toAccount]
                .add(transfer.amount);
        }

        // If a genesis account transferred to other genesis accounts more tokens than it had
        // in the balance on genesis then we should adjust the amount of the genesis tokens that
        // became circulating by that overflow value
        // The following correction is removed under assumption that it's not needed in the near future
        // and the approach will be reevaluated with time to be more accurate
        // let internalTransfersOverflowCorrection = BigNumber.from(0);
        // for (const transfer of internalGenesisAccountTransfers) {
        //     if (indexedGenesisBalances[transfer.fromAccount].lte(0)) {
        //         internalTransfersOverflowCorrection = internalTransfersOverflowCorrection
        //             .add(indexedGenesisBalances[transfer.fromAccount]);
        //     }
        // }

        // Calculate genesis tokens transferred out of the genesis accounts
        let releasedGenesisMotesAmount = BigNumber.from(0);

        const externalGenesisAccountTransfers = await storage.getTokensMovedOutOfGenesisAccounts();
        for (const transfer of externalGenesisAccountTransfers) {
            if (indexedGenesisBalances[transfer.fromAccount].lte(0)) {
                // If no genesis tokens left in the account then do nothing
                continue;
            }

            if (indexedGenesisBalances[transfer.fromAccount].gte(transfer.amount)) {
                // If genesis token amount is greater than the transfer amount then
                // increase the circulating genesis tokens by this amount
                releasedGenesisMotesAmount = releasedGenesisMotesAmount
                    .add(transfer.amount);

                indexedGenesisBalances[transfer.fromAccount] = indexedGenesisBalances[transfer.fromAccount]
                    .sub(transfer.amount);
            }
            else {
                // Otherwise increase the circulating genesis tokens by the account balance remainder
                releasedGenesisMotesAmount = releasedGenesisMotesAmount
                    .add(indexedGenesisBalances[transfer.fromAccount]);

                indexedGenesisBalances[transfer.fromAccount] = indexedGenesisBalances[transfer.fromAccount]
                    .sub(indexedGenesisBalances[transfer.fromAccount]);
            }
        }

        return releasedGenesisMotesAmount
            // .add(internalTransfersOverflowCorrection)
            .div(motesToCSPRRate)
            .toNumber();
    };

    const getCirculatingSupply = async (totalSupply, withReleasedGenesisTokens) => {
        const genesisTokensAmount = 10000000000;
        const seigniorageAmount = totalSupply.sub(genesisTokensAmount);

        const now = Date.now();
        const releaseSchedule = await storage.findReleaseSchedule(now);
        let releasedGenesisTokensAmount = releaseSchedule ? parseInt(releaseSchedule.amount) : 0;
        if (withReleasedGenesisTokens) {
            releasedGenesisTokensAmount += await getReleasedGenesisAccountTokens();
        }

        const releasedSeigniorageProportion = releasedGenesisTokensAmount / genesisTokensAmount;
        const releasedSeigniorageAmount = seigniorageAmount * releasedSeigniorageProportion;

        return BigNumber.from(Math.round(releasedGenesisTokensAmount + releasedSeigniorageAmount));
    };

    app.get('/supply', async (req, res, next) => {
        const totalSupply = await getTotalSupply();

        const withReleasedGenesisTokens = process.env.TRACK_GENESIS_TOKENS === '1' ||
            req.query.track_genesis_tokens === '1';

        const circulatingSupply = await getCirculatingSupply(totalSupply, withReleasedGenesisTokens);

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
        res.status(400).send({error: {message: 'Bad Request'}});
    });

    return app;
};

module.exports = httpServer;

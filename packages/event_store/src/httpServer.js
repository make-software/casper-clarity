const express = require('express');
const paginate = require('express-paginate');
const cors = require('cors');
const Storage = require('./storage');

const sendPreparedPaginatedResponse = async (req, res, paginatedResult) => {
    const itemCount = paginatedResult.count;
    const pageCount = Math.ceil(paginatedResult.count / req.query.limit);

    res.send({
        data: await Promise.all(paginatedResult.rows.map(row => {
            return row.toJSON();
        })),
        pageCount: pageCount,
        itemCount: itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    })
};

let httpServer = (models) => {
    const app = express();
    const storage = new Storage(models);

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

var express = require('express');
var paginate = require('express-paginate');
var cors = require('cors');
const Storage = require('./storage');
var storage = null;

let httpServer = (models) => {
    var app = express();
    app.use(cors());
    storage = new Storage(models);
    
    // app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.get('/block/:blockHash', async (req, res, next) => {
        let block = await storage.findBlockByHash(req.params.blockHash);
        if (block === null) {
            res.status(404).send("Block not found.");
        } else {
            let deploys = await storage.findDeployHashesByBlockHash(block.blockHash);
            res.send(await block.toJSON(deploys));
        }
    });

    app.get('/deploy/:deployHash', async (req, res, next) => {
        let deploy = await storage.findDeployByHash(req.params.deployHash);
        if (deploy === null) {
            res.status(404).send("Deploy not found.");
        } else {
            res.send(await deploy.toJSON(skipTransfers = false));
        }
    });

    app.use(paginate.middleware(10, 20));

    app.get('/blocks', async (req, res, next) => {
        let blocks = await storage.findBlocks(req.query.limit, req.skip);
        const itemCount = blocks.count;
        const pageCount = Math.ceil(blocks.count / req.query.limit);
        let result = {
            data: await Promise.all(blocks.rows.map(block => {
                return block.toJSON();
            })),
            pageCount: pageCount,
            itemCount: itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        }
        res.send(result);
    });

    app.get('/deploys', async (req, res, next) => {
        let deploys = await storage.getDeploys(req.query.limit, req.skip);
        const itemCount = deploys.count;
        const pageCount = Math.ceil(deploys.count / req.query.limit);
        let result = {
            data: await Promise.all(deploys.rows.map(deploy => {
                return deploy.toJSON();
            })),
            pageCount: pageCount,
            itemCount: itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        }
        res.send(result);
    });

    app.get('/accountDeploys/:account', async (req, res, next) => {
        let deploys = await storage.findDeploysByAccount(req.params.account, req.query.limit, req.skip);
        const itemCount = deploys.count;
        const pageCount = Math.ceil(deploys.count / req.query.limit);
        let result = {
            data: await Promise.all(deploys.rows.map(deploy => {
                return deploy.toJSON(skipTransfers = true);
            })),
            pageCount: pageCount,
            itemCount: itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        }
        res.send(result);
    });

    app.get('/transfers/:accountHash', async (req, res, next) => {
        let transfers = await storage.findTransfers(req.params.accountHash);
        if (transfers.length == 0) {
            res.status(404).send("Transfers not found.");
        } else {
            res.send(transfers.map(t => t.toJSON()));
        }
    });

    app.get('/era-validators', async (req, res, next) => {
        let eraValidators = await storage.findEraValidators(req.query, req.query.limit, req.skip);

        const itemCount = eraValidators.count;
        const pageCount = Math.ceil(eraValidators.count / req.query.limit);
        let result = {
            data: await Promise.all(eraValidators.rows.map(deploy => {
                return deploy.toJSON();
            })),
            pageCount: pageCount,
            itemCount: itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        };
        res.send(result);
    });

    app.get('/validators/:publicKeyHex/rewards', async (req, res, next) => {
        const result = await storage.getTotalValidatorRewards(req.params.publicKeyHex);
        if (Number.isNaN(result)) {
            res.status(404).send('Validator not found.');
        }
        else {
            res.send(result.toString());
        }
    });

    app.use(function (req,res,next){
        res.status(400).send('Bad Request');
    });

    return app;
}

module.exports = httpServer;

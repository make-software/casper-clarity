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
            res.send(await block.toJSON());
        }
    });

    app.get('/deploy/:deployHash', async (req, res, next) => {
        let deploy = await storage.findDeployByHash(req.params.deployHash);
        if (deploy === null) {
            res.status(404).send("Deploy not found.");
        } else {
            res.send(await deploy.toJSON());
        }
    });

    app.use(paginate.middleware(10, 20));

    app.get('/blocks', async (req, res, next) => {
        let blocks = await storage.findBlocks(req.query.limit, req.skip);
        const itemCount = blocks.count;
        const pageCount = Math.ceil(blocks.count / req.query.limit);
        let result = {
            data: await Promise.all(blocks.rows.map(block => {
                return block.toJSON(skipDeploys = true);
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
                return deploy.toJSON();
            })),
            pageCount: pageCount,
            itemCount: itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        }
        res.send(result);
    });

    app.use(function (req,res,next){
        res.status(400).send('Bad Request');
    });

    return app;
}

module.exports = httpServer;

import { CasperServiceByJsonRPC, Keys } from 'casper-client-sdk';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'express-jwt';
import fs from 'fs';
import https from 'https';
import jwksRsa from 'jwks-rsa';
import path from 'path';
import * as promClient from 'prom-client';

import { decodeBase64 } from 'tweetnacl-util';
// TODO: Everything in config.json could come from env vars.
import config from './config.json';
import { StoredFaucetService } from './StoredFaucetService';
import { Counter, Gauge } from 'prom-client';
import { CronJob } from 'cron';
import { MetricsFromAuth0 } from './metricsFromAuth0';
import { ManagementClient } from 'auth0';
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://auth0.com/docs/quickstart/spa/vanillajs/02-calling-an-api
// https://github.com/auth0/express-jwt

// initialize configuration
dotenv.config();

export class ClarityMetrics {
  public faucetRequestCounter: Counter<string>;
  public deployRequestCounter: Counter<string>;
  public accountKeyGauge: Gauge<string>;
  public accountGauge: Gauge<string>;
  public dailyLoginGauge: Gauge<string>;
  public dailySignupGauge: Gauge<string>;
  constructor() {
    this.faucetRequestCounter = new promClient.Counter({
      name: 'faucet_request_total',
      help: 'Count of faucet requests'
    });
    this.deployRequestCounter = new promClient.Counter({
      name: 'deploy_request_total',
      help: 'Count of deploy requests'
    });
    this.accountKeyGauge = new promClient.Gauge({
      name: 'account_key_total',
      help: 'Count of account key'
    });
    this.accountGauge = new promClient.Gauge({
      name: 'user_account_total',
      help: 'Count of user account'
    });
    this.dailyLoginGauge = new promClient.Gauge({
      name: 'daily_login_days',
      help: 'Number of logins every day'
    });
    this.dailySignupGauge = new promClient.Gauge({
      name: 'daily_signup_days',
      help: 'Number of sign up every day'
    });
  }
}

const clarityMetrics = new ClarityMetrics();
const enableAuth0Metrics = process.env.ENABLE_AUTH0_METRICS === 'true';

if (enableAuth0Metrics) {
  const DOMAIN = process.env.DOMAIN;
  const CLIENT_ID = process.env.CLIENT_ID;
  const AUDIENCE = process.env.AUDIENCE;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  const managementClient = new ManagementClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    audience: AUDIENCE,
    domain: DOMAIN!,
    scope: 'read:stats read:users create:users'
  });
  const metricsFromAuth0 = new MetricsFromAuth0(
    managementClient,
    clarityMetrics
  );
  // set up a cron job which run every 6 hours
  // @ts-ignore
  new CronJob(
    '0 */6 * * *', // every 6 hours
    () => {
      metricsFromAuth0.runJob();
    },
    null,
    false,
    undefined,
    undefined,
    true
  ).start();
}

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT!;

const contractKeys = Keys.Ed25519.parseKeyFiles(
  process.env.FAUCET_ACCOUNT_PUBLIC_KEY_PATH!,
  process.env.FAUCET_ACCOUNT_PRIVATE_KEY_PATH!
);

// Constant payment amount.
const paymentAmount = BigInt(process.env.PAYMENT_AMOUNT!);
// How much to send to a user in a faucet request.
const transferAmount = BigInt(process.env.TRANSFER_AMOUNT)!;

const networkName = process.env.NETWORK_NAME!;
const chainName = process.env.CHAIN_NAME!;

// gRPC client to the node.
const jsonRpcUrl = process.env.JSON_RPC_URL!;
const casperService = new CasperServiceByJsonRPC(jsonRpcUrl);
const storedFaucetService = new StoredFaucetService(
  contractKeys,
  paymentAmount,
  transferAmount,
  casperService,
  chainName
);

const app = express();

if (process.env.ALLOWED_ORIGINS) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
  app.use((req, res, next) => {
    if (req.headers.origin) {
      for (const allowedOrigin of allowedOrigins) {
        if (req.headers.origin.startsWith(allowedOrigin)) {
          res.header('Access-Control-Allow-Origin', req.headers.origin);
          res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          );

          if (req.method === 'OPTIONS') {
            res.header(
              'Access-Control-Allow-Methods',
              'PUT, POST, PATCH, DELETE, GET'
            );
            return res.status(200).json({});
          }

          break;
        }
      }
    }

    return next();
  });
}

// Support using the faucet in offline mode with the mock.
const isMock = process.env.AUTH_MOCK_ENABLED === 'true';

// create the JWT middleware
const checkJwt: express.RequestHandler = isMock
  ? (req, res, next) => {
      const token = req.headers.authorization;
      if (token && token.startsWith('Bearer mock|')) {
        (req as any).user = { sub: token.substr(7) };
      } else if (token) {
        return res.status(401).send({ msg: 'Expected the mock token only.' });
      }
      return next();
    }
  : jwt({
      algorithms: ['RS256'],
      audience: config.auth0.audience,
      issuer: `https://${config.auth0.domain}/`,
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`,
        rateLimit: true
      })
    });

if (process.env.JSON_RPC_PROXY === 'true') {
  app.use(
    '/rpc',
    createProxyMiddleware('/rpc', {
      target: jsonRpcUrl,
      changeOrigin: true,
      onError: err => {
        console.log(err);
      }
    })
  );
}

// Render the `config.js` file dynamically.
app.get('/config.js', (_, res) => {
  const conf = {
    auth0: config.auth0, // @deprecated
    auth: {
      // @deprecated
      mock: {
        enabled: isMock
      }
    },
    network: {
      // @deprecated
      name: networkName,
      chainName
    },
    grpc: {
      // @deprecated
      // In production we can leave this empty and then it should
      // connect to window.origin and be handled by nginx.
      url: process.env.UI_GRPC_URL
    },
    networkName: process.env.NETWORK_NAME, // @deprecated
    eventStoreUrl: process.env.REACT_APP_EVENT_STORE_URL, // @deprecated
    withFaucet: process.env.NO_FAUCET !== '1', // @deprecated
    faucetApiUrl: process.env.FAUCET_API_URL, // @deprecated
    withCsprLiveNotice: process.env.WITH_CSPR_LIVE_NOTICE === '1', // @deprecated
    csprLiveName: process.env.CSPR_LIVE_NAME, // @deprecated
    csprLiveUrl: process.env.CSPR_LIVE_URL, // @deprecated
    clarityUrl: process.env.CLARITY_URL, // @deprecated
    network_name: process.env.NETWORK_NAME,
    event_store_url: process.env.REACT_APP_EVENT_STORE_URL,
    with_faucet: process.env.NO_FAUCET !== '1',
    faucet_api_url: process.env.FAUCET_API_URL,
    with_ledger: process.env.WITH_LEDGER === '1',
    transfer_cost: process.env.TRANSFER_COST,
    transfer_min_amount: process.env.TRANSFER_MIN_AMOUNT,
    delegate_cost: process.env.DELEGATE_COST,
    delegate_delay: process.env.DELEGATE_DELAY,
    undelegate_cost: process.env.UNDELEGATE_COST,
    undelegate_delay: process.env.UNDELEGATE_DELAY,
    era_duration: process.env.ERA_DURATION,
    auction_manager_contract_hash: process.env.AUCTION_MANAGER_CONTRACT_HASH
  };
  res.header('Content-Type', 'application/javascript');
  res.send(`var config = ${JSON.stringify(conf, null, 2)};`);
});

// Serve the static files of the UI
// STATIC_ROOT needs to be an absolute path, otherwise we assume we'll use the `ui` projec's build output.
const staticRoot = path.isAbsolute(process.env.STATIC_ROOT!)
  ? process.env.STATIC_ROOT!
  : path.join(__dirname, process.env.STATIC_ROOT!);

app.use(express.static(staticRoot));

// Parse JSON sent in the body.
app.use(express.json());

app.get('/metrics', (_, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

app.post('/api/collect', checkJwt, (req, res) => {
  const eventType = req.body.eventType;
  switch (eventType) {
    case 'deploy':
      clarityMetrics.deployRequestCounter.inc();
      break;
    default:
  }
  res.end();
});

// Faucet endpoint.
app.post('/api/faucet', (req, res) => {
  // express-jwt put the token in res.user
  // const userId = (req as any).user.sub;
  const accountPublicKeyHashBase64 = req.body.accountPublicKeyHashBase64 || '';
  if (accountPublicKeyHashBase64 === '') {
    throw Error("The 'accountPublicKeyHashBase64' is missing.");
  }

  // Prepare the signed deploy.
  const accountPublicKeyHash = decodeBase64(accountPublicKeyHashBase64);

  // Send the deploy to the node and return the deploy hash to the browser.
  storedFaucetService
    // .callStoredFaucet(accountPublicKeyHash) // we switched to the WASM contract because of the security fix introduced in 1.3
    .callBytesFaucet(accountPublicKeyHash)
    .then(deployHash => {
      const response = {
        deployHashBase16: Buffer.from(deployHash).toString('hex')
      };
      clarityMetrics.faucetRequestCounter.inc();
      res.send(response);
    })
    .catch(err => {
      const msg = err.toString();
      // The service already logged it.
      res.status(500).send({ error: msg });
    });
});

app.get('*', (_, res) => {
  res.sendFile(path.join(staticRoot, 'index.html'));
});

// Error report in JSON.
app.use((err: any, req: any, res: any, next: any) => {
  console.log('ERROR', req.path, err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ msg: 'Invalid token' });
  }
  if (req.path === '/api/faucet') {
    return res.status(500).send({ error: err.toString() });
  }
  next(err, req, res);
});

// start the express server
if (process.env.SERVER_USE_TLS === 'true') {
  const cert = process.env.SERVER_TLS_CERT_PATH!;
  const key = process.env.SERVER_TLS_KEY_PATH!;
  https
    .createServer(
      {
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert)
      },
      app
    )
    .listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`server started at https://localhost:${port}`);
    });
} else {
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  });
}

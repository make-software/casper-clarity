# Casper Explorer

The purpose of the explorer is to help users interact with the blockchain:

- Sign up to participate in devnet
- Create accounts (public/private key pairs)
- Ask the faucet for tokens on devnet
- Explore the block DAG
- Deploy contracts

## Prerequisites

You need to have a Casperlabs node to run the Clarity against, and a proxy in front of it. This repository offers a docker image you can build to use as the proxy. To build the image execute the following command from the repository root:

```
docker build -t clarity-node-proxy -f Dockerfile.node-proxy .
```

## Setup

After cloning the repo `cd` to the root of the clarity dir and run:

```
  yarn install  // Installs dependencies
  yarn build    // Builds components from packages
```

You should then spin up an [nctl](https://github.com/CasperLabs/casper-node/tree/master/utils/nctl) network of nodes locally to run Clarity against.

Now that the packages and network are ready you will need 4 terminals to get it all working:

```
// Terminal A
  cd packages/event_store
  rm development_sqlite.db    // Wipe old data
  npm run start-web-server    // Start event-store

// Terminal B
  export NODE_ADDRESS=xxx.xxx.xxx.xxx && npm run start-event-handler // Start processing event-stream

// Terminal C
docker run -p 8081:80 -e NODE_ADDRESS=xxx.xxx.xxx.xxx clarity-node-proxy // Start node proxy

// Terminal D
  cd ../../
  yarn dev    // Start local Clarity instance
```

If you want to run the **Cypress** test suite you will then need one more terminal and run one of the following:

```
  yarn cypress:dev    // Opens the Cypress GUI and holds the test window open on
                       completion of the suite.
  yarn cypress:chrome // Runs the Cypress tests and closes the browser on completion,
                        results are printed to the terminal.
```
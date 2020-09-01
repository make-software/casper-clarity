# Casper Explorer

The purpose of the explorer is to help users interact with the blockchain:

- Sign up to participate in devnet
- Create accounts (public/private key pairs)
- Ask the faucet for tokens on devnet
- Explore the block DAG
- Deploy contracts

## Install

You could use `yarn run bootstrap` to install all dependencies

## Build

You can use `yarn` in the `ui`, `server` and `sdk` directories to build and interactively develop the components.

To package the whole thing into a docker image, run `docker-build/clarity` in the project root directory.

## Test

To test the faucet we need the node running and ready to accept deploys. We also have to fund it with initial tokens and send one deploy in the name of the genesis account which will transfer funds to the faucet.

We can use the `contracts/transfer` to donate the initial amount of funds to the faucet. Contracts will be built together with the docker image, but you can build them separately by running `make .make/explorer/contracts` in the top level directory.

Start a local docker network first:

```sh
cd ../hack/docker
make up node-0/up
cd -
```

Start the `server` in one console:

```sh
cd server
npm run dev
```

and the `ui` in another one:

```sh
cd ui
npm start
```

A new browser window will automatically open pointing at the app running at http://localhost:8000

The server should serve the config that will route traffic to the `grpcwebproxy` container running in Docker, while we can work on the UI and see it reload after each change. Check out the `server` README for details about how it can be configured to tell the UI to connect to a remote server like devnet.

### Fund the Faucet

If we were not using the `faucet-account` that's created in the `hack/docker` setup as the Faucet account, we'd have to establish the an account by transfering some tokens to it that it can later pass on. Here's how to do it:

Generate the necessary contracts first:

```console
cd .. ; make build-explorer-contracts ; cd -
```

The `server` component has a utility program to do the initial token transfer, let's build that first (not necessary if we already built everything with docker):

```console
cd server ; npm run build ; cd -
```

Run the transfer from the genesis account to our test faucet account.

```sh
node ./server/dist/transfer.js \
  --host-url http://localhost:8401 \
  --transfer-contract-path contracts/transfer_to_account_u512.wasm \
  --payment-contract-path contracts/standard_payment.wasm \
  --payment-amount 100000 \
  --gas-price 10 \
  --from-private-key-path ../hack/docker/keys/faucet-account/account-private.pem \
  --from-public-key-path ../hack/docker/keys/faucet-account/account-public.pem \
  --to-public-key-path ./server/test.public.key \
  --amount 10000000
```

NOTE: If you are connecting to a HTTPS endpoint which uses a self-signed certificate, which is the case in local testing, you have to relax the SSL certificate checks in Node.js like so:

```console
$ export NODE_TLS_REJECT_UNAUTHORIZED=0
$ node ./server/dist/transfer.js \
  --host-url https://localhost:8443 \
  ...
```

If successful, it should print something like this:

```console
Transfering tokens to account 045499d51a013e06c6cbb5734843cf3c7f08d66af312d81238ffeb54244f1800
Deploying 7401ecbe8b2c4e4de2c1e6422fddcfd1ae9d128058e2e6dba97ba62fc51db734 to http://localhost:8401
Done.
```

You can also confirm it in the node's logs in `hack/docker`:

```console
$ docker logs --tail 1 node-0
18:13:45.264 [grpc-default-executor-2] INFO  i.c.casper.MultiParentCasperImpl - Received Deploy 7401ecbe8b2c4e4de2c1e6422fddcfd1ae9d128058e2e6dba97ba62fc51db734 (f78786150599b50a1353476f5e2f12cd13c214e512096741c48e7ec63639af56 / 1)
```

The auto-propose feature is by default not enabled in the `hack/docker` setup, so you have to manually trigger proposal.

```console
$ ./client.sh node-0 propose
Response: Success! Block d1d95074f4... created and added.
```

Following this we can check the status of our deploy. The result of the processing and the fault tolerance can be found in the output:

```console
$ ./client.sh node-0 show-deploy 7401ecbe8b2c4e4de2c1e6422fddcfd1ae9d128058e2e6dba97ba62fc51db734

deploy {
  deploy_hash: "7401ecbe8b2c4e4de2c1e6422fddcfd1ae9d128058e2e6dba97ba62fc51db734"
  header {
    account_public_key: "f78786150599b50a1353476f5e2f12cd13c214e512096741c48e7ec63639af56"
    timestamp: 1562350425051
    gas_price: 0
    body_hash: "1ba3a8335e68cbfd461865876bccc9225c560db9045d862ad16d26e3bbbe0a87"
  }
  ...
}
processing_results {
  block_info {
    summary {
      block_hash: "d1d95074f4779c8de1ed851f22f3bb6c71089359b443b46f747606b1fbc0c974"
      ...
    }
    status {
      fault_tolerance: -1.0
      stats {
        block_size_bytes: 957577
        deploy_error_count: 0
      }
    }
  }
  cost: 20803
  is_error: false
  error_message: ""
}
```

If the deploy was successfully executed we can check the balance of the account we wished to give the tokens to:

```console
$ ./client.sh node-0 query-state \
    -t address \
    -k 045499d51a013e06c6cbb5734843cf3c7f08d66af312d81238ffeb54244f1800 \
    -p "/" \
    -b d1d95074f4779c8de1ed851f22f3bb6c71089359b443b46f747606b1fbc0c974

account {
  public_key: "045499d51a013e06c6cbb5734843cf3c7f08d66af312d81238ffeb54244f1800"
  main_purse {
    uref: "e698d314cd8004ca6cdfc5b5ea94b8c930aa3cd108bb32d6a5e9f53bcc201f75"
    access_rights: READ_ADD_WRITE
  }
  known_urefs {
    name: "URef(9251312d6c8a3d702a0b7e7754074dd920e5d2af1cf25e75fd2225ba845326ef, READ_ADD_WRITE)"
    key {
      uref {
        uref: "9251312d6c8a3d702a0b7e7754074dd920e5d2af1cf25e75fd2225ba845326ef"
        access_rights: READ_ADD_WRITE
      }
    }
  }
  known_urefs {
    name: "URef(c1a7e37cadf6c5d11cec42a3ffb8a6c9d4a6b9e1da56a88c50b33ffd130ad043, READ_ADD_WRITE)"
    key {
      uref {
        uref: "c1a7e37cadf6c5d11cec42a3ffb8a6c9d4a6b9e1da56a88c50b33ffd130ad043"
        access_rights: READ_ADD_WRITE
      }
    }
  }
  known_urefs {
    name: "mint"
    key {
      uref {
        uref: "c40e2456dae1fa259a134fe1baba639066125b53515c888fe3086cc46e9e40b2"
        access_rights: READ_ADD_WRITE
      }
    }
  }
  known_urefs {
    name: "pos"
    key {
      uref {
        uref: "5fcf27e682ed6856c575200740238f24247d178f3703539169631c11ba6fcc7c"
        access_rights: READ_ADD_WRITE
      }
    }
  }
  associated_keys {
    public_key: "045499d51a013e06c6cbb5734843cf3c7f08d66af312d81238ffeb54244f1800"
    weight: 1
  }
  action_thresholds {
    deployment_threshold: 1
    key_management_threshold: 1
  }
}
```

Based on the `main_purse` we can issue a followup request to check the balance:

```console
$ ./client.sh node-0 query-state \
    -t uref \
    -k e698d314cd8004ca6cdfc5b5ea94b8c930aa3cd108bb32d6a5e9f53bcc201f75 \
    -p "/" \
    -b d1d95074f4779c8de1ed851f22f3bb6c71089359b443b46f747606b1fbc0c974

unit {
}
```

Alas, that's not the balance. We'll have to figure out how to get there, apparently there's an indirection from the purse to a local address we can't easily see.

### Create an account

You can access the explorer at https://localhost:8443 to create accounts and ask the faucet for tokens.

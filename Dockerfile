FROM node:12.5.0-stretch-slim

WORKDIR /app
ENV NODE_ENV=production

COPY contracts/faucet_stored.wasm /app/contracts/faucet_stored.wasm
COPY package.json lerna.json /app/

# Application Packages
ADD packages /app/packages
ADD node_modules /app/node_modules

ENV STATIC_ROOT=/app/packages/ui/build
ENV PAYMENT_AMOUNT=10000000
ENV TRANSFER_AMOUNT=1000000000
ENV GAS_PRICE=10
# The link to graphql playground, used in Home page of UI.
ENV UI_GRAPHQL_URL=http://devnet-graphql.casperlabs.io:40403/graphql
ENV FAUCET_CONTRACT_PATH=/app/contracts/faucet_stored.wasm
ENTRYPOINT node ./packages/server/dist/server.js

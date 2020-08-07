FROM node:12.5.0-stretch-slim

WORKDIR /app
ENV NODE_ENV=production

RUN yarn global add lerna

COPY contracts/faucet_stored.wasm /app/contracts/faucet_stored.wasm
COPY package.json lerna.json yarn.lock /app/
COPY packages/sdk/package.json /app/packages/sdk/package.json
COPY packages/grpc/package.json /app/packages/grpc/package.json
COPY packages/server/package.json /app/packages/server/package.json
COPY packages/ui/package.json /app/packages/ui/package.json

RUN yarn install --production=true

# Application Packages
ADD packages/grpc/io /app/packages/grpc/io/
ADD packages/grpc/google /app/packages/grpc/google/
ADD packages/sdk/dist /app/packages/sdk/dist
ADD packages/server/dist /app/packages/server/build
ADD packages/ui/build /app/packages/ui/build/

RUN yarn run bootstrap

ENV STATIC_ROOT=/app/packages/ui/build
ENV PAYMENT_AMOUNT=10000000
ENV TRANSFER_AMOUNT=1000000000
ENV GAS_PRICE=10
# The link to graphql playground, used in Home page of UI.
ENV UI_GRAPHQL_URL=http://devnet-graphql.casperlabs.io:40403/graphql
ENV FAUCET_CONTRACT_PATH=/app/contracts/faucet_stored.wasm
ENTRYPOINT node ./packages/server/build/server.js

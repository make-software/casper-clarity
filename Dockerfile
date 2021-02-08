FROM node:12.5.0-stretch-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package.json lerna.json /app/

# Application Packages
ADD packages /app/packages
ADD node_modules /app/node_modules

ARG CHAIN_NAME=release-test-16
ENV CHAIN_NAME=$CHAIN_NAME

# The name display in the header of clarity
ARG NETWORK_NAME=TestNet
ENV NETWORK_NAME=$NETWORK_NAME

ARG FAUCET_ACCOUNT_PRIVATE_KEY_PATH=/app/packages/server/faucet-keys/private.key
ENV FAUCET_ACCOUNT_PRIVATE_KEY_PATH=$FAUCET_ACCOUNT_PRIVATE_KEY_PATH

ARG FAUCET_ACCOUNT_PUBLIC_KEY_PATH=/app/packages/server/faucet-keys/public.key
ENV FAUCET_ACCOUNT_PUBLIC_KEY_PATH=$FAUCET_ACCOUNT_PUBLIC_KEY_PATH

ARG SERVER_PORT=8001
ENV SERVER_PORT=$SERVER_PORT

ARG JSON_RPC_URL
ENV JSON_RPC_URL=$JSON_RPC_URL

ARG REACT_APP_EVENT_STORE_URL=http://host.docker.internal:3000
ENV REACT_APP_EVENT_STORE_URL=$REACT_APP_EVENT_STORE_URL

ARG UI_GRPC_URL=http://localhost:8000/rpc
ENV UI_GRPC_URL=$UI_GRPC_URL

ARG PAYMENT_AMOUNT=10000000
ENV PAYMENT_AMOUNT=$PAYMENT_AMOUNT

ARG TRANSFER_AMOUNT=100000000000
ENV TRANSFER_AMOUNT=$TRANSFER_AMOUNT

ARG GAS_PRICE=10
ENV GAS_PRICE=$GAS_PRICE

ENV STATIC_ROOT=/app/packages/ui/build \
    SERVER_USE_TLS="false" \
    NODE_TLS_REJECT_UNAUTHORIZED=0

ENTRYPOINT node ./packages/server/dist/server.js

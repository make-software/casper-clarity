FROM node:12.5.0-stretch-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package.json lerna.json /app/

# Application Packages
ADD packages /app/packages
ADD node_modules /app/node_modules

ENV STATIC_ROOT=/app/packages/ui/build \
    PAYMENT_AMOUNT=10000000 \
    TRANSFER_AMOUNT=100000000000 \
    GAS_PRICE=10 \
# The name display in the header of clarity.
    NETWORK_NAME=TestNet

ENTRYPOINT node ./packages/server/dist/server.js

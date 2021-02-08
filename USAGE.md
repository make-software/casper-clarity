To install dependencies run the following command from the root repository directory:
```
yarn bootstrap
```

To build a web app docker image run:
```
docker build -t make/clarity/web-app -f Dockerfile .
```

To build a node proxy docker image run:
```
docker build -t make/clarity/nginx -f Dockerfile.nginx .
```

To run Clarity web app against specific event store API, override it in the env variables:
```
docker run -p 8001:8001 -e REACT_APP_EVENT_STORE_URL=http://clarity-master-testnet-event-api-2137549806.us-east-1.elb.amazonaws.com:3000 make/clarity/web-app
```

To run Clarity on port 8081 execute:
```
docker run -p 8001:8001 -e UI_GRPC_URL=http://node-clarity-master-testnet.local:8081/rpc -e JSON_RPC_URL=http://node-clarity-master-testnet.local:8081/rpc -e REACT_APP_EVENT_STORE_URL=http://clarity-master-testnet.local:8081 make/clarity/web-app
docker run -p 8081:80 -e SERVER_NAME="casperlabs-node-proxy.local localhost" make/clarity/node-proxy
```

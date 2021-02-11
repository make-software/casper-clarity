Dependencies
------------
Clean earlier installed dependencies:
```
make clean
```

Install dependencies:
```
yarn bootstrap
```

Event store handler and API
---------------------------

To build an event handler docker image run:
```
cd packages/event_store
docker build -t make/clarity/event-store-handler -f Dockerfile.handler .
```

To build an API server docker image run:
```
cd packages/event_store
docker build -t make/clarity/event-store-api -f Dockerfile.api .
```

To override the database connection in the docker container set the ```DATABASE_URI``` env variable when running a container:
```
docker run -e NODE_ENV=production -e DATABASE_URI=mysql://root@host.docker.internal:3306/clarity make/clarity/event-store-handler
docker run -p 3000:3000 -e NODE_ENV=production -e DATABASE_URI=mysql://root@host.docker.internal:3306/clarity make/clarity/event-store-api
```

To run event handler and API docker containers with shared local SQLite database you need to map the same local directory with the database file to the containers:
```
docker run -v ${PWD}/packages/event_store/db:/app/db -e NODE_ENV=development make/clarity/event-store-handler
docker run -v ${PWD}/packages/event_store/db:/app/db -p 3000:3000 -e NODE_ENV=development make/clarity/event-store-api
```

Node proxy
----------
To build a node proxy docker image run:
```
docker build -t make/clarity/node-proxy -f Dockerfile.node-proxy .
```

Clarity UI
----------

To build a web app docker image run:
```
cd packages/server
npm run clean
npm run build

cd ../../packages/ui
npm run clean
npm run build

cd ../..

docker build -t make/clarity/web-app -f Dockerfile .
```

To run Clarity web app against specific event store API, override it in the env variables:
```
docker run -p 8001:8001 -e REACT_APP_EVENT_STORE_URL=https://event-store-api-clarity-master.local make/clarity/web-app
```

The whole infra in Docker containers locally
--------------------------------------------

To run Clarity on port 8001 execute:
```
docker run -v ${PWD}/packages/event_store/db:/app/db -e NODE_ENV=development make/clarity/event-store-handler
docker run -v ${PWD}/packages/event_store/db:/app/db -p 3000:3000 -e NODE_ENV=development make/clarity/event-store-api
docker run -p 8081:80 make/clarity/node-proxy
docker run -p 8001:8001 make/clarity/web-app
```

It is possible to override any env variable you can see as an argument in Dockerfiles similarly to the example with the ```REACT_APP_EVENT_STORE_URL``` variable.

The whole infra in Docker containers locally except the UI web app
------------------------------------------------------------------

Run the containers first:
```
docker run -v ${PWD}/packages/event_store/db:/app/db make/clarity/event-store-handler
docker run -v ${PWD}/packages/event_store/db:/app/db -p 3000:3000 make/clarity/event-store-api
docker run -p 8081:80 make/clarity/node-proxy
```

And the dev UI web app after:
```
cd packages/ui
npm run start
```
To install dependencies run the following command from the root repository directory:
```
yarn bootstrap
```

To start a local event handler, that pulls the events from the network run:
```
npm run start-event-handler
```

To start a local API server, that provides access to the data pulled from the network run:
```
npm run start-web-server
```

To override the database connection set the ```DATABASE_URI``` env variable:
```
DATABASE_URI=mysql://root@127.0.0.1:3306/clarity npm run start-event-handler
DATABASE_URI=mysql://root@127.0.0.1:3306/clarity npm run start-web-server
```

To build an event handler docker image run:
```
docker build -t make/casperlabs-event-store-handler -f Dockerfile.handler .
```

To build an API server docker image run:
```
docker build -t make/casperlabs-event-store-api -f Dockerfile.api .
```

To override the database connection in the docker container set the ```DATABASE_URI``` env variable when running a container:
```
docker run -e DATABASE_URI=mysql://root@host.docker.internal:3306/clarity make/casperlabs-event-store-handler
docker run -p 3000:3000 -e DATABASE_URI=mysql://root@host.docker.internal:3306/clarity make/casperlabs-event-store-api
```

To run event handler and API docker containers with shared local SQLite database execute the following:
```
docker run -v ${PWD}/db:/app/db make/casperlabs-event-store-handler
docker run -v ${PWD}/db:/app/db -p 3000:3000 make/casperlabs-event-store-api
```

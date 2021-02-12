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
Start event handler pointing to the master testing node and using the SQLite database:
```
cd packages/event_store
npm run start-event-handler
```

Start event store API using the SQLite database:
```
cd packages/event_store
npm run start-web-server
```

To override the database connection set the ```DATABASE_URI``` env variable:
```
cd packages/event_store
export NODE_ENV=production && export DATABASE_URI=mysql://root@127.0.0.1:3306/clarity && npm run start-event-handler
export NODE_ENV=production && export DATABASE_URI=mysql://root@127.0.0.1:3306/clarity && npm run start-web-server
```

Similarly you can override the ```NODE_ADDRESS``` environment variable.
```
cd packages/event_store
export NODE_ENV=production && export DATABASE_URI=mysql://root@127.0.0.1:3306/clarity && export NODE_ADDRESS=127.0.0.1 && npm run start-event-handler
export NODE_ENV=production && export DATABASE_URI=mysql://root@127.0.0.1:3306/clarity && export NODE_ADDRESS=127.0.0.1 && npm run start-web-server
```

Clarity UI
----------

Run the static resources and proxy server:
```
cd packages/server
npm run start
``` 

Run the UI web app:
```
cd packages/ui
npm run start
```

You can override any environment variable when starting a server similarly to the example with ```DATABASE_URI``` env variable above. For example to run local Clarity UI against the delta testnet run:
```
cd packages/server
export UI_GRPC_URL=https://node-clarity-delta.local/rpc
export JSON_RPC_URL=https://node-clarity-delta.local/rpc
export REACT_APP_EVENT_STORE_URL=https://event-store-api-clarity-delta.local
npm run start

cd packages/ui
npm run start
``` 

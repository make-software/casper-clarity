# CasperLabs Explorer Server

This is the server side component for the CasperLabs Explorer:

- serves the static files for the UI
- provide an API for the faucet

## Available scripts

NOTE: When the server is run in development mode it uses environment variables from `.env` and saves the nonce to `nonce.txt`. Whenever the docker network is torn down and brougth back up, the `nonce.txt` should be manually deleted and the server restarted to bring the faucet back to initial state as well.

### `npm run dev`

Rebuilds and restarts the server whenever there's a source code change.

### `npm run start:both`

Runs the server and the UI in development mode. The UI will proxy to the server on its own port, so you can reach API without CORS issues on port 8000, or directly at port 8001. The client can be started in a separate terminal as well.

### `npm run build`

Build artifacts into the `dist` directory

### `npm run test`

Run unit tests, for example to check the contract ABI serialization format.

## Environment variables

You can start the server in once console and the UI in another, the UI will proxy the requests to the backend, and also get the configuration from the `config.js` file served by the backend.

There are some environment variables that can come handy:

- `UI_GRPC_URL`: By default this is empty, or pointing at the local docker setup, but you can set it to any environment to test the UI locally agains the remote `grpcwebproxy` insteance.
- `AUTH_MOCK_ENABLED`: By setting it to `true` you can work offline and be automatically logged in with a test user to create accounts and use the faucet.

## Useful links:

- https://facebook.github.io/create-react-app/docs/deployment
- https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/
- https://auth0.com/docs/quickstart/spa/vanillajs/02-calling-an-api
- https://developer.okta.com/blog/2018/11/15/node-express-typescript
- https://blog.envoyproxy.io/envoy-and-grpc-web-a-fresh-new-alternative-to-rest-6504ce7eb880

## Sharing code between UI and server

I haven't yet figured out how to share the TypeScript code in a way that plays nicely with `dist` (i.e. doesn't create a subdirectory), and gets packaged into the `build` as well. I tried to put everything I wanted to share in `server/src/shared` contents and use a symlink to mirror it in `ui/src/shared`, but the compiler wouldn't have it. I ended up copying just what I needed until I figure out a better way.

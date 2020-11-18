// Declared so we can get it from the `window` object.

interface Window {
  origin: string;
  config: Config;
}

interface Config {
  auth0: Auth0Config;
  network: {
    name?: string;
    chainName?: string;
  };
  auth: {
    mock: {
      enabled: boolean;
    };
  };
  grpc: {
    url?: string;
  };
  eventStoreUrl: string;
}

interface Auth0Config {
  domain: string;
  clientId: string;
}

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
  withFaucet: boolean;
  withCsprLiveNotice: boolean;
  csprLiveName: string;
  csprLiveUrl: string;
  clarityUrl: string;
}

interface Auth0Config {
  domain: string;
  clientId: string;
}

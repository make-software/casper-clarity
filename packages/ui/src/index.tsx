import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import App from './components/App';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/custom.scss';
// Make `jQuery` available in the window in case any Javascript we import directly uses it.
import * as jQuery from 'jquery';

import FaucetContainer from './containers/FaucetContainer';
import AuthContainer from './containers/AuthContainer';
import ErrorContainer from './containers/ErrorContainer';
import FaucetService from './services/FaucetService';
import {
  CasperServiceByJsonRPC,
  DiagnosticsService,
  BalanceServiceByJsonRPC,
  EventService
} from 'casperlabs-sdk';
import { Auth0Service, MockAuthService } from './services/AuthService';
import DagContainer from './containers/DagContainer';
import BlockContainer from './containers/BlockContainer';
import DeployContainer from './containers/DeployContainer';
import SearchContainer from './containers/SearchContainer';
import { DeployInfoListContainer } from './containers/DeployInfoListContainer';
import AccountSelectorContainer from './containers/AccountSelectorContainer';
import ConnectedPeersContainer from './containers/ConnectedPeersContainer';
import { DeployContractsContainer } from './containers/DeployContractsContainer';
import ValidatorsContainer from './containers/ValidatorsContainer';
import { NetworkInfoContainer } from './containers/NetworkInfoContainer';

let w = window as any;
w.$ = w.jQuery = jQuery;

// Services that interact with the API.
const authService = window.config.auth.mock.enabled
  ? new MockAuthService()
  : new Auth0Service(window.config.auth0);
const faucetService = new FaucetService(authService);
const casperService = new CasperServiceByJsonRPC(
  window.config.grpc.url || window.origin
);
const eventService = new EventService(window.config.eventStoreUrl);
const balanceService = new BalanceServiceByJsonRPC(casperService);
new DiagnosticsService(window.config.grpc.url || window.origin);
// State containers.
const errors = new ErrorContainer();
const auth = new AuthContainer(
  errors,
  authService,
  casperService,
  balanceService
);
const faucet = new FaucetContainer(
  errors,
  faucetService,
  casperService,
  // Update the balances when a new faucet request went through.
  () => auth.refreshBalances(true)
);
const dag = new DagContainer(errors, casperService, eventService);
const block = new BlockContainer(errors, balanceService, eventService);
const deploy = new DeployContainer(errors, casperService, balanceService);
const deployInfoList = new DeployInfoListContainer(errors, casperService);
const search = new SearchContainer(errors, casperService);
const accountSelectorContainer = new AccountSelectorContainer();
const connectedPeersContainer = new ConnectedPeersContainer(
  errors,
  casperService
);
const deployContractsContainer = new DeployContractsContainer(
  errors,
  casperService,
  authService
);
const validatorsContainer = new ValidatorsContainer(errors, casperService);
const networkInfoContainer = new NetworkInfoContainer(errors, casperService);

ReactDOM.render(
  <HashRouter>
    <App
      errors={errors}
      auth={auth}
      faucet={faucet}
      dag={dag}
      validatorsContainer={validatorsContainer}
      block={block}
      deploy={deploy}
      deployInfoList={deployInfoList}
      accountSelectorContainer={accountSelectorContainer}
      connectedPeersContainer={connectedPeersContainer}
      search={search}
      deployContractsContainer={deployContractsContainer}
      networkInfoContainer={networkInfoContainer}
    />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

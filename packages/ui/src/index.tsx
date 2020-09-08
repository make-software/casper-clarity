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
  BalanceService,
  CasperService,
  DiagnosticsService
} from 'casperlabs-sdk';
import { Auth0Service, MockAuthService } from './services/AuthService';
import DagContainer from './containers/DagContainer';
import BlockContainer from './containers/BlockContainer';
import DeployContainer from './containers/DeployContainer';
import SearchContainer from './containers/SearchContainer';
import { DeployInfoListContainer } from './containers/DeployInfoListContainer';
import AccountSelectorContainer from './containers/AccountSelectorContainer';
import ConnectedPeersContainer from './containers/ConnectedPeersContainer';
import { VestingContainer } from './contracts/Vesting/container/VestingContainer';
import { DeployContractsContainer } from './containers/DeployContractsContainer';
import ValidatorsContainer from './containers/ValidatorsContainer';

let w = window as any;
w.$ = w.jQuery = jQuery;

// Services that interact with the API.
const authService = window.config.auth.mock.enabled
  ? new MockAuthService()
  : new Auth0Service(window.config.auth0);
const faucetService = new FaucetService(authService);
const casperService = new CasperService(
  window.config.grpc.url || window.origin
);
const balanceService = new BalanceService(casperService);
const diagnosticsService = new DiagnosticsService(
  window.config.grpc.url || window.origin
);

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
const vesting = new VestingContainer(errors, auth, casperService);
const dag = new DagContainer(errors, casperService);
const block = new BlockContainer(errors, casperService, balanceService);
const deploy = new DeployContainer(errors, casperService, balanceService);
const deployInfoList = new DeployInfoListContainer(errors, casperService);
const search = new SearchContainer(errors, casperService);
const accountSelectorContainer = new AccountSelectorContainer();
const connectedPeersContainer = new ConnectedPeersContainer(
  errors,
  diagnosticsService
);
const deployContractsContainer = new DeployContractsContainer(
  errors,
  casperService,
  authService
);
const validatorsContainer = new ValidatorsContainer(errors, casperService);

ReactDOM.render(
  <HashRouter>
    <App
      errors={errors}
      auth={auth}
      faucet={faucet}
      vesting={vesting}
      dag={dag}
      validatorsContainer={validatorsContainer}
      block={block}
      deploy={deploy}
      deployInfoList={deployInfoList}
      accountSelectorContainer={accountSelectorContainer}
      connectedPeersContainer={connectedPeersContainer}
      search={search}
      deployContractsContainer={deployContractsContainer}
    />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

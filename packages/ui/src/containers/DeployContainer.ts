import { observable, action } from 'mobx';

import ErrorContainer from './ErrorContainer';
import ObservableValueMap from '../lib/ObservableValueMap';
import {
  CasperServiceByJsonRPC,
  JsonDeploy,
  JsonExecutionResult,
  BalanceServiceByJsonRPC
} from 'casperlabs-sdk';

export class DeployContainer {
  @observable deployHashBase16: string | null = null;
  @observable deploy: JsonDeploy | null = null;
  @observable jsonExecutionResults: JsonExecutionResult[] | null = null;
  @observable balances: ObservableValueMap<
    string,
    number
  > = new ObservableValueMap();

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC,
    private balanceService: BalanceServiceByJsonRPC
  ) {}

  /** Call whenever the page switches to a new deploy. */
  @action
  init(deployHashBase16: string) {
    this.deployHashBase16 = deployHashBase16;
    this.deploy = null;
    this.balances.clear();
  }

  async loadDeploy() {
    if (this.deployHashBase16 == null) return;
    await this.errors.capture(
      this.casperService.getDeployInfo(this.deployHashBase16).then(deploy => {
        this.deploy = deploy.deploy;
        this.jsonExecutionResults = deploy.execution_results;
      })
    );
  }

  /** Load the balances of the account at each block where the deploy was executed. */
  async loadBalances() {
    if (this.deploy == null) {
      return;
    }
    for (let proc of this.jsonExecutionResults!) {
      const blockHash = proc.block_hash;
      const balance = await this.balanceService.getAccountBalance(
        blockHash,
        this.deploy.header.account
      );
      if (balance !== undefined) {
        this.balances.set(blockHash, balance);
      }
    }
  }
}

export default DeployContainer;

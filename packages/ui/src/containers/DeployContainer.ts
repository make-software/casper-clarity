import { observable, action } from 'mobx';

import ErrorContainer from './ErrorContainer';
import ObservableValueMap from '../lib/ObservableValueMap';
import {
  CasperServiceByJsonRPC,
  EventService,
  JsonExecutionResult,
  BalanceServiceByJsonRPC,
  DeployResult
} from 'casper-client-sdk';

export class DeployContainer {
  @observable deployHashBase16: string | null = null;
  @observable deploy: DeployResult | null | string = null;
  @observable jsonExecutionResults: JsonExecutionResult[] | null = null;
  @observable balances: ObservableValueMap<
    string,
    number
  > = new ObservableValueMap();

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC,
    private balanceService: BalanceServiceByJsonRPC,
    private eventService: EventService
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
    this.eventService
      .getDeployHash(this.deployHashBase16)
      .then((deploy: any) => {
        this.deploy = deploy;
      })
      .catch((err: any) => {
        const { response } = err;
        if (response.status === 404) {
          this.deploy = 'Deploy not found!';
          return;
        }
        return this.errors.capture(
          new Promise((resolve, reject) => {
            throw err;
          })
        );
      });
  }

  /** Load the balances of the account at each block where the deploy was executed. */
  // async loadBalances() {
  //   if (this.deploy == null) {
  //     return;
  //   }
  //   for (let proc of this.jsonExecutionResults!) {
  //     const blockHash = proc.block_hash;
  //     const balance = await this.balanceService.getAccountBalance(
  //       blockHash,
  //       this.deploy.header.account
  //     );
  //     if (balance !== undefined) {
  //       this.balances.set(blockHash, balance);
  //     }
  //   }
  // }
}

export default DeployContainer;

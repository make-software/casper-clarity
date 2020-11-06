import { action, observable } from 'mobx';

import ErrorContainer from './ErrorContainer';
import { BlockInfo } from 'casperlabs-grpc/io/casperlabs/casper/consensus/info_pb';
import ObservableValueMap from '../lib/ObservableValueMap';
import { ToggleStore } from '../components/ToggleButton';
import {
  CasperServiceByJsonRPC,
  GetDeployResult,
  JsonBlock,
  BalanceServiceByJsonRPC
} from 'casperlabs-sdk';

type AccountB16 = string;

export class BlockContainer {
  @observable blockHashBase16: string | null = null;
  @observable block: JsonBlock | null = null;
  @observable neighborhood: BlockInfo[] | null = null;
  // How much of the DAG to load around the block.
  @observable depth = 10;
  @observable hideBallotsToggleStore: ToggleStore = new ToggleStore(false);
  @observable deploys: GetDeployResult[] | null = null;
  @observable balances: ObservableValueMap<
    AccountB16,
    number
  > = new ObservableValueMap();

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC,
    private balanceService: BalanceServiceByJsonRPC
  ) {}

  /** Call whenever the page switches to a new block. */
  @action
  init(blockHashBase16: string) {
    this.blockHashBase16 = blockHashBase16;
    this.block = null;
    this.deploys = null;
    this.balances.clear();
  }

  async loadBlock() {
    if (this.blockHashBase16 == null) return;
    await this.errors.capture(
      this.casperService.getBlockInfo(this.blockHashBase16).then(res => {
        this.block = res.block;
      })
    );
  }

  async loadDeploys() {
    if (this.block == null || !this.block?.header.deploy_hashes) {
      this.deploys = null;
      return;
    }
    this.deploys = await Promise.all<GetDeployResult>(
      this.block.header.deploy_hashes.map(d =>
        this.casperService.getDeployInfo(d)
      )
    );
  }

  /** Load the balances of accounts that executed deploys in this block. */
  async loadBalances() {
    if (this.deploys == null || this.blockHashBase16 == null) {
      return;
    }
    for (let deploy of this.deploys) {
      const accountKey = deploy.deploy.header.account;
      const balance = await this.balanceService.getAccountBalance(
        this.blockHashBase16,
        accountKey
      );
      if (balance !== undefined) {
        this.balances.set(accountKey, balance);
      }
    }
  }
}

export default BlockContainer;

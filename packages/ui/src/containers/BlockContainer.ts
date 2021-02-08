import { action, observable } from 'mobx';

import ErrorContainer from './ErrorContainer';
import ObservableValueMap from '../lib/ObservableValueMap';
import { ToggleStore } from '../components/ToggleButton';
import {
  BalanceServiceByJsonRPC,
  EventService,
  BlockResult,
  DeployResult,
  PublicKey,
  decodeBase16,
  JsonBlock
} from 'casper-client-sdk';

type AccountB16 = string;

export class BlockContainer {
  @observable blockHashBase16: string | null = null;
  @observable block: BlockResult | null = null;
  @observable neighborhood: JsonBlock[] | null = null;
  // How much of the DAG to load around the block.
  @observable depth = 10;
  @observable hideBallotsToggleStore: ToggleStore = new ToggleStore(false);
  @observable deploys: DeployResult[] | null = null;
  @observable balances: ObservableValueMap<
    AccountB16,
    number
  > = new ObservableValueMap();

  constructor(
    private errors: ErrorContainer,
    private balanceService: BalanceServiceByJsonRPC,
    private eventService: EventService
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
      this.eventService.getBlockByHash(this.blockHashBase16).then(res => {
        this.block = res;
      })
    );
  }

  async loadDeploys() {
    this.deploys = [];
    if (!this.block || this.block.deploys.length <= 0) {
      this.deploys = [];
    } else {
      this.block.deploys.forEach(deploy => {
        this.eventService.getDeployByHash(deploy).then(res => {
          this.deploys?.push(res);
        });
      });
    }
  }

  /** Load the balances of accounts that executed deploys in this block. */
  async loadBalances() {
    if (this.deploys == null || this.blockHashBase16 == null) {
      return;
    }
    for (let deploy of this.deploys) {
      const accountKey = deploy.account;
      const balance = await this.balanceService.getAccountBalance(
        this.blockHashBase16,
        PublicKey.fromEd25519(decodeBase16(accountKey.slice(2)))
      );
      if (balance !== undefined) {
        this.balances.set(accountKey, balance.toNumber());
      }
    }
  }
}

export default BlockContainer;

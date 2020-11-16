import ErrorContainer from './ErrorContainer';
import { CasperServiceByJsonRPC } from 'casper-client-sdk';
import { observable } from 'mobx';

export class NetworkInfoContainer {
  @observable validatorSize: number = 0;
  @observable blockHeight: number = 0;
  @observable blockHash?: string;
  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC
  ) {}

  async refresh() {
    const lastBlock = await this.casperService.getLatestBlockInfo();
    this.blockHeight = lastBlock.block?.header.height || 0;
    this.blockHash = lastBlock.block?.hash;
  }
}

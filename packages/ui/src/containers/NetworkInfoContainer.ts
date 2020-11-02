import ErrorContainer from './ErrorContainer';
import { CasperServiceByJsonRPC } from 'casperlabs-sdk';
import { observable } from 'mobx';

export class NetworkInfoContainer {
  @observable validatorSize: number = 0;
  @observable mainRank: number = 0;
  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC
  ) {}

  async refresh() {
    const lastBlock = await this.casperService.getLatestBlockInfo();

    // fixme
    // this.validatorSize = latestFinalizedBlock
    //   .getSummary()!
    //   .getHeader()!
    //   .getState()!
    //   .getBondsList()!.length;
    this.mainRank = lastBlock.block?.header.height || 0;
  }
}

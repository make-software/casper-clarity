import ErrorContainer from './ErrorContainer';
import { CasperService } from 'casperlabs-sdk';
import { observable } from 'mobx';

export class NetworkInfoContainer {
  @observable validatorSize: number = 0;
  @observable mainRank: number = 0;
  constructor(
    private errors: ErrorContainer,
    private casperService: CasperService
  ) {}

  async networkInfo() {
    const latestFinalizedBlock = await this.casperService.getLastFinalizedBlockInfo();
    this.validatorSize = latestFinalizedBlock
      .getSummary()!
      .getHeader()!
      .getState()!
      .getBondsList()!.length;
    const lastBlock = await this.casperService.getLatestBlockInfo();
    this.mainRank = lastBlock.getSummary()!.getHeader()!.getMainRank();
  }
}

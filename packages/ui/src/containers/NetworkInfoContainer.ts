import ErrorContainer from './ErrorContainer';
import { CasperServiceByJsonRPC } from 'casper-client-sdk';
import { observable } from 'mobx';

export class NetworkInfoContainer {
  @observable validatorSize: number = 0;
  @observable blockHeight: number = 0;
  @observable blockHash?: string;
  @observable nodeBuildVersion?: string;
  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC
  ) {}

  async refresh() {
    const status = await this.casperService.getStatus();
    this.blockHeight = status.last_added_block_info.height;
    this.blockHash = status.last_added_block_info.hash;
    this.nodeBuildVersion = status.build_version;
  }
}

import { observable } from 'mobx';

import ErrorContainer from './ErrorContainer';
import { decodeBase16, GrpcError } from 'casperlabs-sdk';
import { CleanableFormData } from './FormData';
import { grpc } from '@improbable-eng/grpc-web';
import { FieldState } from 'formstate';
import {
  CasperServiceByJsonRPC,
  GetBlockResult,
  GetDeployResult
} from '../rpc/CasperServiceByJsonRPC';

export enum Target {
  Block,
  Deploy
}

class SearchFormData extends CleanableFormData {
  @observable target: Target = Target.Block;
  hashBase16: FieldState<string> = new FieldState('');

  protected check() {
    let hashBase16 = this.hashBase16.$;

    if (hashBase16 === '') return 'Hash cannot be empty.';

    if (this.target === Target.Deploy) {
      if (hashBase16.length < 64)
        return 'Deploy hash has to be 64 characters long.';

      try {
        decodeBase16(hashBase16);
      } catch (e) {
        return 'Could not decode as Base16 hash.';
      }
    }

    return null;
  }
}

export class SearchContainer {
  @observable searchForm: SearchFormData = new SearchFormData();
  @observable result: GetBlockResult | GetDeployResult | string | null = null;

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC
  ) {}

  reset() {
    this.result = null;
  }

  async search() {
    this.result = null;
    if (this.searchForm.clean()) {
      switch (this.searchForm.target) {
        case Target.Block:
          await this.searchBlock(this.searchForm.hashBase16.$);
          break;
        case Target.Deploy:
          await this.searchDeploy(this.searchForm.hashBase16.$);
          break;
        default:
          throw new Error(
            `Don't know how to search for ${this.searchForm.target}`
          );
      }
    }
  }

  async searchBlock(blockHashPrefixBase16: string) {
    await this.trySearch(
      `Block ${blockHashPrefixBase16}`,
      this.casperService.getBlockInfo(blockHashPrefixBase16)
    );
  }

  async searchDeploy(deployHashBase16: string) {
    await this.trySearch(
      `Deploy ${deployHashBase16}`,
      this.casperService.getDeployInfo(deployHashBase16)
    );
  }

  private async trySearch<T extends GetBlockResult | GetDeployResult>(
    what: string,
    fetch: Promise<T>
  ) {
    try {
      this.result = await fetch;
    } catch (err) {
      if (err instanceof GrpcError) {
        if (err.code === grpc.Code.NotFound) {
          this.result = `${what} could not be found.`;
          return;
        }
      }
      this.errors.lastError = err.toString();
    }
  }
}

export default SearchContainer;

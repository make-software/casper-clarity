import ErrorContainer from './ErrorContainer';
import {
  CasperServiceByJsonRPC,
  ValidatorsInfoResult
} from 'casper-client-sdk';
import { action, computed, observable } from 'mobx';

export class ValidatorsContainer {
  @observable data: ValidatorsInfoResult | null = null;

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC
  ) {}

  @action.bound
  async refresh() {
    this.data = await this.casperService.getValidatorsInfo();
  }

  @computed
  get validatorsInfo() {
    return this.data;
  }
}

export default ValidatorsContainer;

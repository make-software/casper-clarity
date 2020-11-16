import { computed } from 'mobx';

import ErrorContainer from './ErrorContainer';
import StorageCell from '../lib/StorageCell';
import FaucetService from '../services/FaucetService';
import { getPublicKeyHashBase64 } from './AuthContainer';
import { CasperServiceByJsonRPC, GetDeployResult } from 'casper-client-sdk';

export class FaucetContainer {
  private _faucetRequests = new StorageCell<FaucetRequest[]>(
    'faucet-requests',
    []
  );

  // Start polling for status when we add a new faucet request.
  private faucetStatusTimerId = 0;
  private faucetStatusInterval = 10 * 1000;

  constructor(
    private errors: ErrorContainer,
    private faucetService: FaucetService,
    private casperService: CasperServiceByJsonRPC,
    // Callback when the faucet status finished so we can update the balances.
    private onFaucetStatusChange: () => void
  ) {}

  /** Ask the faucet for tokens for a given account. */
  async requestTokens(account: UserAccount) {
    const request = async () => {
      const deployHashBase16 = await this.faucetService.requestTokens(
        getPublicKeyHashBase64(account)
      );
      this.monitorFaucetRequest(account, deployHashBase16);
    };
    await this.errors.capture(request());
  }

  /** List faucet requests we sent earlier. */
  @computed get faucetRequests() {
    return this._faucetRequests.get;
  }

  private monitorFaucetRequest(account: UserAccount, deployHashBase16: string) {
    const request = { timestamp: new Date(), account, deployHashBase16 };
    const requests = [request].concat(this._faucetRequests.get);
    this._faucetRequests.set(requests);
    this.startPollingFaucetStatus();
  }

  private startPollingFaucetStatus() {
    if (this.faucetStatusTimerId === 0) {
      this.faucetStatusTimerId = window.setInterval(
        () => this.refreshFaucetRequestStatus(),
        this.faucetStatusInterval
      );
    }
  }

  async refreshFaucetRequestStatus() {
    const requests = this._faucetRequests.get;
    let updated = false;
    let anyNeededUpdate = false;
    for (let req of requests) {
      const needsUpdate =
        typeof req.deployInfo === 'undefined' ||
        req.deployInfo!.execution_results.length === 0;

      if (needsUpdate) {
        anyNeededUpdate = true;
        const info = await this.errors.withCapture(
          this.tryGetDeployInfo(req.deployHashBase16)
        );
        if (info != null) {
          req.deployInfo = info;
          updated = true;
        }
      }
    }
    if (updated) {
      this._faucetRequests.set(requests);
      this.onFaucetStatusChange();
    }
    if (!anyNeededUpdate) {
      window.clearInterval(this.faucetStatusTimerId);
      this.faucetStatusTimerId = 0;
    }
  }

  private async tryGetDeployInfo(
    deployHashBase16: string
  ): Promise<GetDeployResult | null> {
    return await this.casperService.getDeployInfo(deployHashBase16);
  }
}

// Record of a request we submitted.
export interface FaucetRequest {
  timestamp: Date;
  account: UserAccount;
  deployHashBase16: string;
  // Assigned later when the data becomes available.
  deployInfo?: GetDeployResult;
}

export default FaucetContainer;

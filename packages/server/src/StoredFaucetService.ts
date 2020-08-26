import { StateQuery } from 'casperlabs-grpc/io/casperlabs/node/api/casper_pb';
import {
  CasperService,
  Contracts,
  DeployHash,
  DeployUtil,
  encodeBase16,
  Keys
} from 'casperlabs-sdk';
import { ByteArray, SignKeyPair } from 'tweetnacl-ts';
import { CallFaucet, StoredFaucet } from './lib/Contracts';
import DeployService from './services/DeployService';

// based on execution-engine/contracts/explorer/faucet-stored/src/main.rs
const CONTRACT_NAME = 'faucet';
const ENTRY_POINT_NAME = 'call_faucet';

export class StoredFaucetService {
  private deployHash: ByteArray | null = null;

  // indicate whether the deploy of the stored version Faucet has been finalized,
  // if finalized, we no longer need set dependencies when calling stored version contract
  private storedFaucetFinalized: boolean = false;

  constructor(
    private faucetContract: Contracts.BoundContract,
    private contractKeys: SignKeyPair,
    private paymentAmount: bigint,
    private transferAmount: bigint,
    private deployService: DeployService,
    private casperService: CasperService
  ) {
    this.periodCheckState();
  }

  async callStoredFaucet(accountPublicKeyHash: ByteArray): Promise<DeployHash> {
    if (!this.storedFaucetFinalized && !this.deployHash) {
      const state = await this.checkState();
      if (state) {
        this.storedFaucetFinalized = true;
      } else {
        const deploy = this.faucetContract.deploy(
          StoredFaucet.args(),
          this.paymentAmount
        );
        await this.deployService.deploy(deploy);
        this.deployHash = deploy.getDeployHash_asU8();
      }
    }

    const dependencies = [];
    if (this.deployHash) {
      dependencies.push(this.deployHash);
    }
    const deployByName = DeployUtil.makeDeploy(
      CallFaucet.args(accountPublicKeyHash, this.transferAmount),
      DeployUtil.ContractType.Name,
      CONTRACT_NAME,
      null,
      this.paymentAmount,
      Keys.Ed25519.publicKeyHash(this.contractKeys.publicKey),
      dependencies,
      ENTRY_POINT_NAME
    );
    const signedDeploy = DeployUtil.signDeploy(deployByName, this.contractKeys);
    await this.deployService.deploy(signedDeploy);
    return signedDeploy.getDeployHash_asU8();
  }

  /**
   * Check whether stored version faucet has been finalised every 10 seconds.
   */
  private async periodCheckState() {
    const timeInterval = setInterval(async () => {
      const state = await this.checkState();
      if (state) {
        this.storedFaucetFinalized = true;
        // we don't need to set dependency anymore
        this.deployHash = null;
        clearInterval(timeInterval);
      }
    }, 10 * 1000);
  }

  /**
   * Check whether the global state of LFB contains the key "faucet" under the faucet account.
   * If it contains, we know that we can call stored version faucet by name
   */
  private async checkState() {
    try {
      const LFB = await this.casperService.getLastFinalizedBlockInfo();
      const blockHash = LFB.getSummary()!.getBlockHash_asU8();
      const stateQuery = new StateQuery();
      stateQuery.setKeyBase16(encodeBase16(this.contractKeys.publicKey));
      stateQuery.setKeyVariant(StateQuery.KeyVariant.ADDRESS);
      stateQuery.setPathSegmentsList([CONTRACT_NAME]);

      const state = await this.casperService.getBlockState(
        blockHash,
        stateQuery
      );
      return state;
    } catch {
      return null;
    }
  }
}

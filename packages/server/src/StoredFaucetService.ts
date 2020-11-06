import {
  Contracts,
  DeployHash,
  encodeBase16,
  Keys,
  PublicKey,
  CasperServiceByJsonRPC,
  DeployUtil
} from 'casperlabs-sdk';
import { ByteArray, SignKeyPair } from 'tweetnacl-ts';
import { CallFaucet, StoredFaucet } from './lib/Contracts';

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
    private casperService: CasperServiceByJsonRPC,
    private chainName: string
  ) {
    this.periodCheckState().then();
  }

  async callStoredFaucet(accountPublicKeyHash: ByteArray): Promise<DeployHash> {
    if (!this.storedFaucetFinalized && !this.deployHash) {
      const state = await this.checkState();
      if (state) {
        this.storedFaucetFinalized = true;
      } else {
        const deploy = this.faucetContract.deploy(
          StoredFaucet.args(),
          this.paymentAmount,
          this.chainName
        );
        await this.casperService.deploy(deploy).catch(err => {
          console.error(err);
        });
        this.deployHash = deploy.hash;
      }
    }

    const dependencies = [];
    if (this.deployHash) {
      dependencies.push(this.deployHash);
    }

    const sessionArgs = CallFaucet.args(
      accountPublicKeyHash,
      this.transferAmount
    ).toBytes();
    const session = new DeployUtil.StoredContractByName(
      CONTRACT_NAME,
      ENTRY_POINT_NAME,
      sessionArgs
    );

    const payment = DeployUtil.standardPayment(this.paymentAmount);
    const deployByName = DeployUtil.makeDeploy(
      session,
      payment,
      PublicKey.fromEd25519(this.contractKeys.publicKey),
      this.chainName
    );
    const signedDeploy = DeployUtil.signDeploy(deployByName, this.contractKeys);
    await this.casperService.deploy(signedDeploy);
    return signedDeploy.hash;
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
      const LFB = await this.casperService.getLatestBlockInfo().then(it => {
        return it.block;
      });
      if (!LFB) {
        return false;
      }
      const globalStateHash = LFB.header!.state_root_hash!;

      const accountHash = Keys.Ed25519.publicKeyHash(
        this.contractKeys.publicKey
      );
      const state = await this.casperService.getBlockState(
        globalStateHash,
        'account-hash-' + encodeBase16(accountHash),
        [CONTRACT_NAME]
      );
      return state;
    } catch {
      return null;
    }
  }
}

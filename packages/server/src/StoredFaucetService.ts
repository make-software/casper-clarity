import {
  DeployHash,
  encodeBase16,
  Keys,
  PublicKey,
  CasperServiceByJsonRPC,
  DeployUtil
} from 'casperlabs-sdk';
import { ByteArray, SignKeyPair } from 'tweetnacl-ts';
import { CallFaucet } from './lib/Contracts';

// based on execution-engine/contracts/explorer/faucet-stored/src/main.rs
const CONTRACT_NAME = 'faucet';
const ENTRY_POINT_NAME = 'call_faucet';

export class StoredFaucetService {
  constructor(
    private contractKeys: SignKeyPair,
    private paymentAmount: bigint,
    private transferAmount: bigint,
    private casperService: CasperServiceByJsonRPC,
    private chainName: string
  ) {}

  async callStoredFaucet(accountPublicKeyHash: ByteArray): Promise<DeployHash> {
    const state = await this.checkState();
    if (state) {
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
      const signedDeploy = DeployUtil.signDeploy(
        deployByName,
        this.contractKeys
      );
      await this.casperService.deploy(signedDeploy);
      return signedDeploy.hash;
    } else {
      throw new Error("Can't do faucet now");
    }
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

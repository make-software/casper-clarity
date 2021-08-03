import {
  CasperServiceByJsonRPC,
  DeployUtil,
  encodeBase16
} from 'casper-client-sdk';
import { ByteArray } from 'tweetnacl-ts';
import { CallFaucet } from './lib/Contracts';
import { AsymmetricKey } from 'casper-client-sdk/dist/lib/Keys';
import * as fs from 'fs';
import * as path from 'path';

// based on execution-engine/contracts/explorer/faucet-stored/src/main.rs
const CONTRACT_NAME = 'faucet';
const ENTRY_POINT_NAME = 'call_faucet';

export const getBinary = (pathToBinary: string) => {
  return new Uint8Array(fs.readFileSync(pathToBinary, null).buffer);
};

export class StoredFaucetService {
  constructor(
    private contractKeys: AsymmetricKey,
    private paymentAmount: bigint,
    private transferAmount: bigint,
    private casperService: CasperServiceByJsonRPC,
    private chainName: string
  ) {}

  async callBytesFaucet(accountPublicKeyHash: ByteArray): Promise<Uint8Array> {
    const sessionArgs = CallFaucet.args(
      accountPublicKeyHash,
      this.transferAmount
    );

    const session = DeployUtil.ExecutableDeployItem.newModuleBytes(
      getBinary(path.resolve(__dirname, '../faucet.wasm')),
      sessionArgs
    );

    const payment = DeployUtil.standardPayment(this.paymentAmount.toString());
    const deployByName = DeployUtil.makeDeploy(
      new DeployUtil.DeployParams(this.contractKeys.publicKey, this.chainName),
      session,
      payment
    );
    const signedDeploy = DeployUtil.signDeploy(deployByName, this.contractKeys);
    await this.casperService.deploy(signedDeploy);
    return signedDeploy.hash;
  }

  async callStoredFaucet(accountPublicKeyHash: ByteArray): Promise<Uint8Array> {
    const state = await this.checkState();
    if (state) {
      const sessionArgs = CallFaucet.args(
        accountPublicKeyHash,
        this.transferAmount
      );
      const session = DeployUtil.ExecutableDeployItem.newStoredContractByName(
        CONTRACT_NAME,
        ENTRY_POINT_NAME,
        sessionArgs
      );

      const payment = DeployUtil.standardPayment(this.paymentAmount.toString());
      const deployByName = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
          this.contractKeys.publicKey,
          this.chainName
        ),
        session,
        payment
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

      const accountHash = this.contractKeys.accountHash();
      const key = 'account-hash-' + encodeBase16(accountHash);
      const state = await this.casperService.getBlockState(
        globalStateHash,
        key,
        [CONTRACT_NAME]
      );
      return state;
    } catch {
      return null;
    }
  }
}

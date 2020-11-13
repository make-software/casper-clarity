import { CasperServiceByJsonRPC, EventService } from '../services';
import { Keys, PublicKey } from './index';
import * as nctl from 'tweetnacl-ts';
import { SignLength } from 'tweetnacl-ts';

export class CasperClient {
  private nodeClient: CasperServiceByJsonRPC;
  private eventStoreClient: EventService;
  constructor(nodeUrl: string, eventStoreUrl: string) {
    this.nodeClient = new CasperServiceByJsonRPC(nodeUrl);
    this.eventStoreClient = new EventService(eventStoreUrl);
  }

  /**
   * Generate new Ed25519 key pair.
   */
  public newEdKeyPair() {
    return Keys.Ed25519.new();
  }

  /**
   * Load Ed25519 private key
   * @param path
   */
  public loadEdPrivateKeyFromFile(path: string) {
    return Keys.Ed25519.parsePrivateKeyFile(path);
  }

  public loadEdPublicKeyFromFile(path: string) {
    return Keys.Ed25519.parsePublicKeyFile(path);
  }

  public privateToPublicKey(privateKey: ByteArray) {
    if (privateKey.length === SignLength.SecretKey) {
      return nctl.sign_keyPair_fromSecretKey(privateKey).publicKey;
    } else {
      return nctl.sign_keyPair_fromSeed(privateKey).publicKey;
    }
  }

  public async balanceOf(publicKey: PublicKey) {
    const stateRootHash = await this.nodeClient
      .getLatestBlockInfo()
      .then(it => it.block?.header.state_root_hash);
    // Find the balance Uref and cache it if we don't have it.
    if (!stateRootHash) {
      return undefined;
    }
    const balanceUref = await this.nodeClient.getAccountBalanceUref(
      stateRootHash,
      publicKey.toAccountHash()
    );

    if (!balanceUref) {
      return undefined;
    }

    return await this.nodeClient.getAccountBalance(stateRootHash, balanceUref);
  }

  public async getAccountsDeploys(
    accountHash: string,
    page: number,
    limit: number
  ) {
    return await this.eventStoreClient.getAccountDeploys(
      accountHash,
      page,
      limit
    );
  }

  public async getDeployByHash(deployHash: string) {
    return await this.eventStoreClient.getDeployByHash(deployHash);
  }
}

import { CasperServiceByJsonRPC, EventService } from '../services';
import { Keys, PublicKey } from './index';
import * as nctl from 'tweetnacl-ts';
import { SignLength } from 'tweetnacl-ts';

type ByteArray = Uint8Array;

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

  /**
   * Load Ed25519 private key
   * @param path
   */
  public loadEdPublicKeyFromFile(path: string) {
    return Keys.Ed25519.parsePublicKeyFile(path);
  }

  /**
   * Compute Ed25519 public key from private Key.
   * @param privateKey
   */
  public privateToPublicKey(privateKey: ByteArray) {
    if (privateKey.length === SignLength.SecretKey) {
      return nctl.sign_keyPair_fromSecretKey(privateKey).publicKey;
    } else {
      return nctl.sign_keyPair_fromSeed(privateKey).publicKey;
    }
  }

  /**
   * Get the balance of public key
   */
  public async balanceOfByPublicKey(publicKey: PublicKey) {
    return this.balanceOfByAccountHash(publicKey.toAccountHash());
  }

  /**
   * Get the balance by account hash
   */
  public async balanceOfByAccountHash(accountHashStr: string) {
    const stateRootHash = await this.nodeClient
      .getLatestBlockInfo()
      .then(it => it.block?.header.state_root_hash);
    // Find the balance Uref and cache it if we don't have it.
    if (!stateRootHash) {
      return undefined;
    }
    const balanceUref = await this.nodeClient.getAccountBalanceUref(
      stateRootHash,
      accountHashStr
    );

    if (!balanceUref) {
      return undefined;
    }

    return await this.nodeClient.getAccountBalance(stateRootHash, balanceUref);
  }

  /**
   * Get deploys for specified account
   * @param accountHash
   * @param page
   * @param limit
   */
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

  /**
   * Get deploy by hash
   * @param deployHash
   */
  public async getDeployByHash(deployHash: string) {
    return await this.eventStoreClient.getDeployByHash(deployHash);
  }
}

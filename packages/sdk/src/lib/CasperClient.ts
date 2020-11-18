import { CasperServiceByJsonRPC, EventService } from '../services';
import { Keys, PublicKey } from './index';
import * as nctl from 'tweetnacl-ts';
import { SignLength } from 'tweetnacl-ts';
import { encodeBase16 } from './Conversions';

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
    return this.balanceOfByAccountHash(encodeBase16(publicKey.toAccountHash()));
  }

  /**
   * Get the balance by account hash
   */
  public async balanceOfByAccountHash(accountHashStr: string) {
    try {
      const stateRootHash = await this.nodeClient
        .getLatestBlockInfo()
        .then(it => it.block?.header.state_root_hash);
      // Find the balance Uref and cache it if we don't have it.
      if (!stateRootHash) {
        return 0;
      }
      const balanceUref = await this.nodeClient.getAccountBalanceUrefByPublicKeyHash(
        stateRootHash,
        accountHashStr
      );

      if (!balanceUref) {
        return 0;
      }

      return await this.nodeClient.getAccountBalance(
        stateRootHash,
        balanceUref
      );
    } catch (e) {
      return 0;
    }
  }

  /**
   * Get deploys for specified account
   * @param publicKey
   * @param page
   * @param limit
   */
  public async getAccountsDeploys(
    publicKey: PublicKey,
    page: number = 0,
    limit: number = 20
  ) {
    const data = await this.eventStoreClient.getAccountDeploys(
      publicKey.toAccountHex(),
      page,
      limit
    );
    return data.data;
  }

  /**
   * Get deploy by hash
   * @param deployHash
   */
  public async getDeployByHash(deployHash: string) {
    return await this.eventStoreClient.getDeployByHash(deployHash);
  }
}

import Client, { HTTPTransport, RequestManager } from 'rpc-client-js';
import { DeployUtil } from '..';
import { deployToJson } from '../lib/DeployUtil';

interface RpcResult {
  api_version: string;
}

export interface GetPeersResult extends RpcResult {
  peers: Record<string, string>;
}

export interface GetStatusResult extends GetPeersResult {
  last_finalized_block: JsonBlock | null;
}

export interface GetStateRootHashResult extends RpcResult {
  state_root_hash: string;
}

interface ExecutionResult {
  cost: number;
  error_message: string | null;
}

export interface JsonExecutionResult {
  block_hash: JsonBlockHash;
  result: ExecutionResult;
}

export interface GetDeployResult extends RpcResult {
  deploy: JsonDeploy;
  execution_results: JsonExecutionResult[];
}

export interface GetBlockResult extends RpcResult {
  block: JsonBlock | null;
}

type JsonBlockHash = string;
type JsonDeployHash = string;

export interface JsonSystemTransaction {
  Slash?: string;
  Reward?: Record<string, number>;
}

interface JsonDeployHeader {
  account: string;
  timestamp: number;
  ttl: number;
  gas_price: number;
  body_hash: string;
  dependencies: JsonDeployHash[];
  chain_name: string;
}

// todo(abner)
interface JsonExecutableDeployItem {}

interface JsonApproval {
  signer: string;
  signature: string;
}

export interface JsonDeploy {
  hash: JsonDeployHash;
  header: JsonDeployHeader;
  payment: JsonExecutableDeployItem;
  session: JsonExecutableDeployItem;
  approvals: JsonApproval[];
}

export interface JsonHeader {
  parent_hash: string;
  state_root_hash: string;
  body_hash: string;
  deploy_hashes: string[];
  random_bit: boolean;
  switch_block: boolean;
  timestamp: number;
  system_transactions: JsonSystemTransaction[];
  era_id: number;
  height: number;
  proposer: string;
}

export interface JsonBlock {
  hash: JsonBlockHash;
  header: JsonHeader;
  proofs: string[];
}

export class CasperServiceByJsonRPC {
  private client: Client;
  private eventClient: Client;

  constructor(url: string, eventUrl: string) {
    const transport = new HTTPTransport(url);
    const requestManager = new RequestManager([transport]);
    this.client = new Client(requestManager);

    const eventTransport = new HTTPTransport(eventUrl);
    const eventRequestManager = new RequestManager([eventTransport]);
    this.eventClient = new Client(eventRequestManager);
  }

  /**
   * Get information about a single deploy by hash.
   *
   * @param deployHashBase16
   */
  async getDeployInfo(deployHashBase16: string): Promise<GetDeployResult> {
    return await this.client.request({
      method: 'info_get_deploy',
      params: {
        deploy_hash: deployHashBase16
      }
    });
  }

  async getBlockInfo(blockHashBase16: JsonBlockHash): Promise<GetBlockResult> {
    return await this.client.request({
      method: 'chain_get_block',
      params: {
        block_hash: blockHashBase16
      }
    });
  }

  async getLatestBlockInfo(): Promise<GetBlockResult> {
    return await this.client.request({
      method: 'chain_get_block'
    });
  }

  async getPeers(): Promise<GetPeersResult> {
    return await this.client.request({
      method: 'info_get_peers'
    });
  }

  async getStatus(): Promise<GetStatusResult> {
    return await this.client.request({
      method: 'info_get_status'
    });
  }

  /**
   * Get the reference to the balance so we can cache it.
   */
  async getAccountBalanceUref(
    stateRootHash: string,
    accountPublicKeyHashBase16: string
  ) {
    const account = await this.getBlockState(
      stateRootHash,
      'account-hash-' + accountPublicKeyHashBase16,
      []
    ).then(res => res.stored_value.Account);
    return account.main_purse;
  }

  async getAccountBalance(
    stateRootHash: string,
    balanceUref: string
  ): Promise<number> {
    return await this.client
      .request({
        method: 'state_get_balance',
        params: {
          state_root_hash: stateRootHash,
          purse_uref: balanceUref
        }
      })
      .then(res => parseInt(res.balance_value, 10));
  }

  async getStateRootHash(blockHashBase16: JsonBlockHash): Promise<string> {
    return await this.client
      .request({
        method: 'chain_get_state_root_hash',
        params: {
          block_hash: blockHashBase16
        }
      })
      .then((res: GetStateRootHashResult) => res.state_root_hash);
  }

  /**
   * get global state item
   * @param stateRootHash
   * @param key
   * @param path
   */
  async getBlockState(stateRootHash: string, key: string, path: string[]) {
    return await this.client.request({
      method: 'state_get_item',
      params: {
        state_root_hash: stateRootHash,
        key,
        path
      }
    });
  }

  async deploy(signedDeploy: DeployUtil.Deploy) {
    console.log(JSON.stringify(deployToJson(signedDeploy)));
    return await this.client.request({
      method: 'account_put_deploy',
      params: deployToJson(signedDeploy)
    });
  }

  async getBlockInfos(page: number, limit: number) {
    return await this.eventClient.request({
      method: 'get',
      params: {
        page,
        limit
      }
    });
  }
}

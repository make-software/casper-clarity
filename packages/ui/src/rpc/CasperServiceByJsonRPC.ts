import Client, { HTTPTransport, RequestManager } from 'rpc-client-js';
import { Deploy } from './DeployUtil';

interface RpcResult {
  api_version: string;
}

export interface GetPeersResult extends RpcResult {
  peers: Record<string, string>;
}

export interface GetStatusResult extends GetPeersResult {
  last_finalized_block: JsonBlock | null;
}

export interface GetGlobalStateHashResult extends RpcResult {
  global_state_hash: string;
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
  global_state_hash: string;
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

  constructor(url: string) {
    const transport = new HTTPTransport(url);
    const requestManager = new RequestManager([transport]);
    this.client = new Client(requestManager);
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
    blockHashBase16: string,
    accountPublicKeyHashBase16: string
  ) {
    const globalStateHash = await this.getGlobalStateHash(blockHashBase16);
    const account = await this.getBlockState(
      globalStateHash,
      'account-hash-' + accountPublicKeyHashBase16,
      []
    ).then(res => res.stored_value.Account);
    return account.main_purse;
  }

  async getAccountBalance(
    blockHashBase16: JsonBlockHash,
    balanceUref: string
  ): Promise<number> {
    const globalStateHash = await this.getGlobalStateHash(blockHashBase16);
    return await this.client
      .request({
        method: 'state_get_balance',
        params: {
          global_state_hash: globalStateHash,
          purse_uref: balanceUref
        }
      })
      .then(res => Object.values(res.balance_value)[0] as number);
  }

  async getGlobalStateHash(blockHashBase16: JsonBlockHash): Promise<string> {
    return await this.client
      .request({
        method: 'chain_get_global_state_hash',
        params: {
          block_hash: blockHashBase16
        }
      })
      .then((res: GetGlobalStateHashResult) => res.global_state_hash);
  }

  /**
   * get global state
   * @param globalStateHashBase16
   * @param key
   * @param path
   */
  async getBlockState(
    globalStateHashBase16: string,
    key: string,
    path: string[]
  ) {
    return await this.client.request({
      method: 'state_get_item',
      params: {
        global_state_hash: globalStateHashBase16,
        key,
        path
      }
    });
  }

  async deploy(signedDeploy: Deploy) {
    return await this.client.request({
      method: 'put_deploy',
      params: signedDeploy
    });
  }
}

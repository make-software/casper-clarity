import axios from 'axios';

export interface BlockResult {
  block_hash: string;
  parent_hash: string;
  timestamp: string;
  era_id: number;
  proposer: string;
  state: string;
  height: number;
  deploys: string[];
}

export interface Page {
  number: number;
  url: string;
}

export interface blocksResult {
  data: BlockResult[] | null;
  page_count: number;
  item_count: number;
  pages: Page[];
}

export interface Deployhash {
  block_hash: string;
  deploy_hash: string;
  state: string;
  cost: number;
  error_message: string;
}

export interface AccountDeploy {
  deploy_hash: string;
  account: string;
  state: string;
  cost: number;
  error_message: string;
  block_hash: string;
}
export interface AccountDeploysResult {
  data: AccountDeploy[];
  page_count: number;
  item_count: number;
  pages: Page[];
}

export class EventServiceByJsonRPC {
  private url: string | undefined;

  constructor(url: string | undefined) {
    this.url = url;
  }

  async getBlocks(page: number, count: number): Promise<BlocksResult> {
    const response = await axios.get(
      this.url + `/blocks?page=${page}&limit=${count}`
    );
    return response.data;
  }

  async getDeployHash(deployHash: string): Promise<number> {
    const response = await axios.get(this.url + `/deploy/${deployHash}`);
    return response.data;
  }

  async getBlockHash(blockHash: string): Promise<BlockResult> {
    const response = await axios.get(this.url + `block/${blockHash}`);
    return response.data;
  }

  async getAccountDeploys(
    deployHash: string,
    page: number,
    limit: number
  ): Promise<AccountDeploysResult> {
    const response = await axios.get(
      this.url + `/accountDeploys/${deployHash}?page=${page}&limit=${limit}`
    );
    return response.data;
  }
}

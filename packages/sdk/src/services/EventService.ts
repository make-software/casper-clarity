import axios from 'axios';

export interface BlockResult {
  blockHash: string;
  parentHash: string;
  timestamp: string;
  eraId: number;
  proposer: string;
  state: string;
  height: number;
  deploys: string[];
}

export interface Page {
  number: number;
  url: string;
}

export interface BlocksResult {
  data: BlockResult[] | null;
  pageCount: number;
  itemCount: number;
  pages: Page[];
}

export interface DeployResult {
  deployHash: string;
  state: string;
  cost: number;
  errorMessage: string;
  account: string;
  blockHash: string;
}

export interface Deployhash {
  blockHash: string;
  deployHash: string;
  state: string;
  cost: number;
  errormessage: string;
}

export interface AccountDeploy {
  deployHash: string;
  account: string;
  state: string;
  cost: number;
  errorMessage: string;
  blockHash: string;
}

export interface AccountDeploysResult {
  data: AccountDeploy[];
  pageCount: number;
  itemCount: number;
  pages: Page[];
}

export interface TransferResult {
  deployHash: string;
  sourcePurse: string;
  targetPurse: string;
  amount: string;
  id: string;
}

export class EventService {
  private url?: string;

  constructor(url?: string) {
    this.url = url;
  }

  public async getBlocks(page: number, count: number): Promise<BlocksResult> {
    const response = await axios.get(
      this.url + `/blocks?page=${page}&limit=${count}`
    );
    return response.data;
  }

  public async getDeployByHash(deployHash: string): Promise<DeployResult> {
    const response = await axios.get(this.url + `/deploy/${deployHash}`);
    return response.data;
  }

  public async getBlockByHash(blockHash: string): Promise<BlockResult> {
    const response = await axios.get(this.url + `/block/${blockHash}`);
    return response.data;
  }

  public async getAccountDeploys(
    accountHex: string,
    page: number,
    limit: number
  ): Promise<AccountDeploysResult> {
    const response = await axios.get(
      this.url + `/accountDeploys/${accountHex}?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  public async getTransfersByPurse(
    purseUref: string
  ): Promise<TransferResult[]> {
    const response = await axios.get(this.url + `/transfers/${purseUref}`);
    return response.data;
  }
}

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
  data: BlockResult[];
  pageCount: number;
  itemCount: number;
  pages: Page[];
}

export interface Deployhash {
  blockHash: string;
  deployHash: string;
  state: string;
  cost: number;
  errormessage: string;
}

export class EventServiceByJsonRPC {
  private url: string;

  constructor(url: string) {
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
}

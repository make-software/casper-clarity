import { grpc } from '@improbable-eng/grpc-web';
import {
  Block,
  Deploy
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/consensus_pb';
import {
  BlockInfo,
  DeployInfo
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/info_pb';
import {
  Key,
  StoredValueInstance as StateValue
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import {
  BatchGetBlockStateRequest,
  BatchGetBlockStateResponse,
  DeployRequest,
  GetBlockInfoRequest,
  GetBlockStateRequest,
  GetDeployInfoRequest,
  GetLastFinalizedBlockInfoRequest,
  ListDeployInfosRequest,
  ListDeployInfosResponse,
  StateQuery,
  StreamBlockDeploysRequest,
  StreamBlockInfosRequest
} from 'casperlabs-grpc/io/casperlabs/node/api/casper_pb';
import { CasperService as GrpcCasperService } from 'casperlabs-grpc/io/casperlabs/node/api/casper_pb_service';
import { Observable } from 'rxjs';
import { Event } from 'casperlabs-grpc/io/casperlabs/casper/consensus/info_pb';
import { StreamEventsRequest } from 'casperlabs-grpc/io/casperlabs/node/api/casper_pb';
import { BlockHash, ByteArray } from '../index';
import { encodeBase16 } from '../lib/Conversions';
import { GrpcError } from './Errors';

/**
 * Topics of event stream that client could subscribe to
 */
export interface SubscribeTopics {
  blockAdded?: boolean; // emit when a new block added
  blockFinalized?: boolean; // emit when a new block finalized
}

/**
 * Client implementation for [casper.proto](https://github.com/CasperLabs/CasperLabs/blob/dev/protobuf/io/casperlabs/node/api/casper.proto) gRPC API service.
 */
export default class CasperService {
  /**
   *
   * @param url Point at either at a URL on a different port where grpcwebproxy is listening, or use nginx to serve the UI files, the API and gRPC all on the same port without CORS.
   * @param transport transport of [grpc-web](https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/transport.md#node-http-only-available-in-a-nodejs-environment), the default value is browser transport
   */
  constructor(
    private url: string,
    private transport: grpc.TransportFactory = options =>
      grpc.CrossBrowserHttpTransport({ withCredentials: false })(options)
  ) {}

  /**
   * Add a deploy to the deploy pool on the node,
   * to be processed during subsequent block proposals.
   *
   * @param deploy
   */
  public deploy(deploy: Deploy) {
    return new Promise<void>((resolve, reject) => {
      const deployRequest = new DeployRequest();
      deployRequest.setDeploy(deploy);

      grpc.unary(GrpcCasperService.Deploy, {
        host: this.url,
        transport: this.transport,
        request: deployRequest,

        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve();
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }

  /**
   * Get information about a single deploy by hash.
   *
   * @param deployHash
   */
  getDeployInfo(deployHash: ByteArray): Promise<DeployInfo> {
    return new Promise<DeployInfo>((resolve, reject) => {
      const request = new GetDeployInfoRequest();
      request.setDeployHashBase16(encodeBase16(deployHash));

      grpc.unary(GrpcCasperService.GetDeployInfo, {
        host: this.url,
        transport: this.transport,
        request,
        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve(res.message as DeployInfo);
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }

  /**
   * Get deploys list of a given account
   *
   * @param accountPublicKeyHash
   * @param pageSize size of each page
   * @param view
   *  - BlockInfo.ViewMap.BASIC: Only includes information which is based on the header.
   *  - BlockInfo.ViewMap.FULL: Includes extra information such as children which require extra lookups.
   * @param pageToken pagination token
   */
  getDeployInfos(
    accountPublicKeyHash: ByteArray,
    pageSize: number,
    view?: BlockInfo.ViewMap[keyof BlockInfo.ViewMap],
    pageToken: string = ''
  ): Promise<ListDeployInfosResponse> {
    return new Promise<ListDeployInfosResponse>((resolve, reject) => {
      const request = new ListDeployInfosRequest();
      request.setAccountPublicKeyHashBase16(encodeBase16(accountPublicKeyHash));
      request.setPageSize(pageSize);
      request.setPageToken(pageToken);
      request.setView(view === undefined ? BlockInfo.View.BASIC : view);

      grpc.unary(GrpcCasperService.ListDeployInfos, {
        host: this.url,
        transport: this.transport,
        request,
        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve(res.message as ListDeployInfosResponse);
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }

  /**
   * Get the block summary with extra information about finality.
   * @param blockHash
   * @param view
   *  - BlockInfo.ViewMap.BASIC: Only includes information which is based on the header.
   *  - BlockInfo.ViewMap.FULL: Includes extra information such as children which require extra lookups.
   */
  getBlockInfo(
    blockHash: ByteArray | string,
    view?: BlockInfo.ViewMap[keyof BlockInfo.ViewMap]
  ): Promise<BlockInfo> {
    return new Promise<BlockInfo>((resolve, reject) => {
      // The API supports prefixes, which may not have even number of characters.
      const hashBase16 =
        typeof blockHash === 'string' ? blockHash : encodeBase16(blockHash);
      const request = new GetBlockInfoRequest();
      request.setBlockHashBase16(hashBase16);
      request.setView(view === undefined ? BlockInfo.View.FULL : view);

      grpc.unary(GrpcCasperService.GetBlockInfo, {
        host: this.url,
        transport: this.transport,
        request,
        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve(res.message as BlockInfo);
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }

  /**
   * Get slices of the DAG, going backwards, rank by rank.
   * @param depth
   * @param maxRank
   */
  getBlockInfos(depth: number, maxRank?: number): Promise<BlockInfo[]> {
    return new Promise<BlockInfo[]>((resolve, reject) => {
      const request = new StreamBlockInfosRequest();
      request.setDepth(depth);
      request.setMaxRank(maxRank || 0);

      const blocks: BlockInfo[] = [];

      grpc.invoke(GrpcCasperService.StreamBlockInfos, {
        host: this.url,
        transport: this.transport,
        request,
        onMessage: msg => {
          blocks.push(msg as BlockInfo);
        },
        onEnd: (code, message) => {
          if (code === grpc.Code.OK) {
            resolve(blocks);
          } else {
            reject(new GrpcError(code, message));
          }
        }
      });
    });
  }

  /**
   * Get the processed deploys within a block.
   * @param blockHash
   */
  getBlockDeploys(blockHash: ByteArray): Promise<Block.ProcessedDeploy[]> {
    return new Promise<Block.ProcessedDeploy[]>((resolve, reject) => {
      const request = new StreamBlockDeploysRequest();
      request.setBlockHashBase16(encodeBase16(blockHash));

      const deploys: Block.ProcessedDeploy[] = [];

      grpc.invoke(GrpcCasperService.StreamBlockDeploys, {
        host: this.url,
        transport: this.transport,
        request,
        onMessage: msg => {
          deploys.push(msg as Block.ProcessedDeploy);
        },
        onEnd: (code, message) => {
          if (code === grpc.Code.OK) {
            resolve(deploys);
          } else {
            reject(new GrpcError(code, message));
          }
        }
      });
    });
  }

  /**
   * Get one of the blocks from the last rank.
   */
  getLatestBlockInfo(): Promise<BlockInfo> {
    return new Promise<BlockInfo>((resolve, reject) => {
      const request = new StreamBlockInfosRequest();
      request.setDepth(1);

      // For now just return any block, but ideally we should be looking at the fork choice tip.
      let resolved = false;

      grpc.invoke(GrpcCasperService.StreamBlockInfos, {
        host: this.url,
        transport: this.transport,
        request,
        onMessage: msg => {
          if (!resolved) {
            resolved = true;
            resolve(msg as BlockInfo);
          }
        },
        onEnd: (code, message) => {
          if (code !== grpc.Code.OK && !resolved) {
            reject(new GrpcError(code, message));
          }
        }
      });
    });
  }

  /**
   * Query the value of global state as it was after the execution of a block.
   * @param blockHash
   * @param query
   */
  getBlockState(blockHash: BlockHash, query: StateQuery): Promise<StateValue> {
    return new Promise<StateValue>((resolve, reject) => {
      const request = new GetBlockStateRequest();
      request.setBlockHashBase16(encodeBase16(blockHash));
      request.setQuery(query);

      grpc.unary(GrpcCasperService.GetBlockState, {
        host: this.url,
        transport: this.transport,
        request,
        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve(res.message as StateValue);
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }

  /**
   * Execute multiple state queries at once.
   *
   * @param blockHash
   * @param querys
   */
  batchGetBlockState(
    blockHash: BlockHash,
    querys: StateQuery[]
  ): Promise<StateValue[]> {
    return new Promise<StateValue[]>((resolve, reject) => {
      const request = new BatchGetBlockStateRequest();
      request.setBlockHashBase16(encodeBase16(blockHash));
      request.setQueriesList(querys);

      grpc.unary(GrpcCasperService.BatchGetBlockState, {
        host: this.url,
        transport: this.transport,
        request,
        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve(
              (res.message as BatchGetBlockStateResponse).getValuesList()
            );
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }

  /**
   * Get the reference to the balance so we can cache it.
   * Returns `undefined` if the account doesn't exist yet.
   */
  async getAccountBalanceUref(
    blockHash: BlockHash,
    accountPublicKeyHash: ByteArray
  ): Promise<Key.URef | undefined> {
    try {
      const accountQuery = QueryAccount(accountPublicKeyHash);

      const account = await this.getBlockState(blockHash, accountQuery).then(
        res => res.getAccount()!
      );

      const mainPurseUref = account.getMainPurse()!;

      const mainPurseQuery = QueryHash(mainPurseUref.getUref_asU8()!);

      const balanceUref = await this.getBlockState(
        blockHash,
        mainPurseQuery
      ).then(
        res =>
          res
            .getClValue()!
            .getValue()!
            .getKey()!
            .getUref()!
      );

      return balanceUref;
    } catch (err) {
      if (err instanceof GrpcError) {
        if (
          err.code === grpc.Code.InvalidArgument &&
          err.message.indexOf('Key') > -1
        ) {
          // The account doesn't exist yet.
          return undefined;
        }
      }
      throw err;
    }
  }

  /**
   * Query balance for the specified balanceUref
   * @param blockHash
   * @param balanceUref
   */
  async getAccountBalance(
    blockHash: BlockHash,
    balanceUref: Key.URef
  ): Promise<number> {
    const balanceQuery = QueryUref(balanceUref);
    const balance = await this.getBlockState(blockHash, balanceQuery).then(
      res =>
        res
          .getClValue()!
          .getValue()!
          .getU512()!
    );
    return Number(balance.getValue());
  }

  /**
   * Get block information for the last finalized block
   */
  getLastFinalizedBlockInfo(): Promise<BlockInfo> {
    return new Promise<BlockInfo>((resolve, reject) => {
      const request = new GetLastFinalizedBlockInfoRequest();

      grpc.unary(GrpcCasperService.GetLastFinalizedBlockInfo, {
        host: this.url,
        transport: this.transport,
        request,
        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve(res.message as BlockInfo);
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }

  /**
   * Subscribe to event stream of blockchain
   * @param subscribeTopics see {@link SubscribeTopics}
   */
  subscribeEvents(subscribeTopics: SubscribeTopics): Observable<Event> {
    return new Observable(obs => {
      const client = grpc.client(GrpcCasperService.StreamEvents, {
        host: this.url,
        transport: this.transport
      });
      client.onMessage((msg: Event) => {
        obs.next(msg);
      });
      client.onEnd(() => obs.complete());
      const req = new StreamEventsRequest();
      req.setBlockAdded(!!subscribeTopics.blockAdded);
      req.setBlockFinalized(!!subscribeTopics.blockFinalized);

      client.start();
      client.send(req);

      return function unsubscribe() {
        client.close();
      };
    });
  }
}

const QueryHash = (hash: ByteArray) => {
  const query = new StateQuery();
  query.setKeyVariant(StateQuery.KeyVariant.HASH);
  query.setKeyBase16(encodeBase16(hash));
  return query;
};

const QueryAccount = (accountPublicKeyHash: ByteArray) => {
  const query = new StateQuery();
  query.setKeyVariant(StateQuery.KeyVariant.ADDRESS);
  query.setKeyBase16(encodeBase16(accountPublicKeyHash));
  return query;
};

const QueryUref = (uref: Key.URef) => {
  const query = new StateQuery();
  query.setKeyVariant(StateQuery.KeyVariant.UREF);
  query.setKeyBase16(encodeBase16(uref.getUref_asU8()));
  return query;
};

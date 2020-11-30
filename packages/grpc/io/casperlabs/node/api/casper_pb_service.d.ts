// package: io.casperlabs.node.api.casper
// file: io/casperlabs/node/api/casper.proto

import * as io_casperlabs_node_api_casper_pb from '../../../../io/casperlabs/node/api/casper_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as io_casperlabs_casper_consensus_consensus_pb from '../../../../io/casperlabs/casper/consensus/consensus_pb';
import * as io_casperlabs_casper_consensus_info_pb from '../../../../io/casperlabs/casper/consensus/info_pb';
import * as io_casperlabs_casper_consensus_state_pb from '../../../../io/casperlabs/casper/consensus/state_pb';
import { grpc } from '@improbable-eng/grpc-web';

type CasperServiceDeploy = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.DeployRequest;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type CasperServiceGetBlockInfo = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.GetBlockInfoRequest;
  readonly responseType: typeof io_casperlabs_casper_consensus_info_pb.BlockInfo;
};

type CasperServiceStreamBlockInfos = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.StreamBlockInfosRequest;
  readonly responseType: typeof io_casperlabs_casper_consensus_info_pb.BlockInfo;
};

type CasperServiceGetDeployInfo = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.GetDeployInfoRequest;
  readonly responseType: typeof io_casperlabs_casper_consensus_info_pb.DeployInfo;
};

type CasperServiceStreamBlockDeploys = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.StreamBlockDeploysRequest;
  readonly responseType: typeof io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy;
};

type CasperServiceStreamEvents = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.StreamEventsRequest;
  readonly responseType: typeof io_casperlabs_casper_consensus_info_pb.Event;
};

type CasperServiceGetBlockState = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.GetBlockStateRequest;
  readonly responseType: typeof io_casperlabs_casper_consensus_state_pb.StoredValueInstance;
};

type CasperServiceBatchGetBlockState = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.BatchGetBlockStateRequest;
  readonly responseType: typeof io_casperlabs_node_api_casper_pb.BatchGetBlockStateResponse;
};

type CasperServiceListDeployInfos = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.ListDeployInfosRequest;
  readonly responseType: typeof io_casperlabs_node_api_casper_pb.ListDeployInfosResponse;
};

type CasperServiceGetLastFinalizedBlockInfo = {
  readonly methodName: string;
  readonly service: typeof CasperService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof io_casperlabs_node_api_casper_pb.GetLastFinalizedBlockInfoRequest;
  readonly responseType: typeof io_casperlabs_casper_consensus_info_pb.BlockInfo;
};

export class CasperService {
  static readonly serviceName: string;
  static readonly Deploy: CasperServiceDeploy;
  static readonly GetBlockInfo: CasperServiceGetBlockInfo;
  static readonly StreamBlockInfos: CasperServiceStreamBlockInfos;
  static readonly GetDeployInfo: CasperServiceGetDeployInfo;
  static readonly StreamBlockDeploys: CasperServiceStreamBlockDeploys;
  static readonly StreamEvents: CasperServiceStreamEvents;
  static readonly GetBlockState: CasperServiceGetBlockState;
  static readonly BatchGetBlockState: CasperServiceBatchGetBlockState;
  static readonly ListDeployInfos: CasperServiceListDeployInfos;
  static readonly GetLastFinalizedBlockInfo: CasperServiceGetLastFinalizedBlockInfo;
}

export type ServiceError = {
  message: string;
  code: number;
  metadata: grpc.Metadata;
};
export type Status = { details: string; code: number; metadata: grpc.Metadata };

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(
    type: 'data',
    handler: (message: ResT) => void
  ): BidirectionalStream<ReqT, ResT>;
  on(
    type: 'end',
    handler: (status?: Status) => void
  ): BidirectionalStream<ReqT, ResT>;
  on(
    type: 'status',
    handler: (status: Status) => void
  ): BidirectionalStream<ReqT, ResT>;
}

export class CasperServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  deploy(
    requestMessage: io_casperlabs_node_api_casper_pb.DeployRequest,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: google_protobuf_empty_pb.Empty | null
    ) => void
  ): UnaryResponse;
  deploy(
    requestMessage: io_casperlabs_node_api_casper_pb.DeployRequest,
    callback: (
      error: ServiceError | null,
      responseMessage: google_protobuf_empty_pb.Empty | null
    ) => void
  ): UnaryResponse;
  getBlockInfo(
    requestMessage: io_casperlabs_node_api_casper_pb.GetBlockInfoRequest,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_info_pb.BlockInfo | null
    ) => void
  ): UnaryResponse;
  getBlockInfo(
    requestMessage: io_casperlabs_node_api_casper_pb.GetBlockInfoRequest,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_info_pb.BlockInfo | null
    ) => void
  ): UnaryResponse;
  streamBlockInfos(
    requestMessage: io_casperlabs_node_api_casper_pb.StreamBlockInfosRequest,
    metadata?: grpc.Metadata
  ): ResponseStream<io_casperlabs_casper_consensus_info_pb.BlockInfo>;
  getDeployInfo(
    requestMessage: io_casperlabs_node_api_casper_pb.GetDeployInfoRequest,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_info_pb.DeployInfo | null
    ) => void
  ): UnaryResponse;
  getDeployInfo(
    requestMessage: io_casperlabs_node_api_casper_pb.GetDeployInfoRequest,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_info_pb.DeployInfo | null
    ) => void
  ): UnaryResponse;
  streamBlockDeploys(
    requestMessage: io_casperlabs_node_api_casper_pb.StreamBlockDeploysRequest,
    metadata?: grpc.Metadata
  ): ResponseStream<
    io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy
  >;
  streamEvents(
    requestMessage: io_casperlabs_node_api_casper_pb.StreamEventsRequest,
    metadata?: grpc.Metadata
  ): ResponseStream<io_casperlabs_casper_consensus_info_pb.Event>;
  getBlockState(
    requestMessage: io_casperlabs_node_api_casper_pb.GetBlockStateRequest,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_state_pb.StoredValueInstance | null
    ) => void
  ): UnaryResponse;
  getBlockState(
    requestMessage: io_casperlabs_node_api_casper_pb.GetBlockStateRequest,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_state_pb.StoredValueInstance | null
    ) => void
  ): UnaryResponse;
  batchGetBlockState(
    requestMessage: io_casperlabs_node_api_casper_pb.BatchGetBlockStateRequest,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_node_api_casper_pb.BatchGetBlockStateResponse | null
    ) => void
  ): UnaryResponse;
  batchGetBlockState(
    requestMessage: io_casperlabs_node_api_casper_pb.BatchGetBlockStateRequest,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_node_api_casper_pb.BatchGetBlockStateResponse | null
    ) => void
  ): UnaryResponse;
  listDeployInfos(
    requestMessage: io_casperlabs_node_api_casper_pb.ListDeployInfosRequest,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_node_api_casper_pb.ListDeployInfosResponse | null
    ) => void
  ): UnaryResponse;
  listDeployInfos(
    requestMessage: io_casperlabs_node_api_casper_pb.ListDeployInfosRequest,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_node_api_casper_pb.ListDeployInfosResponse | null
    ) => void
  ): UnaryResponse;
  getLastFinalizedBlockInfo(
    requestMessage: io_casperlabs_node_api_casper_pb.GetLastFinalizedBlockInfoRequest,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_info_pb.BlockInfo | null
    ) => void
  ): UnaryResponse;
  getLastFinalizedBlockInfo(
    requestMessage: io_casperlabs_node_api_casper_pb.GetLastFinalizedBlockInfoRequest,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_casper_consensus_info_pb.BlockInfo | null
    ) => void
  ): UnaryResponse;
}

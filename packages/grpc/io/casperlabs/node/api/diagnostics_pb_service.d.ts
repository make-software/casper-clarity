// package: io.casperlabs.node.api.diagnostics
// file: io/casperlabs/node/api/diagnostics.proto

import * as io_casperlabs_node_api_diagnostics_pb from '../../../../io/casperlabs/node/api/diagnostics_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import { grpc } from '@improbable-eng/grpc-web';

type DiagnosticsListPeers = {
  readonly methodName: string;
  readonly service: typeof Diagnostics;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof io_casperlabs_node_api_diagnostics_pb.Peers;
};

export class Diagnostics {
  static readonly serviceName: string;
  static readonly ListPeers: DiagnosticsListPeers;
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

export class DiagnosticsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  listPeers(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_node_api_diagnostics_pb.Peers | null
    ) => void
  ): UnaryResponse;
  listPeers(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (
      error: ServiceError | null,
      responseMessage: io_casperlabs_node_api_diagnostics_pb.Peers | null
    ) => void
  ): UnaryResponse;
}

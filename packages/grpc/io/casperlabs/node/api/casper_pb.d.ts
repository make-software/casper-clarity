// package: io.casperlabs.node.api.casper
// file: io/casperlabs/node/api/casper.proto

import * as jspb from 'google-protobuf';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as io_casperlabs_casper_consensus_consensus_pb from '../../../../io/casperlabs/casper/consensus/consensus_pb';
import * as io_casperlabs_casper_consensus_info_pb from '../../../../io/casperlabs/casper/consensus/info_pb';
import * as io_casperlabs_casper_consensus_state_pb from '../../../../io/casperlabs/casper/consensus/state_pb';

export class DeployRequest extends jspb.Message {
  hasDeploy(): boolean;
  clearDeploy(): void;
  getDeploy(): io_casperlabs_casper_consensus_consensus_pb.Deploy | undefined;
  setDeploy(value?: io_casperlabs_casper_consensus_consensus_pb.Deploy): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DeployRequest
  ): DeployRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DeployRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): DeployRequest;
  static deserializeBinaryFromReader(
    message: DeployRequest,
    reader: jspb.BinaryReader
  ): DeployRequest;
}

export namespace DeployRequest {
  export type AsObject = {
    deploy?: io_casperlabs_casper_consensus_consensus_pb.Deploy.AsObject;
  };
}

export class GetBlockInfoRequest extends jspb.Message {
  getBlockHashBase16(): string;
  setBlockHashBase16(value: string): void;

  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  getView(): io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap];
  setView(
    value: io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap]
  ): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlockInfoRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetBlockInfoRequest
  ): GetBlockInfoRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetBlockInfoRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetBlockInfoRequest;
  static deserializeBinaryFromReader(
    message: GetBlockInfoRequest,
    reader: jspb.BinaryReader
  ): GetBlockInfoRequest;
}

export namespace GetBlockInfoRequest {
  export type AsObject = {
    blockHashBase16: string;
    blockHash: Uint8Array | string;
    view: io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap];
  };
}

export class StreamBlockInfosRequest extends jspb.Message {
  getDepth(): number;
  setDepth(value: number): void;

  getMaxRank(): number;
  setMaxRank(value: number): void;

  getView(): io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap];
  setView(
    value: io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap]
  ): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamBlockInfosRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StreamBlockInfosRequest
  ): StreamBlockInfosRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StreamBlockInfosRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StreamBlockInfosRequest;
  static deserializeBinaryFromReader(
    message: StreamBlockInfosRequest,
    reader: jspb.BinaryReader
  ): StreamBlockInfosRequest;
}

export namespace StreamBlockInfosRequest {
  export type AsObject = {
    depth: number;
    maxRank: number;
    view: io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap];
  };
}

export class GetDeployInfoRequest extends jspb.Message {
  getDeployHashBase16(): string;
  setDeployHashBase16(value: string): void;

  getDeployHash(): Uint8Array | string;
  getDeployHash_asU8(): Uint8Array;
  getDeployHash_asB64(): string;
  setDeployHash(value: Uint8Array | string): void;

  getView(): io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap];
  setView(
    value: io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap]
  ): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDeployInfoRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetDeployInfoRequest
  ): GetDeployInfoRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetDeployInfoRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetDeployInfoRequest;
  static deserializeBinaryFromReader(
    message: GetDeployInfoRequest,
    reader: jspb.BinaryReader
  ): GetDeployInfoRequest;
}

export namespace GetDeployInfoRequest {
  export type AsObject = {
    deployHashBase16: string;
    deployHash: Uint8Array | string;
    view: io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap];
  };
}

export class StreamBlockDeploysRequest extends jspb.Message {
  getBlockHashBase16(): string;
  setBlockHashBase16(value: string): void;

  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  getView(): io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap];
  setView(
    value: io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap]
  ): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamBlockDeploysRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StreamBlockDeploysRequest
  ): StreamBlockDeploysRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StreamBlockDeploysRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StreamBlockDeploysRequest;
  static deserializeBinaryFromReader(
    message: StreamBlockDeploysRequest,
    reader: jspb.BinaryReader
  ): StreamBlockDeploysRequest;
}

export namespace StreamBlockDeploysRequest {
  export type AsObject = {
    blockHashBase16: string;
    blockHash: Uint8Array | string;
    view: io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap];
  };
}

export class StateQuery extends jspb.Message {
  getKeyVariant(): StateQuery.KeyVariantMap[keyof StateQuery.KeyVariantMap];
  setKeyVariant(
    value: StateQuery.KeyVariantMap[keyof StateQuery.KeyVariantMap]
  ): void;

  getKeyBase16(): string;
  setKeyBase16(value: string): void;

  clearPathSegmentsList(): void;
  getPathSegmentsList(): Array<string>;
  setPathSegmentsList(value: Array<string>): void;
  addPathSegments(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StateQuery.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StateQuery
  ): StateQuery.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StateQuery,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StateQuery;
  static deserializeBinaryFromReader(
    message: StateQuery,
    reader: jspb.BinaryReader
  ): StateQuery;
}

export namespace StateQuery {
  export type AsObject = {
    keyVariant: StateQuery.KeyVariantMap[keyof StateQuery.KeyVariantMap];
    keyBase16: string;
    pathSegmentsList: Array<string>;
  };

  export interface KeyVariantMap {
    KEY_VARIANT_UNSPECIFIED: 0;
    HASH: 1;
    UREF: 2;
    ADDRESS: 3;
    LOCAL: 4;
  }

  export const KeyVariant: KeyVariantMap;
}

export class GetBlockStateRequest extends jspb.Message {
  getBlockHashBase16(): string;
  setBlockHashBase16(value: string): void;

  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  hasQuery(): boolean;
  clearQuery(): void;
  getQuery(): StateQuery | undefined;
  setQuery(value?: StateQuery): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlockStateRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetBlockStateRequest
  ): GetBlockStateRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetBlockStateRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetBlockStateRequest;
  static deserializeBinaryFromReader(
    message: GetBlockStateRequest,
    reader: jspb.BinaryReader
  ): GetBlockStateRequest;
}

export namespace GetBlockStateRequest {
  export type AsObject = {
    blockHashBase16: string;
    blockHash: Uint8Array | string;
    query?: StateQuery.AsObject;
  };
}

export class BatchGetBlockStateRequest extends jspb.Message {
  getBlockHashBase16(): string;
  setBlockHashBase16(value: string): void;

  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  clearQueriesList(): void;
  getQueriesList(): Array<StateQuery>;
  setQueriesList(value: Array<StateQuery>): void;
  addQueries(value?: StateQuery, index?: number): StateQuery;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BatchGetBlockStateRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BatchGetBlockStateRequest
  ): BatchGetBlockStateRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BatchGetBlockStateRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BatchGetBlockStateRequest;
  static deserializeBinaryFromReader(
    message: BatchGetBlockStateRequest,
    reader: jspb.BinaryReader
  ): BatchGetBlockStateRequest;
}

export namespace BatchGetBlockStateRequest {
  export type AsObject = {
    blockHashBase16: string;
    blockHash: Uint8Array | string;
    queriesList: Array<StateQuery.AsObject>;
  };
}

export class BatchGetBlockStateResponse extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<
    io_casperlabs_casper_consensus_state_pb.StoredValueInstance
  >;
  setValuesList(
    value: Array<io_casperlabs_casper_consensus_state_pb.StoredValueInstance>
  ): void;
  addValues(
    value?: io_casperlabs_casper_consensus_state_pb.StoredValueInstance,
    index?: number
  ): io_casperlabs_casper_consensus_state_pb.StoredValueInstance;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BatchGetBlockStateResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BatchGetBlockStateResponse
  ): BatchGetBlockStateResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BatchGetBlockStateResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BatchGetBlockStateResponse;
  static deserializeBinaryFromReader(
    message: BatchGetBlockStateResponse,
    reader: jspb.BinaryReader
  ): BatchGetBlockStateResponse;
}

export namespace BatchGetBlockStateResponse {
  export type AsObject = {
    valuesList: Array<
      io_casperlabs_casper_consensus_state_pb.StoredValueInstance.AsObject
    >;
  };
}

export class ListDeployInfosRequest extends jspb.Message {
  getAccountPublicKeyHashBase16(): string;
  setAccountPublicKeyHashBase16(value: string): void;

  getAccountPublicKeyHash(): Uint8Array | string;
  getAccountPublicKeyHash_asU8(): Uint8Array;
  getAccountPublicKeyHash_asB64(): string;
  setAccountPublicKeyHash(value: Uint8Array | string): void;

  getView(): io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap];
  setView(
    value: io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap]
  ): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPageToken(): string;
  setPageToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDeployInfosRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ListDeployInfosRequest
  ): ListDeployInfosRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ListDeployInfosRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ListDeployInfosRequest;
  static deserializeBinaryFromReader(
    message: ListDeployInfosRequest,
    reader: jspb.BinaryReader
  ): ListDeployInfosRequest;
}

export namespace ListDeployInfosRequest {
  export type AsObject = {
    accountPublicKeyHashBase16: string;
    accountPublicKeyHash: Uint8Array | string;
    view: io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.DeployInfo.ViewMap];
    pageSize: number;
    pageToken: string;
  };
}

export class ListDeployInfosResponse extends jspb.Message {
  clearDeployInfosList(): void;
  getDeployInfosList(): Array<
    io_casperlabs_casper_consensus_info_pb.DeployInfo
  >;
  setDeployInfosList(
    value: Array<io_casperlabs_casper_consensus_info_pb.DeployInfo>
  ): void;
  addDeployInfos(
    value?: io_casperlabs_casper_consensus_info_pb.DeployInfo,
    index?: number
  ): io_casperlabs_casper_consensus_info_pb.DeployInfo;

  getNextPageToken(): string;
  setNextPageToken(value: string): void;

  getPrevPageToken(): string;
  setPrevPageToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDeployInfosResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ListDeployInfosResponse
  ): ListDeployInfosResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ListDeployInfosResponse,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ListDeployInfosResponse;
  static deserializeBinaryFromReader(
    message: ListDeployInfosResponse,
    reader: jspb.BinaryReader
  ): ListDeployInfosResponse;
}

export namespace ListDeployInfosResponse {
  export type AsObject = {
    deployInfosList: Array<
      io_casperlabs_casper_consensus_info_pb.DeployInfo.AsObject
    >;
    nextPageToken: string;
    prevPageToken: string;
  };
}

export class GetLastFinalizedBlockInfoRequest extends jspb.Message {
  getView(): io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap];
  setView(
    value: io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap]
  ): void;

  serializeBinary(): Uint8Array;
  toObject(
    includeInstance?: boolean
  ): GetLastFinalizedBlockInfoRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetLastFinalizedBlockInfoRequest
  ): GetLastFinalizedBlockInfoRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetLastFinalizedBlockInfoRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetLastFinalizedBlockInfoRequest;
  static deserializeBinaryFromReader(
    message: GetLastFinalizedBlockInfoRequest,
    reader: jspb.BinaryReader
  ): GetLastFinalizedBlockInfoRequest;
}

export namespace GetLastFinalizedBlockInfoRequest {
  export type AsObject = {
    view: io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap[keyof io_casperlabs_casper_consensus_info_pb.BlockInfo.ViewMap];
  };
}

export class StreamEventsRequest extends jspb.Message {
  getBlockAdded(): boolean;
  setBlockAdded(value: boolean): void;

  getBlockFinalized(): boolean;
  setBlockFinalized(value: boolean): void;

  getDeployAdded(): boolean;
  setDeployAdded(value: boolean): void;

  getDeployDiscarded(): boolean;
  setDeployDiscarded(value: boolean): void;

  getDeployRequeued(): boolean;
  setDeployRequeued(value: boolean): void;

  getDeployProcessed(): boolean;
  setDeployProcessed(value: boolean): void;

  getDeployFinalized(): boolean;
  setDeployFinalized(value: boolean): void;

  getDeployOrphaned(): boolean;
  setDeployOrphaned(value: boolean): void;

  hasDeployFilter(): boolean;
  clearDeployFilter(): void;
  getDeployFilter(): StreamEventsRequest.DeployFilter | undefined;
  setDeployFilter(value?: StreamEventsRequest.DeployFilter): void;

  getMinEventId(): number;
  setMinEventId(value: number): void;

  getMaxEventId(): number;
  setMaxEventId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamEventsRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StreamEventsRequest
  ): StreamEventsRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StreamEventsRequest,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StreamEventsRequest;
  static deserializeBinaryFromReader(
    message: StreamEventsRequest,
    reader: jspb.BinaryReader
  ): StreamEventsRequest;
}

export namespace StreamEventsRequest {
  export type AsObject = {
    blockAdded: boolean;
    blockFinalized: boolean;
    deployAdded: boolean;
    deployDiscarded: boolean;
    deployRequeued: boolean;
    deployProcessed: boolean;
    deployFinalized: boolean;
    deployOrphaned: boolean;
    deployFilter?: StreamEventsRequest.DeployFilter.AsObject;
    minEventId: number;
    maxEventId: number;
  };

  export class DeployFilter extends jspb.Message {
    clearAccountPublicKeyHashesList(): void;
    getAccountPublicKeyHashesList(): Array<Uint8Array | string>;
    getAccountPublicKeyHashesList_asU8(): Array<Uint8Array>;
    getAccountPublicKeyHashesList_asB64(): Array<string>;
    setAccountPublicKeyHashesList(value: Array<Uint8Array | string>): void;
    addAccountPublicKeyHashes(
      value: Uint8Array | string,
      index?: number
    ): Uint8Array | string;

    clearDeployHashesList(): void;
    getDeployHashesList(): Array<Uint8Array | string>;
    getDeployHashesList_asU8(): Array<Uint8Array>;
    getDeployHashesList_asB64(): Array<string>;
    setDeployHashesList(value: Array<Uint8Array | string>): void;
    addDeployHashes(
      value: Uint8Array | string,
      index?: number
    ): Uint8Array | string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeployFilter.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: DeployFilter
    ): DeployFilter.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: DeployFilter,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): DeployFilter;
    static deserializeBinaryFromReader(
      message: DeployFilter,
      reader: jspb.BinaryReader
    ): DeployFilter;
  }

  export namespace DeployFilter {
    export type AsObject = {
      accountPublicKeyHashesList: Array<Uint8Array | string>;
      deployHashesList: Array<Uint8Array | string>;
    };
  }
}

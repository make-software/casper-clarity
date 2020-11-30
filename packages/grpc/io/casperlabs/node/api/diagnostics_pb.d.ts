// package: io.casperlabs.node.api.diagnostics
// file: io/casperlabs/node/api/diagnostics.proto

import * as jspb from 'google-protobuf';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as io_casperlabs_comm_discovery_node_pb from '../../../../io/casperlabs/comm/discovery/node_pb';

export class NodeCoreMetrics extends jspb.Message {
  getPingreceivercount(): number;
  setPingreceivercount(value: number): void;

  getLookupreceivercount(): number;
  setLookupreceivercount(value: number): void;

  getDisconnectreceivercount(): number;
  setDisconnectreceivercount(value: number): void;

  getConnects(): number;
  setConnects(value: number): void;

  getP2pencryptionhandshakereceivercount(): number;
  setP2pencryptionhandshakereceivercount(value: number): void;

  getP2pprotocolhandshakereceivercount(): number;
  setP2pprotocolhandshakereceivercount(value: number): void;

  getPeers(): number;
  setPeers(value: number): void;

  getFrom(): number;
  setFrom(value: number): void;

  getTo(): number;
  setTo(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NodeCoreMetrics.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: NodeCoreMetrics
  ): NodeCoreMetrics.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: NodeCoreMetrics,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): NodeCoreMetrics;
  static deserializeBinaryFromReader(
    message: NodeCoreMetrics,
    reader: jspb.BinaryReader
  ): NodeCoreMetrics;
}

export namespace NodeCoreMetrics {
  export type AsObject = {
    pingreceivercount: number;
    lookupreceivercount: number;
    disconnectreceivercount: number;
    connects: number;
    p2pencryptionhandshakereceivercount: number;
    p2pprotocolhandshakereceivercount: number;
    peers: number;
    from: number;
    to: number;
  };
}

export class Peers extends jspb.Message {
  clearPeersList(): void;
  getPeersList(): Array<io_casperlabs_comm_discovery_node_pb.Node>;
  setPeersList(value: Array<io_casperlabs_comm_discovery_node_pb.Node>): void;
  addPeers(
    value?: io_casperlabs_comm_discovery_node_pb.Node,
    index?: number
  ): io_casperlabs_comm_discovery_node_pb.Node;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Peers.AsObject;
  static toObject(includeInstance: boolean, msg: Peers): Peers.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Peers,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Peers;
  static deserializeBinaryFromReader(
    message: Peers,
    reader: jspb.BinaryReader
  ): Peers;
}

export namespace Peers {
  export type AsObject = {
    peersList: Array<io_casperlabs_comm_discovery_node_pb.Node.AsObject>;
  };
}

// package: io.casperlabs.comm.discovery
// file: io/casperlabs/comm/discovery/node.proto

import * as jspb from 'google-protobuf';

export class Node extends jspb.Message {
  getId(): Uint8Array | string;
  getId_asU8(): Uint8Array;
  getId_asB64(): string;
  setId(value: Uint8Array | string): void;

  getHost(): string;
  setHost(value: string): void;

  getProtocolPort(): number;
  setProtocolPort(value: number): void;

  getDiscoveryPort(): number;
  setDiscoveryPort(value: number): void;

  getChainId(): Uint8Array | string;
  getChainId_asU8(): Uint8Array;
  getChainId_asB64(): string;
  setChainId(value: Uint8Array | string): void;

  getNodeVersion(): string;
  setNodeVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Node.AsObject;
  static toObject(includeInstance: boolean, msg: Node): Node.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Node,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Node;
  static deserializeBinaryFromReader(
    message: Node,
    reader: jspb.BinaryReader
  ): Node;
}

export namespace Node {
  export type AsObject = {
    id: Uint8Array | string;
    host: string;
    protocolPort: number;
    discoveryPort: number;
    chainId: Uint8Array | string;
    nodeVersion: string;
  };
}

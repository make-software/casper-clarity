// package: io.casperlabs.casper.consensus
// file: io/casperlabs/casper/consensus/consensus.proto

import * as jspb from 'google-protobuf';
import * as io_casperlabs_casper_consensus_state_pb from '../../../../io/casperlabs/casper/consensus/state_pb';

export class Signature extends jspb.Message {
  getSigAlgorithm(): string;
  setSigAlgorithm(value: string): void;

  getSig(): Uint8Array | string;
  getSig_asU8(): Uint8Array;
  getSig_asB64(): string;
  setSig(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Signature.AsObject;
  static toObject(includeInstance: boolean, msg: Signature): Signature.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Signature,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Signature;
  static deserializeBinaryFromReader(
    message: Signature,
    reader: jspb.BinaryReader
  ): Signature;
}

export namespace Signature {
  export type AsObject = {
    sigAlgorithm: string;
    sig: Uint8Array | string;
  };
}

export class Approval extends jspb.Message {
  getApproverPublicKey(): Uint8Array | string;
  getApproverPublicKey_asU8(): Uint8Array;
  getApproverPublicKey_asB64(): string;
  setApproverPublicKey(value: Uint8Array | string): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Signature | undefined;
  setSignature(value?: Signature): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Approval.AsObject;
  static toObject(includeInstance: boolean, msg: Approval): Approval.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Approval,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Approval;
  static deserializeBinaryFromReader(
    message: Approval,
    reader: jspb.BinaryReader
  ): Approval;
}

export namespace Approval {
  export type AsObject = {
    approverPublicKey: Uint8Array | string;
    signature?: Signature.AsObject;
  };
}

export class Deploy extends jspb.Message {
  getDeployHash(): Uint8Array | string;
  getDeployHash_asU8(): Uint8Array;
  getDeployHash_asB64(): string;
  setDeployHash(value: Uint8Array | string): void;

  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): Deploy.Header | undefined;
  setHeader(value?: Deploy.Header): void;

  hasBody(): boolean;
  clearBody(): void;
  getBody(): Deploy.Body | undefined;
  setBody(value?: Deploy.Body): void;

  clearApprovalsList(): void;
  getApprovalsList(): Array<Approval>;
  setApprovalsList(value: Array<Approval>): void;
  addApprovals(value?: Approval, index?: number): Approval;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Deploy.AsObject;
  static toObject(includeInstance: boolean, msg: Deploy): Deploy.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Deploy,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Deploy;
  static deserializeBinaryFromReader(
    message: Deploy,
    reader: jspb.BinaryReader
  ): Deploy;
}

export namespace Deploy {
  export type AsObject = {
    deployHash: Uint8Array | string;
    header?: Deploy.Header.AsObject;
    body?: Deploy.Body.AsObject;
    approvalsList: Array<Approval.AsObject>;
  };

  export class Header extends jspb.Message {
    getAccountPublicKeyHash(): Uint8Array | string;
    getAccountPublicKeyHash_asU8(): Uint8Array;
    getAccountPublicKeyHash_asB64(): string;
    setAccountPublicKeyHash(value: Uint8Array | string): void;

    getTimestamp(): number;
    setTimestamp(value: number): void;

    getGasPrice(): number;
    setGasPrice(value: number): void;

    getBodyHash(): Uint8Array | string;
    getBodyHash_asU8(): Uint8Array;
    getBodyHash_asB64(): string;
    setBodyHash(value: Uint8Array | string): void;

    getTtlMillis(): number;
    setTtlMillis(value: number): void;

    clearDependenciesList(): void;
    getDependenciesList(): Array<Uint8Array | string>;
    getDependenciesList_asU8(): Array<Uint8Array>;
    getDependenciesList_asB64(): Array<string>;
    setDependenciesList(value: Array<Uint8Array | string>): void;
    addDependencies(
      value: Uint8Array | string,
      index?: number
    ): Uint8Array | string;

    getChainName(): string;
    setChainName(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Header.AsObject;
    static toObject(includeInstance: boolean, msg: Header): Header.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Header,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Header;
    static deserializeBinaryFromReader(
      message: Header,
      reader: jspb.BinaryReader
    ): Header;
  }

  export namespace Header {
    export type AsObject = {
      accountPublicKeyHash: Uint8Array | string;
      timestamp: number;
      gasPrice: number;
      bodyHash: Uint8Array | string;
      ttlMillis: number;
      dependenciesList: Array<Uint8Array | string>;
      chainName: string;
    };
  }

  export class Body extends jspb.Message {
    hasSession(): boolean;
    clearSession(): void;
    getSession(): Deploy.Code | undefined;
    setSession(value?: Deploy.Code): void;

    hasPayment(): boolean;
    clearPayment(): void;
    getPayment(): Deploy.Code | undefined;
    setPayment(value?: Deploy.Code): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Body.AsObject;
    static toObject(includeInstance: boolean, msg: Body): Body.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Body,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Body;
    static deserializeBinaryFromReader(
      message: Body,
      reader: jspb.BinaryReader
    ): Body;
  }

  export namespace Body {
    export type AsObject = {
      session?: Deploy.Code.AsObject;
      payment?: Deploy.Code.AsObject;
    };
  }

  export class Code extends jspb.Message {
    clearArgsList(): void;
    getArgsList(): Array<Deploy.Arg>;
    setArgsList(value: Array<Deploy.Arg>): void;
    addArgs(value?: Deploy.Arg, index?: number): Deploy.Arg;

    hasWasmContract(): boolean;
    clearWasmContract(): void;
    getWasmContract(): Deploy.Code.WasmContract | undefined;
    setWasmContract(value?: Deploy.Code.WasmContract): void;

    hasStoredContract(): boolean;
    clearStoredContract(): void;
    getStoredContract(): Deploy.Code.StoredContract | undefined;
    setStoredContract(value?: Deploy.Code.StoredContract): void;

    hasStoredVersionedContract(): boolean;
    clearStoredVersionedContract(): void;
    getStoredVersionedContract():
      | Deploy.Code.StoredVersionedContract
      | undefined;
    setStoredVersionedContract(
      value?: Deploy.Code.StoredVersionedContract
    ): void;

    hasTransferContract(): boolean;
    clearTransferContract(): void;
    getTransferContract(): Deploy.Code.TransferContract | undefined;
    setTransferContract(value?: Deploy.Code.TransferContract): void;

    getContractCase(): Code.ContractCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Code.AsObject;
    static toObject(includeInstance: boolean, msg: Code): Code.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Code,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Code;
    static deserializeBinaryFromReader(
      message: Code,
      reader: jspb.BinaryReader
    ): Code;
  }

  export namespace Code {
    export type AsObject = {
      argsList: Array<Deploy.Arg.AsObject>;
      wasmContract?: Deploy.Code.WasmContract.AsObject;
      storedContract?: Deploy.Code.StoredContract.AsObject;
      storedVersionedContract?: Deploy.Code.StoredVersionedContract.AsObject;
      transferContract?: Deploy.Code.TransferContract.AsObject;
    };

    export class WasmContract extends jspb.Message {
      getWasm(): Uint8Array | string;
      getWasm_asU8(): Uint8Array;
      getWasm_asB64(): string;
      setWasm(value: Uint8Array | string): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): WasmContract.AsObject;
      static toObject(
        includeInstance: boolean,
        msg: WasmContract
      ): WasmContract.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: WasmContract,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): WasmContract;
      static deserializeBinaryFromReader(
        message: WasmContract,
        reader: jspb.BinaryReader
      ): WasmContract;
    }

    export namespace WasmContract {
      export type AsObject = {
        wasm: Uint8Array | string;
      };
    }

    export class StoredVersionedContract extends jspb.Message {
      hasPackageHash(): boolean;
      clearPackageHash(): void;
      getPackageHash(): Uint8Array | string;
      getPackageHash_asU8(): Uint8Array;
      getPackageHash_asB64(): string;
      setPackageHash(value: Uint8Array | string): void;

      hasName(): boolean;
      clearName(): void;
      getName(): string;
      setName(value: string): void;

      getEntryPoint(): string;
      setEntryPoint(value: string): void;

      getVersion(): number;
      setVersion(value: number): void;

      getAddressCase(): StoredVersionedContract.AddressCase;
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): StoredVersionedContract.AsObject;
      static toObject(
        includeInstance: boolean,
        msg: StoredVersionedContract
      ): StoredVersionedContract.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: StoredVersionedContract,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): StoredVersionedContract;
      static deserializeBinaryFromReader(
        message: StoredVersionedContract,
        reader: jspb.BinaryReader
      ): StoredVersionedContract;
    }

    export namespace StoredVersionedContract {
      export type AsObject = {
        packageHash: Uint8Array | string;
        name: string;
        entryPoint: string;
        version: number;
      };

      export enum AddressCase {
        ADDRESS_NOT_SET = 0,
        PACKAGE_HASH = 1,
        NAME = 2
      }
    }

    export class StoredContract extends jspb.Message {
      hasContractHash(): boolean;
      clearContractHash(): void;
      getContractHash(): Uint8Array | string;
      getContractHash_asU8(): Uint8Array;
      getContractHash_asB64(): string;
      setContractHash(value: Uint8Array | string): void;

      hasName(): boolean;
      clearName(): void;
      getName(): string;
      setName(value: string): void;

      getEntryPoint(): string;
      setEntryPoint(value: string): void;

      getAddressCase(): StoredContract.AddressCase;
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): StoredContract.AsObject;
      static toObject(
        includeInstance: boolean,
        msg: StoredContract
      ): StoredContract.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: StoredContract,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): StoredContract;
      static deserializeBinaryFromReader(
        message: StoredContract,
        reader: jspb.BinaryReader
      ): StoredContract;
    }

    export namespace StoredContract {
      export type AsObject = {
        contractHash: Uint8Array | string;
        name: string;
        entryPoint: string;
      };

      export enum AddressCase {
        ADDRESS_NOT_SET = 0,
        CONTRACT_HASH = 1,
        NAME = 2
      }
    }

    export class TransferContract extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): TransferContract.AsObject;
      static toObject(
        includeInstance: boolean,
        msg: TransferContract
      ): TransferContract.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: TransferContract,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): TransferContract;
      static deserializeBinaryFromReader(
        message: TransferContract,
        reader: jspb.BinaryReader
      ): TransferContract;
    }

    export namespace TransferContract {
      export type AsObject = {};
    }

    export enum ContractCase {
      CONTRACT_NOT_SET = 0,
      WASM_CONTRACT = 2,
      STORED_CONTRACT = 3,
      STORED_VERSIONED_CONTRACT = 4,
      TRANSFER_CONTRACT = 5
    }
  }

  export class Arg extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    hasValue(): boolean;
    clearValue(): void;
    getValue():
      | io_casperlabs_casper_consensus_state_pb.CLValueInstance
      | undefined;
    setValue(
      value?: io_casperlabs_casper_consensus_state_pb.CLValueInstance
    ): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Arg.AsObject;
    static toObject(includeInstance: boolean, msg: Arg): Arg.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Arg,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Arg;
    static deserializeBinaryFromReader(
      message: Arg,
      reader: jspb.BinaryReader
    ): Arg;
  }

  export namespace Arg {
    export type AsObject = {
      name: string;
      value?: io_casperlabs_casper_consensus_state_pb.CLValueInstance.AsObject;
    };
  }

  export class LegacyArg extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): Deploy.LegacyArg.Value | undefined;
    setValue(value?: Deploy.LegacyArg.Value): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LegacyArg.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: LegacyArg
    ): LegacyArg.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: LegacyArg,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): LegacyArg;
    static deserializeBinaryFromReader(
      message: LegacyArg,
      reader: jspb.BinaryReader
    ): LegacyArg;
  }

  export namespace LegacyArg {
    export type AsObject = {
      name: string;
      value?: Deploy.LegacyArg.Value.AsObject;
    };

    export class Value extends jspb.Message {
      hasOptionalValue(): boolean;
      clearOptionalValue(): void;
      getOptionalValue(): Deploy.LegacyArg.Value | undefined;
      setOptionalValue(value?: Deploy.LegacyArg.Value): void;

      hasBytesValue(): boolean;
      clearBytesValue(): void;
      getBytesValue(): Uint8Array | string;
      getBytesValue_asU8(): Uint8Array;
      getBytesValue_asB64(): string;
      setBytesValue(value: Uint8Array | string): void;

      hasIntValue(): boolean;
      clearIntValue(): void;
      getIntValue(): number;
      setIntValue(value: number): void;

      hasIntList(): boolean;
      clearIntList(): void;
      getIntList(): io_casperlabs_casper_consensus_state_pb.IntList | undefined;
      setIntList(value?: io_casperlabs_casper_consensus_state_pb.IntList): void;

      hasStringValue(): boolean;
      clearStringValue(): void;
      getStringValue(): string;
      setStringValue(value: string): void;

      hasStringList(): boolean;
      clearStringList(): void;
      getStringList():
        | io_casperlabs_casper_consensus_state_pb.StringList
        | undefined;
      setStringList(
        value?: io_casperlabs_casper_consensus_state_pb.StringList
      ): void;

      hasLongValue(): boolean;
      clearLongValue(): void;
      getLongValue(): number;
      setLongValue(value: number): void;

      hasBigInt(): boolean;
      clearBigInt(): void;
      getBigInt(): io_casperlabs_casper_consensus_state_pb.BigInt | undefined;
      setBigInt(value?: io_casperlabs_casper_consensus_state_pb.BigInt): void;

      hasKey(): boolean;
      clearKey(): void;
      getKey(): io_casperlabs_casper_consensus_state_pb.Key | undefined;
      setKey(value?: io_casperlabs_casper_consensus_state_pb.Key): void;

      getValueCase(): Value.ValueCase;
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Value.AsObject;
      static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: Value,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): Value;
      static deserializeBinaryFromReader(
        message: Value,
        reader: jspb.BinaryReader
      ): Value;
    }

    export namespace Value {
      export type AsObject = {
        optionalValue?: Deploy.LegacyArg.Value.AsObject;
        bytesValue: Uint8Array | string;
        intValue: number;
        intList?: io_casperlabs_casper_consensus_state_pb.IntList.AsObject;
        stringValue: string;
        stringList?: io_casperlabs_casper_consensus_state_pb.StringList.AsObject;
        longValue: number;
        bigInt?: io_casperlabs_casper_consensus_state_pb.BigInt.AsObject;
        key?: io_casperlabs_casper_consensus_state_pb.Key.AsObject;
      };

      export enum ValueCase {
        VALUE_NOT_SET = 0,
        OPTIONAL_VALUE = 1,
        BYTES_VALUE = 2,
        INT_VALUE = 3,
        INT_LIST = 4,
        STRING_VALUE = 5,
        STRING_LIST = 6,
        LONG_VALUE = 7,
        BIG_INT = 8,
        KEY = 9
      }
    }
  }
}

export class DeploySummary extends jspb.Message {
  getDeployHash(): Uint8Array | string;
  getDeployHash_asU8(): Uint8Array;
  getDeployHash_asB64(): string;
  setDeployHash(value: Uint8Array | string): void;

  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): Deploy.Header | undefined;
  setHeader(value?: Deploy.Header): void;

  clearApprovalsList(): void;
  getApprovalsList(): Array<Approval>;
  setApprovalsList(value: Array<Approval>): void;
  addApprovals(value?: Approval, index?: number): Approval;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeploySummary.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DeploySummary
  ): DeploySummary.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DeploySummary,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): DeploySummary;
  static deserializeBinaryFromReader(
    message: DeploySummary,
    reader: jspb.BinaryReader
  ): DeploySummary;
}

export namespace DeploySummary {
  export type AsObject = {
    deployHash: Uint8Array | string;
    header?: Deploy.Header.AsObject;
    approvalsList: Array<Approval.AsObject>;
  };
}

export class BlockSummary extends jspb.Message {
  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): Block.Header | undefined;
  setHeader(value?: Block.Header): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Signature | undefined;
  setSignature(value?: Signature): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockSummary.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: BlockSummary
  ): BlockSummary.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BlockSummary,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BlockSummary;
  static deserializeBinaryFromReader(
    message: BlockSummary,
    reader: jspb.BinaryReader
  ): BlockSummary;
}

export namespace BlockSummary {
  export type AsObject = {
    blockHash: Uint8Array | string;
    header?: Block.Header.AsObject;
    signature?: Signature.AsObject;
  };
}

export class Block extends jspb.Message {
  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): Block.Header | undefined;
  setHeader(value?: Block.Header): void;

  hasBody(): boolean;
  clearBody(): void;
  getBody(): Block.Body | undefined;
  setBody(value?: Block.Body): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Signature | undefined;
  setSignature(value?: Signature): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Block,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(
    message: Block,
    reader: jspb.BinaryReader
  ): Block;
}

export namespace Block {
  export type AsObject = {
    blockHash: Uint8Array | string;
    header?: Block.Header.AsObject;
    body?: Block.Body.AsObject;
    signature?: Signature.AsObject;
  };

  export class Header extends jspb.Message {
    clearParentHashesList(): void;
    getParentHashesList(): Array<Uint8Array | string>;
    getParentHashesList_asU8(): Array<Uint8Array>;
    getParentHashesList_asB64(): Array<string>;
    setParentHashesList(value: Array<Uint8Array | string>): void;
    addParentHashes(
      value: Uint8Array | string,
      index?: number
    ): Uint8Array | string;

    clearJustificationsList(): void;
    getJustificationsList(): Array<Block.Justification>;
    setJustificationsList(value: Array<Block.Justification>): void;
    addJustifications(
      value?: Block.Justification,
      index?: number
    ): Block.Justification;

    hasState(): boolean;
    clearState(): void;
    getState(): Block.GlobalState | undefined;
    setState(value?: Block.GlobalState): void;

    getBodyHash(): Uint8Array | string;
    getBodyHash_asU8(): Uint8Array;
    getBodyHash_asB64(): string;
    setBodyHash(value: Uint8Array | string): void;

    getTimestamp(): number;
    setTimestamp(value: number): void;

    hasProtocolVersion(): boolean;
    clearProtocolVersion(): void;
    getProtocolVersion():
      | io_casperlabs_casper_consensus_state_pb.ProtocolVersion
      | undefined;
    setProtocolVersion(
      value?: io_casperlabs_casper_consensus_state_pb.ProtocolVersion
    ): void;

    getDeployCount(): number;
    setDeployCount(value: number): void;

    getChainName(): string;
    setChainName(value: string): void;

    getValidatorBlockSeqNum(): number;
    setValidatorBlockSeqNum(value: number): void;

    getValidatorPublicKey(): Uint8Array | string;
    getValidatorPublicKey_asU8(): Uint8Array;
    getValidatorPublicKey_asB64(): string;
    setValidatorPublicKey(value: Uint8Array | string): void;

    getValidatorPublicKeyHash(): Uint8Array | string;
    getValidatorPublicKeyHash_asU8(): Uint8Array;
    getValidatorPublicKeyHash_asB64(): string;
    setValidatorPublicKeyHash(value: Uint8Array | string): void;

    getValidatorPrevBlockHash(): Uint8Array | string;
    getValidatorPrevBlockHash_asU8(): Uint8Array;
    getValidatorPrevBlockHash_asB64(): string;
    setValidatorPrevBlockHash(value: Uint8Array | string): void;

    getJRank(): number;
    setJRank(value: number): void;

    getMessageType(): Block.MessageTypeMap[keyof Block.MessageTypeMap];
    setMessageType(
      value: Block.MessageTypeMap[keyof Block.MessageTypeMap]
    ): void;

    getMessageRole(): Block.MessageRoleMap[keyof Block.MessageRoleMap];
    setMessageRole(
      value: Block.MessageRoleMap[keyof Block.MessageRoleMap]
    ): void;

    getKeyBlockHash(): Uint8Array | string;
    getKeyBlockHash_asU8(): Uint8Array;
    getKeyBlockHash_asB64(): string;
    setKeyBlockHash(value: Uint8Array | string): void;

    getRoundId(): number;
    setRoundId(value: number): void;

    getMagicBit(): boolean;
    setMagicBit(value: boolean): void;

    getMainRank(): number;
    setMainRank(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Header.AsObject;
    static toObject(includeInstance: boolean, msg: Header): Header.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Header,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Header;
    static deserializeBinaryFromReader(
      message: Header,
      reader: jspb.BinaryReader
    ): Header;
  }

  export namespace Header {
    export type AsObject = {
      parentHashesList: Array<Uint8Array | string>;
      justificationsList: Array<Block.Justification.AsObject>;
      state?: Block.GlobalState.AsObject;
      bodyHash: Uint8Array | string;
      timestamp: number;
      protocolVersion?: io_casperlabs_casper_consensus_state_pb.ProtocolVersion.AsObject;
      deployCount: number;
      chainName: string;
      validatorBlockSeqNum: number;
      validatorPublicKey: Uint8Array | string;
      validatorPublicKeyHash: Uint8Array | string;
      validatorPrevBlockHash: Uint8Array | string;
      jRank: number;
      messageType: Block.MessageTypeMap[keyof Block.MessageTypeMap];
      messageRole: Block.MessageRoleMap[keyof Block.MessageRoleMap];
      keyBlockHash: Uint8Array | string;
      roundId: number;
      magicBit: boolean;
      mainRank: number;
    };
  }

  export class Body extends jspb.Message {
    clearDeploysList(): void;
    getDeploysList(): Array<Block.ProcessedDeploy>;
    setDeploysList(value: Array<Block.ProcessedDeploy>): void;
    addDeploys(
      value?: Block.ProcessedDeploy,
      index?: number
    ): Block.ProcessedDeploy;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Body.AsObject;
    static toObject(includeInstance: boolean, msg: Body): Body.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Body,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Body;
    static deserializeBinaryFromReader(
      message: Body,
      reader: jspb.BinaryReader
    ): Body;
  }

  export namespace Body {
    export type AsObject = {
      deploysList: Array<Block.ProcessedDeploy.AsObject>;
    };
  }

  export class Justification extends jspb.Message {
    getValidatorPublicKeyHash(): Uint8Array | string;
    getValidatorPublicKeyHash_asU8(): Uint8Array;
    getValidatorPublicKeyHash_asB64(): string;
    setValidatorPublicKeyHash(value: Uint8Array | string): void;

    getLatestBlockHash(): Uint8Array | string;
    getLatestBlockHash_asU8(): Uint8Array;
    getLatestBlockHash_asB64(): string;
    setLatestBlockHash(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Justification.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: Justification
    ): Justification.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Justification,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Justification;
    static deserializeBinaryFromReader(
      message: Justification,
      reader: jspb.BinaryReader
    ): Justification;
  }

  export namespace Justification {
    export type AsObject = {
      validatorPublicKeyHash: Uint8Array | string;
      latestBlockHash: Uint8Array | string;
    };
  }

  export class ProcessedDeploy extends jspb.Message {
    hasDeploy(): boolean;
    clearDeploy(): void;
    getDeploy(): Deploy | undefined;
    setDeploy(value?: Deploy): void;

    getCost(): number;
    setCost(value: number): void;

    getIsError(): boolean;
    setIsError(value: boolean): void;

    getErrorMessage(): string;
    setErrorMessage(value: string): void;

    getStage(): number;
    setStage(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessedDeploy.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: ProcessedDeploy
    ): ProcessedDeploy.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: ProcessedDeploy,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): ProcessedDeploy;
    static deserializeBinaryFromReader(
      message: ProcessedDeploy,
      reader: jspb.BinaryReader
    ): ProcessedDeploy;
  }

  export namespace ProcessedDeploy {
    export type AsObject = {
      deploy?: Deploy.AsObject;
      cost: number;
      isError: boolean;
      errorMessage: string;
      stage: number;
    };
  }

  export class GlobalState extends jspb.Message {
    getPreStateHash(): Uint8Array | string;
    getPreStateHash_asU8(): Uint8Array;
    getPreStateHash_asB64(): string;
    setPreStateHash(value: Uint8Array | string): void;

    getPostStateHash(): Uint8Array | string;
    getPostStateHash_asU8(): Uint8Array;
    getPostStateHash_asB64(): string;
    setPostStateHash(value: Uint8Array | string): void;

    clearBondsList(): void;
    getBondsList(): Array<Bond>;
    setBondsList(value: Array<Bond>): void;
    addBonds(value?: Bond, index?: number): Bond;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GlobalState.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: GlobalState
    ): GlobalState.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: GlobalState,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): GlobalState;
    static deserializeBinaryFromReader(
      message: GlobalState,
      reader: jspb.BinaryReader
    ): GlobalState;
  }

  export namespace GlobalState {
    export type AsObject = {
      preStateHash: Uint8Array | string;
      postStateHash: Uint8Array | string;
      bondsList: Array<Bond.AsObject>;
    };
  }

  export interface MessageTypeMap {
    BLOCK: 0;
    BALLOT: 1;
  }

  export const MessageType: MessageTypeMap;

  export interface MessageRoleMap {
    UNDEFINED: 0;
    PROPOSAL: 1;
    CONFIRMATION: 2;
    WITNESS: 3;
  }

  export const MessageRole: MessageRoleMap;
}

export class Bond extends jspb.Message {
  getValidatorPublicKeyHash(): Uint8Array | string;
  getValidatorPublicKeyHash_asU8(): Uint8Array;
  getValidatorPublicKeyHash_asB64(): string;
  setValidatorPublicKeyHash(value: Uint8Array | string): void;

  hasStake(): boolean;
  clearStake(): void;
  getStake(): io_casperlabs_casper_consensus_state_pb.BigInt | undefined;
  setStake(value?: io_casperlabs_casper_consensus_state_pb.BigInt): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bond.AsObject;
  static toObject(includeInstance: boolean, msg: Bond): Bond.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Bond,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Bond;
  static deserializeBinaryFromReader(
    message: Bond,
    reader: jspb.BinaryReader
  ): Bond;
}

export namespace Bond {
  export type AsObject = {
    validatorPublicKeyHash: Uint8Array | string;
    stake?: io_casperlabs_casper_consensus_state_pb.BigInt.AsObject;
  };
}

export class GenesisCandidate extends jspb.Message {
  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  clearApprovalsList(): void;
  getApprovalsList(): Array<Approval>;
  setApprovalsList(value: Array<Approval>): void;
  addApprovals(value?: Approval, index?: number): Approval;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenesisCandidate.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GenesisCandidate
  ): GenesisCandidate.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GenesisCandidate,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): GenesisCandidate;
  static deserializeBinaryFromReader(
    message: GenesisCandidate,
    reader: jspb.BinaryReader
  ): GenesisCandidate;
}

export namespace GenesisCandidate {
  export type AsObject = {
    blockHash: Uint8Array | string;
    approvalsList: Array<Approval.AsObject>;
  };
}

export class Era extends jspb.Message {
  getKeyBlockHash(): Uint8Array | string;
  getKeyBlockHash_asU8(): Uint8Array;
  getKeyBlockHash_asB64(): string;
  setKeyBlockHash(value: Uint8Array | string): void;

  getParentKeyBlockHash(): Uint8Array | string;
  getParentKeyBlockHash_asU8(): Uint8Array;
  getParentKeyBlockHash_asB64(): string;
  setParentKeyBlockHash(value: Uint8Array | string): void;

  getStartTick(): number;
  setStartTick(value: number): void;

  getEndTick(): number;
  setEndTick(value: number): void;

  getBookingBlockHash(): Uint8Array | string;
  getBookingBlockHash_asU8(): Uint8Array;
  getBookingBlockHash_asB64(): string;
  setBookingBlockHash(value: Uint8Array | string): void;

  getLeaderSeed(): Uint8Array | string;
  getLeaderSeed_asU8(): Uint8Array;
  getLeaderSeed_asB64(): string;
  setLeaderSeed(value: Uint8Array | string): void;

  clearBondsList(): void;
  getBondsList(): Array<Bond>;
  setBondsList(value: Array<Bond>): void;
  addBonds(value?: Bond, index?: number): Bond;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Era.AsObject;
  static toObject(includeInstance: boolean, msg: Era): Era.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(message: Era, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Era;
  static deserializeBinaryFromReader(
    message: Era,
    reader: jspb.BinaryReader
  ): Era;
}

export namespace Era {
  export type AsObject = {
    keyBlockHash: Uint8Array | string;
    parentKeyBlockHash: Uint8Array | string;
    startTick: number;
    endTick: number;
    bookingBlockHash: Uint8Array | string;
    leaderSeed: Uint8Array | string;
    bondsList: Array<Bond.AsObject>;
  };
}

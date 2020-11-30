// package: io.casperlabs.casper.consensus.state
// file: io/casperlabs/casper/consensus/state.proto

import * as jspb from 'google-protobuf';

export class SemVer extends jspb.Message {
  getMajor(): number;
  setMajor(value: number): void;

  getMinor(): number;
  setMinor(value: number): void;

  getPatch(): number;
  setPatch(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemVer.AsObject;
  static toObject(includeInstance: boolean, msg: SemVer): SemVer.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: SemVer,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): SemVer;
  static deserializeBinaryFromReader(
    message: SemVer,
    reader: jspb.BinaryReader
  ): SemVer;
}

export namespace SemVer {
  export type AsObject = {
    major: number;
    minor: number;
    patch: number;
  };
}

export class Contract extends jspb.Message {
  getContractPackageHash(): Uint8Array | string;
  getContractPackageHash_asU8(): Uint8Array;
  getContractPackageHash_asB64(): string;
  setContractPackageHash(value: Uint8Array | string): void;

  getContractWasmHash(): Uint8Array | string;
  getContractWasmHash_asU8(): Uint8Array;
  getContractWasmHash_asB64(): string;
  setContractWasmHash(value: Uint8Array | string): void;

  clearNamedKeysList(): void;
  getNamedKeysList(): Array<NamedKey>;
  setNamedKeysList(value: Array<NamedKey>): void;
  addNamedKeys(value?: NamedKey, index?: number): NamedKey;

  clearEntryPointsList(): void;
  getEntryPointsList(): Array<Contract.EntryPoint>;
  setEntryPointsList(value: Array<Contract.EntryPoint>): void;
  addEntryPoints(
    value?: Contract.EntryPoint,
    index?: number
  ): Contract.EntryPoint;

  hasProtocolVersion(): boolean;
  clearProtocolVersion(): void;
  getProtocolVersion(): ProtocolVersion | undefined;
  setProtocolVersion(value?: ProtocolVersion): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Contract.AsObject;
  static toObject(includeInstance: boolean, msg: Contract): Contract.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Contract,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Contract;
  static deserializeBinaryFromReader(
    message: Contract,
    reader: jspb.BinaryReader
  ): Contract;
}

export namespace Contract {
  export type AsObject = {
    contractPackageHash: Uint8Array | string;
    contractWasmHash: Uint8Array | string;
    namedKeysList: Array<NamedKey.AsObject>;
    entryPointsList: Array<Contract.EntryPoint.AsObject>;
    protocolVersion?: ProtocolVersion.AsObject;
  };

  export class EntryPoint extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    clearArgsList(): void;
    getArgsList(): Array<Contract.EntryPoint.Arg>;
    setArgsList(value: Array<Contract.EntryPoint.Arg>): void;
    addArgs(
      value?: Contract.EntryPoint.Arg,
      index?: number
    ): Contract.EntryPoint.Arg;

    hasRet(): boolean;
    clearRet(): void;
    getRet(): CLType | undefined;
    setRet(value?: CLType): void;

    hasPublic(): boolean;
    clearPublic(): void;
    getPublic(): Contract.EntryPoint.Public | undefined;
    setPublic(value?: Contract.EntryPoint.Public): void;

    hasGroups(): boolean;
    clearGroups(): void;
    getGroups(): Contract.EntryPoint.Groups | undefined;
    setGroups(value?: Contract.EntryPoint.Groups): void;

    hasSession(): boolean;
    clearSession(): void;
    getSession(): Contract.EntryPoint.SessionType | undefined;
    setSession(value?: Contract.EntryPoint.SessionType): void;

    hasContract(): boolean;
    clearContract(): void;
    getContract(): Contract.EntryPoint.ContractType | undefined;
    setContract(value?: Contract.EntryPoint.ContractType): void;

    getAccessCase(): EntryPoint.AccessCase;
    getEntryPointTypeCase(): EntryPoint.EntryPointTypeCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EntryPoint.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: EntryPoint
    ): EntryPoint.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: EntryPoint,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): EntryPoint;
    static deserializeBinaryFromReader(
      message: EntryPoint,
      reader: jspb.BinaryReader
    ): EntryPoint;
  }

  export namespace EntryPoint {
    export type AsObject = {
      name: string;
      argsList: Array<Contract.EntryPoint.Arg.AsObject>;
      ret?: CLType.AsObject;
      pb_public?: Contract.EntryPoint.Public.AsObject;
      groups?: Contract.EntryPoint.Groups.AsObject;
      session?: Contract.EntryPoint.SessionType.AsObject;
      contract?: Contract.EntryPoint.ContractType.AsObject;
    };

    export class Arg extends jspb.Message {
      getName(): string;
      setName(value: string): void;

      hasClType(): boolean;
      clearClType(): void;
      getClType(): CLType | undefined;
      setClType(value?: CLType): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Arg.AsObject;
      static toObject(includeInstance: boolean, msg: Arg): Arg.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
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
        clType?: CLType.AsObject;
      };
    }

    export class Public extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Public.AsObject;
      static toObject(includeInstance: boolean, msg: Public): Public.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: Public,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): Public;
      static deserializeBinaryFromReader(
        message: Public,
        reader: jspb.BinaryReader
      ): Public;
    }

    export namespace Public {
      export type AsObject = {};
    }

    export class Group extends jspb.Message {
      getName(): string;
      setName(value: string): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Group.AsObject;
      static toObject(includeInstance: boolean, msg: Group): Group.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: Group,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): Group;
      static deserializeBinaryFromReader(
        message: Group,
        reader: jspb.BinaryReader
      ): Group;
    }

    export namespace Group {
      export type AsObject = {
        name: string;
      };
    }

    export class SessionType extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): SessionType.AsObject;
      static toObject(
        includeInstance: boolean,
        msg: SessionType
      ): SessionType.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: SessionType,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): SessionType;
      static deserializeBinaryFromReader(
        message: SessionType,
        reader: jspb.BinaryReader
      ): SessionType;
    }

    export namespace SessionType {
      export type AsObject = {};
    }

    export class ContractType extends jspb.Message {
      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): ContractType.AsObject;
      static toObject(
        includeInstance: boolean,
        msg: ContractType
      ): ContractType.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: ContractType,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): ContractType;
      static deserializeBinaryFromReader(
        message: ContractType,
        reader: jspb.BinaryReader
      ): ContractType;
    }

    export namespace ContractType {
      export type AsObject = {};
    }

    export class Groups extends jspb.Message {
      clearGroupsList(): void;
      getGroupsList(): Array<Contract.EntryPoint.Group>;
      setGroupsList(value: Array<Contract.EntryPoint.Group>): void;
      addGroups(
        value?: Contract.EntryPoint.Group,
        index?: number
      ): Contract.EntryPoint.Group;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Groups.AsObject;
      static toObject(includeInstance: boolean, msg: Groups): Groups.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: Groups,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): Groups;
      static deserializeBinaryFromReader(
        message: Groups,
        reader: jspb.BinaryReader
      ): Groups;
    }

    export namespace Groups {
      export type AsObject = {
        groupsList: Array<Contract.EntryPoint.Group.AsObject>;
      };
    }

    export enum AccessCase {
      ACCESS_NOT_SET = 0,
      PUBLIC = 4,
      GROUPS = 5
    }

    export enum EntryPointTypeCase {
      ENTRY_POINT_TYPE_NOT_SET = 0,
      SESSION = 6,
      CONTRACT = 7
    }
  }
}

export class ContractVersionKey extends jspb.Message {
  getProtocolVersionMajor(): number;
  setProtocolVersionMajor(value: number): void;

  getContractVersion(): number;
  setContractVersion(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractVersionKey.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ContractVersionKey
  ): ContractVersionKey.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ContractVersionKey,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ContractVersionKey;
  static deserializeBinaryFromReader(
    message: ContractVersionKey,
    reader: jspb.BinaryReader
  ): ContractVersionKey;
}

export namespace ContractVersionKey {
  export type AsObject = {
    protocolVersionMajor: number;
    contractVersion: number;
  };
}

export class ContractPackage extends jspb.Message {
  hasAccessKey(): boolean;
  clearAccessKey(): void;
  getAccessKey(): Key.URef | undefined;
  setAccessKey(value?: Key.URef): void;

  clearActiveVersionsList(): void;
  getActiveVersionsList(): Array<ContractPackage.Version>;
  setActiveVersionsList(value: Array<ContractPackage.Version>): void;
  addActiveVersions(
    value?: ContractPackage.Version,
    index?: number
  ): ContractPackage.Version;

  clearDisabledVersionsList(): void;
  getDisabledVersionsList(): Array<ContractVersionKey>;
  setDisabledVersionsList(value: Array<ContractVersionKey>): void;
  addDisabledVersions(
    value?: ContractVersionKey,
    index?: number
  ): ContractVersionKey;

  clearGroupsList(): void;
  getGroupsList(): Array<ContractPackage.Group>;
  setGroupsList(value: Array<ContractPackage.Group>): void;
  addGroups(
    value?: ContractPackage.Group,
    index?: number
  ): ContractPackage.Group;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractPackage.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ContractPackage
  ): ContractPackage.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ContractPackage,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ContractPackage;
  static deserializeBinaryFromReader(
    message: ContractPackage,
    reader: jspb.BinaryReader
  ): ContractPackage;
}

export namespace ContractPackage {
  export type AsObject = {
    accessKey?: Key.URef.AsObject;
    activeVersionsList: Array<ContractPackage.Version.AsObject>;
    disabledVersionsList: Array<ContractVersionKey.AsObject>;
    groupsList: Array<ContractPackage.Group.AsObject>;
  };

  export class Version extends jspb.Message {
    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): ContractVersionKey | undefined;
    setVersion(value?: ContractVersionKey): void;

    getContractHash(): Uint8Array | string;
    getContractHash_asU8(): Uint8Array;
    getContractHash_asB64(): string;
    setContractHash(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Version.AsObject;
    static toObject(includeInstance: boolean, msg: Version): Version.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Version,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Version;
    static deserializeBinaryFromReader(
      message: Version,
      reader: jspb.BinaryReader
    ): Version;
  }

  export namespace Version {
    export type AsObject = {
      version?: ContractVersionKey.AsObject;
      contractHash: Uint8Array | string;
    };
  }

  export class Group extends jspb.Message {
    hasGroup(): boolean;
    clearGroup(): void;
    getGroup(): Contract.EntryPoint.Group | undefined;
    setGroup(value?: Contract.EntryPoint.Group): void;

    clearUrefsList(): void;
    getUrefsList(): Array<Key.URef>;
    setUrefsList(value: Array<Key.URef>): void;
    addUrefs(value?: Key.URef, index?: number): Key.URef;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Group.AsObject;
    static toObject(includeInstance: boolean, msg: Group): Group.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Group,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Group;
    static deserializeBinaryFromReader(
      message: Group,
      reader: jspb.BinaryReader
    ): Group;
  }

  export namespace Group {
    export type AsObject = {
      group?: Contract.EntryPoint.Group.AsObject;
      urefsList: Array<Key.URef.AsObject>;
    };
  }
}

export class CLType extends jspb.Message {
  hasSimpleType(): boolean;
  clearSimpleType(): void;
  getSimpleType(): CLType.SimpleMap[keyof CLType.SimpleMap];
  setSimpleType(value: CLType.SimpleMap[keyof CLType.SimpleMap]): void;

  hasOptionType(): boolean;
  clearOptionType(): void;
  getOptionType(): CLType.Option | undefined;
  setOptionType(value?: CLType.Option): void;

  hasListType(): boolean;
  clearListType(): void;
  getListType(): CLType.List | undefined;
  setListType(value?: CLType.List): void;

  hasFixedListType(): boolean;
  clearFixedListType(): void;
  getFixedListType(): CLType.FixedList | undefined;
  setFixedListType(value?: CLType.FixedList): void;

  hasResultType(): boolean;
  clearResultType(): void;
  getResultType(): CLType.Result | undefined;
  setResultType(value?: CLType.Result): void;

  hasMapType(): boolean;
  clearMapType(): void;
  getMapType(): CLType.Map | undefined;
  setMapType(value?: CLType.Map): void;

  hasTuple1Type(): boolean;
  clearTuple1Type(): void;
  getTuple1Type(): CLType.Tuple1 | undefined;
  setTuple1Type(value?: CLType.Tuple1): void;

  hasTuple2Type(): boolean;
  clearTuple2Type(): void;
  getTuple2Type(): CLType.Tuple2 | undefined;
  setTuple2Type(value?: CLType.Tuple2): void;

  hasTuple3Type(): boolean;
  clearTuple3Type(): void;
  getTuple3Type(): CLType.Tuple3 | undefined;
  setTuple3Type(value?: CLType.Tuple3): void;

  hasAnyType(): boolean;
  clearAnyType(): void;
  getAnyType(): CLType.Any | undefined;
  setAnyType(value?: CLType.Any): void;

  getVariantsCase(): CLType.VariantsCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CLType.AsObject;
  static toObject(includeInstance: boolean, msg: CLType): CLType.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CLType,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): CLType;
  static deserializeBinaryFromReader(
    message: CLType,
    reader: jspb.BinaryReader
  ): CLType;
}

export namespace CLType {
  export type AsObject = {
    simpleType: CLType.SimpleMap[keyof CLType.SimpleMap];
    optionType?: CLType.Option.AsObject;
    listType?: CLType.List.AsObject;
    fixedListType?: CLType.FixedList.AsObject;
    resultType?: CLType.Result.AsObject;
    mapType?: CLType.Map.AsObject;
    tuple1Type?: CLType.Tuple1.AsObject;
    tuple2Type?: CLType.Tuple2.AsObject;
    tuple3Type?: CLType.Tuple3.AsObject;
    anyType?: CLType.Any.AsObject;
  };

  export class Option extends jspb.Message {
    hasInner(): boolean;
    clearInner(): void;
    getInner(): CLType | undefined;
    setInner(value?: CLType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Option.AsObject;
    static toObject(includeInstance: boolean, msg: Option): Option.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Option,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Option;
    static deserializeBinaryFromReader(
      message: Option,
      reader: jspb.BinaryReader
    ): Option;
  }

  export namespace Option {
    export type AsObject = {
      inner?: CLType.AsObject;
    };
  }

  export class List extends jspb.Message {
    hasInner(): boolean;
    clearInner(): void;
    getInner(): CLType | undefined;
    setInner(value?: CLType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): List.AsObject;
    static toObject(includeInstance: boolean, msg: List): List.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: List,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): List;
    static deserializeBinaryFromReader(
      message: List,
      reader: jspb.BinaryReader
    ): List;
  }

  export namespace List {
    export type AsObject = {
      inner?: CLType.AsObject;
    };
  }

  export class FixedList extends jspb.Message {
    hasInner(): boolean;
    clearInner(): void;
    getInner(): CLType | undefined;
    setInner(value?: CLType): void;

    getLen(): number;
    setLen(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FixedList.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: FixedList
    ): FixedList.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: FixedList,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): FixedList;
    static deserializeBinaryFromReader(
      message: FixedList,
      reader: jspb.BinaryReader
    ): FixedList;
  }

  export namespace FixedList {
    export type AsObject = {
      inner?: CLType.AsObject;
      len: number;
    };
  }

  export class Result extends jspb.Message {
    hasOk(): boolean;
    clearOk(): void;
    getOk(): CLType | undefined;
    setOk(value?: CLType): void;

    hasErr(): boolean;
    clearErr(): void;
    getErr(): CLType | undefined;
    setErr(value?: CLType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Result.AsObject;
    static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Result,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Result;
    static deserializeBinaryFromReader(
      message: Result,
      reader: jspb.BinaryReader
    ): Result;
  }

  export namespace Result {
    export type AsObject = {
      ok?: CLType.AsObject;
      err?: CLType.AsObject;
    };
  }

  export class Map extends jspb.Message {
    hasKey(): boolean;
    clearKey(): void;
    getKey(): CLType | undefined;
    setKey(value?: CLType): void;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): CLType | undefined;
    setValue(value?: CLType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Map.AsObject;
    static toObject(includeInstance: boolean, msg: Map): Map.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Map,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Map;
    static deserializeBinaryFromReader(
      message: Map,
      reader: jspb.BinaryReader
    ): Map;
  }

  export namespace Map {
    export type AsObject = {
      key?: CLType.AsObject;
      value?: CLType.AsObject;
    };
  }

  export class Tuple1 extends jspb.Message {
    hasType0(): boolean;
    clearType0(): void;
    getType0(): CLType | undefined;
    setType0(value?: CLType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tuple1.AsObject;
    static toObject(includeInstance: boolean, msg: Tuple1): Tuple1.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Tuple1,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Tuple1;
    static deserializeBinaryFromReader(
      message: Tuple1,
      reader: jspb.BinaryReader
    ): Tuple1;
  }

  export namespace Tuple1 {
    export type AsObject = {
      type0?: CLType.AsObject;
    };
  }

  export class Tuple2 extends jspb.Message {
    hasType0(): boolean;
    clearType0(): void;
    getType0(): CLType | undefined;
    setType0(value?: CLType): void;

    hasType1(): boolean;
    clearType1(): void;
    getType1(): CLType | undefined;
    setType1(value?: CLType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tuple2.AsObject;
    static toObject(includeInstance: boolean, msg: Tuple2): Tuple2.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Tuple2,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Tuple2;
    static deserializeBinaryFromReader(
      message: Tuple2,
      reader: jspb.BinaryReader
    ): Tuple2;
  }

  export namespace Tuple2 {
    export type AsObject = {
      type0?: CLType.AsObject;
      type1?: CLType.AsObject;
    };
  }

  export class Tuple3 extends jspb.Message {
    hasType0(): boolean;
    clearType0(): void;
    getType0(): CLType | undefined;
    setType0(value?: CLType): void;

    hasType1(): boolean;
    clearType1(): void;
    getType1(): CLType | undefined;
    setType1(value?: CLType): void;

    hasType2(): boolean;
    clearType2(): void;
    getType2(): CLType | undefined;
    setType2(value?: CLType): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tuple3.AsObject;
    static toObject(includeInstance: boolean, msg: Tuple3): Tuple3.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Tuple3,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Tuple3;
    static deserializeBinaryFromReader(
      message: Tuple3,
      reader: jspb.BinaryReader
    ): Tuple3;
  }

  export namespace Tuple3 {
    export type AsObject = {
      type0?: CLType.AsObject;
      type1?: CLType.AsObject;
      type2?: CLType.AsObject;
    };
  }

  export class Any extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Any.AsObject;
    static toObject(includeInstance: boolean, msg: Any): Any.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Any,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Any;
    static deserializeBinaryFromReader(
      message: Any,
      reader: jspb.BinaryReader
    ): Any;
  }

  export namespace Any {
    export type AsObject = {};
  }

  export interface SimpleMap {
    BOOL: 0;
    I32: 1;
    I64: 2;
    U8: 3;
    U32: 4;
    U64: 5;
    U128: 6;
    U256: 7;
    U512: 8;
    UNIT: 9;
    STRING: 10;
    KEY: 11;
    UREF: 12;
  }

  export const Simple: SimpleMap;

  export enum VariantsCase {
    VARIANTS_NOT_SET = 0,
    SIMPLE_TYPE = 1,
    OPTION_TYPE = 2,
    LIST_TYPE = 3,
    FIXED_LIST_TYPE = 4,
    RESULT_TYPE = 5,
    MAP_TYPE = 6,
    TUPLE1_TYPE = 7,
    TUPLE2_TYPE = 8,
    TUPLE3_TYPE = 9,
    ANY_TYPE = 10
  }
}

export class CLValue extends jspb.Message {
  hasClType(): boolean;
  clearClType(): void;
  getClType(): CLType | undefined;
  setClType(value?: CLType): void;

  getSerializedValue(): Uint8Array | string;
  getSerializedValue_asU8(): Uint8Array;
  getSerializedValue_asB64(): string;
  setSerializedValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CLValue.AsObject;
  static toObject(includeInstance: boolean, msg: CLValue): CLValue.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CLValue,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): CLValue;
  static deserializeBinaryFromReader(
    message: CLValue,
    reader: jspb.BinaryReader
  ): CLValue;
}

export namespace CLValue {
  export type AsObject = {
    clType?: CLType.AsObject;
    serializedValue: Uint8Array | string;
  };
}

export class CLValueInstance extends jspb.Message {
  hasClType(): boolean;
  clearClType(): void;
  getClType(): CLType | undefined;
  setClType(value?: CLType): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): CLValueInstance.Value | undefined;
  setValue(value?: CLValueInstance.Value): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CLValueInstance.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CLValueInstance
  ): CLValueInstance.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CLValueInstance,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): CLValueInstance;
  static deserializeBinaryFromReader(
    message: CLValueInstance,
    reader: jspb.BinaryReader
  ): CLValueInstance;
}

export namespace CLValueInstance {
  export type AsObject = {
    clType?: CLType.AsObject;
    value?: CLValueInstance.Value.AsObject;
  };

  export class Value extends jspb.Message {
    hasBoolValue(): boolean;
    clearBoolValue(): void;
    getBoolValue(): boolean;
    setBoolValue(value: boolean): void;

    hasI32(): boolean;
    clearI32(): void;
    getI32(): number;
    setI32(value: number): void;

    hasI64(): boolean;
    clearI64(): void;
    getI64(): number;
    setI64(value: number): void;

    hasU8(): boolean;
    clearU8(): void;
    getU8(): number;
    setU8(value: number): void;

    hasU32(): boolean;
    clearU32(): void;
    getU32(): number;
    setU32(value: number): void;

    hasU64(): boolean;
    clearU64(): void;
    getU64(): number;
    setU64(value: number): void;

    hasU128(): boolean;
    clearU128(): void;
    getU128(): CLValueInstance.U128 | undefined;
    setU128(value?: CLValueInstance.U128): void;

    hasU256(): boolean;
    clearU256(): void;
    getU256(): CLValueInstance.U256 | undefined;
    setU256(value?: CLValueInstance.U256): void;

    hasU512(): boolean;
    clearU512(): void;
    getU512(): CLValueInstance.U512 | undefined;
    setU512(value?: CLValueInstance.U512): void;

    hasUnit(): boolean;
    clearUnit(): void;
    getUnit(): Unit | undefined;
    setUnit(value?: Unit): void;

    hasStrValue(): boolean;
    clearStrValue(): void;
    getStrValue(): string;
    setStrValue(value: string): void;

    hasKey(): boolean;
    clearKey(): void;
    getKey(): Key | undefined;
    setKey(value?: Key): void;

    hasUref(): boolean;
    clearUref(): void;
    getUref(): Key.URef | undefined;
    setUref(value?: Key.URef): void;

    hasOptionValue(): boolean;
    clearOptionValue(): void;
    getOptionValue(): CLValueInstance.Option | undefined;
    setOptionValue(value?: CLValueInstance.Option): void;

    hasListValue(): boolean;
    clearListValue(): void;
    getListValue(): CLValueInstance.List | undefined;
    setListValue(value?: CLValueInstance.List): void;

    hasFixedListValue(): boolean;
    clearFixedListValue(): void;
    getFixedListValue(): CLValueInstance.FixedList | undefined;
    setFixedListValue(value?: CLValueInstance.FixedList): void;

    hasResultValue(): boolean;
    clearResultValue(): void;
    getResultValue(): CLValueInstance.Result | undefined;
    setResultValue(value?: CLValueInstance.Result): void;

    hasMapValue(): boolean;
    clearMapValue(): void;
    getMapValue(): CLValueInstance.Map | undefined;
    setMapValue(value?: CLValueInstance.Map): void;

    hasTuple1Value(): boolean;
    clearTuple1Value(): void;
    getTuple1Value(): CLValueInstance.Tuple1 | undefined;
    setTuple1Value(value?: CLValueInstance.Tuple1): void;

    hasTuple2Value(): boolean;
    clearTuple2Value(): void;
    getTuple2Value(): CLValueInstance.Tuple2 | undefined;
    setTuple2Value(value?: CLValueInstance.Tuple2): void;

    hasTuple3Value(): boolean;
    clearTuple3Value(): void;
    getTuple3Value(): CLValueInstance.Tuple3 | undefined;
    setTuple3Value(value?: CLValueInstance.Tuple3): void;

    hasBytesValue(): boolean;
    clearBytesValue(): void;
    getBytesValue(): Uint8Array | string;
    getBytesValue_asU8(): Uint8Array;
    getBytesValue_asB64(): string;
    setBytesValue(value: Uint8Array | string): void;

    getValueCase(): Value.ValueCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Value.AsObject;
    static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
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
      boolValue: boolean;
      i32: number;
      i64: number;
      u8: number;
      u32: number;
      u64: number;
      u128?: CLValueInstance.U128.AsObject;
      u256?: CLValueInstance.U256.AsObject;
      u512?: CLValueInstance.U512.AsObject;
      unit?: Unit.AsObject;
      strValue: string;
      key?: Key.AsObject;
      uref?: Key.URef.AsObject;
      optionValue?: CLValueInstance.Option.AsObject;
      listValue?: CLValueInstance.List.AsObject;
      fixedListValue?: CLValueInstance.FixedList.AsObject;
      resultValue?: CLValueInstance.Result.AsObject;
      mapValue?: CLValueInstance.Map.AsObject;
      tuple1Value?: CLValueInstance.Tuple1.AsObject;
      tuple2Value?: CLValueInstance.Tuple2.AsObject;
      tuple3Value?: CLValueInstance.Tuple3.AsObject;
      bytesValue: Uint8Array | string;
    };

    export enum ValueCase {
      VALUE_NOT_SET = 0,
      BOOL_VALUE = 1,
      I32 = 2,
      I64 = 3,
      U8 = 4,
      U32 = 5,
      U64 = 6,
      U128 = 7,
      U256 = 8,
      U512 = 9,
      UNIT = 10,
      STR_VALUE = 11,
      KEY = 12,
      UREF = 13,
      OPTION_VALUE = 14,
      LIST_VALUE = 15,
      FIXED_LIST_VALUE = 16,
      RESULT_VALUE = 17,
      MAP_VALUE = 18,
      TUPLE1_VALUE = 19,
      TUPLE2_VALUE = 20,
      TUPLE3_VALUE = 21,
      BYTES_VALUE = 22
    }
  }

  export class U128 extends jspb.Message {
    getValue(): string;
    setValue(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): U128.AsObject;
    static toObject(includeInstance: boolean, msg: U128): U128.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: U128,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): U128;
    static deserializeBinaryFromReader(
      message: U128,
      reader: jspb.BinaryReader
    ): U128;
  }

  export namespace U128 {
    export type AsObject = {
      value: string;
    };
  }

  export class U256 extends jspb.Message {
    getValue(): string;
    setValue(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): U256.AsObject;
    static toObject(includeInstance: boolean, msg: U256): U256.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: U256,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): U256;
    static deserializeBinaryFromReader(
      message: U256,
      reader: jspb.BinaryReader
    ): U256;
  }

  export namespace U256 {
    export type AsObject = {
      value: string;
    };
  }

  export class U512 extends jspb.Message {
    getValue(): string;
    setValue(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): U512.AsObject;
    static toObject(includeInstance: boolean, msg: U512): U512.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: U512,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): U512;
    static deserializeBinaryFromReader(
      message: U512,
      reader: jspb.BinaryReader
    ): U512;
  }

  export namespace U512 {
    export type AsObject = {
      value: string;
    };
  }

  export class Option extends jspb.Message {
    hasValue(): boolean;
    clearValue(): void;
    getValue(): CLValueInstance.Value | undefined;
    setValue(value?: CLValueInstance.Value): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Option.AsObject;
    static toObject(includeInstance: boolean, msg: Option): Option.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Option,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Option;
    static deserializeBinaryFromReader(
      message: Option,
      reader: jspb.BinaryReader
    ): Option;
  }

  export namespace Option {
    export type AsObject = {
      value?: CLValueInstance.Value.AsObject;
    };
  }

  export class List extends jspb.Message {
    clearValuesList(): void;
    getValuesList(): Array<CLValueInstance.Value>;
    setValuesList(value: Array<CLValueInstance.Value>): void;
    addValues(
      value?: CLValueInstance.Value,
      index?: number
    ): CLValueInstance.Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): List.AsObject;
    static toObject(includeInstance: boolean, msg: List): List.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: List,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): List;
    static deserializeBinaryFromReader(
      message: List,
      reader: jspb.BinaryReader
    ): List;
  }

  export namespace List {
    export type AsObject = {
      valuesList: Array<CLValueInstance.Value.AsObject>;
    };
  }

  export class FixedList extends jspb.Message {
    getLength(): number;
    setLength(value: number): void;

    clearValuesList(): void;
    getValuesList(): Array<CLValueInstance.Value>;
    setValuesList(value: Array<CLValueInstance.Value>): void;
    addValues(
      value?: CLValueInstance.Value,
      index?: number
    ): CLValueInstance.Value;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FixedList.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: FixedList
    ): FixedList.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: FixedList,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): FixedList;
    static deserializeBinaryFromReader(
      message: FixedList,
      reader: jspb.BinaryReader
    ): FixedList;
  }

  export namespace FixedList {
    export type AsObject = {
      length: number;
      valuesList: Array<CLValueInstance.Value.AsObject>;
    };
  }

  export class Result extends jspb.Message {
    hasOk(): boolean;
    clearOk(): void;
    getOk(): CLValueInstance.Value | undefined;
    setOk(value?: CLValueInstance.Value): void;

    hasErr(): boolean;
    clearErr(): void;
    getErr(): CLValueInstance.Value | undefined;
    setErr(value?: CLValueInstance.Value): void;

    getValueCase(): Result.ValueCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Result.AsObject;
    static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Result,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Result;
    static deserializeBinaryFromReader(
      message: Result,
      reader: jspb.BinaryReader
    ): Result;
  }

  export namespace Result {
    export type AsObject = {
      ok?: CLValueInstance.Value.AsObject;
      err?: CLValueInstance.Value.AsObject;
    };

    export enum ValueCase {
      VALUE_NOT_SET = 0,
      OK = 1,
      ERR = 2
    }
  }

  export class Map extends jspb.Message {
    clearValuesList(): void;
    getValuesList(): Array<CLValueInstance.MapEntry>;
    setValuesList(value: Array<CLValueInstance.MapEntry>): void;
    addValues(
      value?: CLValueInstance.MapEntry,
      index?: number
    ): CLValueInstance.MapEntry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Map.AsObject;
    static toObject(includeInstance: boolean, msg: Map): Map.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Map,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Map;
    static deserializeBinaryFromReader(
      message: Map,
      reader: jspb.BinaryReader
    ): Map;
  }

  export namespace Map {
    export type AsObject = {
      valuesList: Array<CLValueInstance.MapEntry.AsObject>;
    };
  }

  export class MapEntry extends jspb.Message {
    hasKey(): boolean;
    clearKey(): void;
    getKey(): CLValueInstance.Value | undefined;
    setKey(value?: CLValueInstance.Value): void;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): CLValueInstance.Value | undefined;
    setValue(value?: CLValueInstance.Value): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MapEntry.AsObject;
    static toObject(includeInstance: boolean, msg: MapEntry): MapEntry.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: MapEntry,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): MapEntry;
    static deserializeBinaryFromReader(
      message: MapEntry,
      reader: jspb.BinaryReader
    ): MapEntry;
  }

  export namespace MapEntry {
    export type AsObject = {
      key?: CLValueInstance.Value.AsObject;
      value?: CLValueInstance.Value.AsObject;
    };
  }

  export class Tuple1 extends jspb.Message {
    hasValue1(): boolean;
    clearValue1(): void;
    getValue1(): CLValueInstance.Value | undefined;
    setValue1(value?: CLValueInstance.Value): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tuple1.AsObject;
    static toObject(includeInstance: boolean, msg: Tuple1): Tuple1.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Tuple1,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Tuple1;
    static deserializeBinaryFromReader(
      message: Tuple1,
      reader: jspb.BinaryReader
    ): Tuple1;
  }

  export namespace Tuple1 {
    export type AsObject = {
      value1?: CLValueInstance.Value.AsObject;
    };
  }

  export class Tuple2 extends jspb.Message {
    hasValue1(): boolean;
    clearValue1(): void;
    getValue1(): CLValueInstance.Value | undefined;
    setValue1(value?: CLValueInstance.Value): void;

    hasValue2(): boolean;
    clearValue2(): void;
    getValue2(): CLValueInstance.Value | undefined;
    setValue2(value?: CLValueInstance.Value): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tuple2.AsObject;
    static toObject(includeInstance: boolean, msg: Tuple2): Tuple2.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Tuple2,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Tuple2;
    static deserializeBinaryFromReader(
      message: Tuple2,
      reader: jspb.BinaryReader
    ): Tuple2;
  }

  export namespace Tuple2 {
    export type AsObject = {
      value1?: CLValueInstance.Value.AsObject;
      value2?: CLValueInstance.Value.AsObject;
    };
  }

  export class Tuple3 extends jspb.Message {
    hasValue1(): boolean;
    clearValue1(): void;
    getValue1(): CLValueInstance.Value | undefined;
    setValue1(value?: CLValueInstance.Value): void;

    hasValue2(): boolean;
    clearValue2(): void;
    getValue2(): CLValueInstance.Value | undefined;
    setValue2(value?: CLValueInstance.Value): void;

    hasValue3(): boolean;
    clearValue3(): void;
    getValue3(): CLValueInstance.Value | undefined;
    setValue3(value?: CLValueInstance.Value): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tuple3.AsObject;
    static toObject(includeInstance: boolean, msg: Tuple3): Tuple3.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Tuple3,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Tuple3;
    static deserializeBinaryFromReader(
      message: Tuple3,
      reader: jspb.BinaryReader
    ): Tuple3;
  }

  export namespace Tuple3 {
    export type AsObject = {
      value1?: CLValueInstance.Value.AsObject;
      value2?: CLValueInstance.Value.AsObject;
      value3?: CLValueInstance.Value.AsObject;
    };
  }
}

export class ContractWasm extends jspb.Message {
  getWasm(): Uint8Array | string;
  getWasm_asU8(): Uint8Array;
  getWasm_asB64(): string;
  setWasm(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractWasm.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ContractWasm
  ): ContractWasm.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ContractWasm,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ContractWasm;
  static deserializeBinaryFromReader(
    message: ContractWasm,
    reader: jspb.BinaryReader
  ): ContractWasm;
}

export namespace ContractWasm {
  export type AsObject = {
    wasm: Uint8Array | string;
  };
}

export class StoredValue extends jspb.Message {
  hasClValue(): boolean;
  clearClValue(): void;
  getClValue(): CLValue | undefined;
  setClValue(value?: CLValue): void;

  hasAccount(): boolean;
  clearAccount(): void;
  getAccount(): Account | undefined;
  setAccount(value?: Account): void;

  hasContract(): boolean;
  clearContract(): void;
  getContract(): Contract | undefined;
  setContract(value?: Contract): void;

  hasContractPackage(): boolean;
  clearContractPackage(): void;
  getContractPackage(): ContractPackage | undefined;
  setContractPackage(value?: ContractPackage): void;

  hasContractWasm(): boolean;
  clearContractWasm(): void;
  getContractWasm(): ContractWasm | undefined;
  setContractWasm(value?: ContractWasm): void;

  getVariantsCase(): StoredValue.VariantsCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StoredValue.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StoredValue
  ): StoredValue.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StoredValue,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StoredValue;
  static deserializeBinaryFromReader(
    message: StoredValue,
    reader: jspb.BinaryReader
  ): StoredValue;
}

export namespace StoredValue {
  export type AsObject = {
    clValue?: CLValue.AsObject;
    account?: Account.AsObject;
    contract?: Contract.AsObject;
    contractPackage?: ContractPackage.AsObject;
    contractWasm?: ContractWasm.AsObject;
  };

  export enum VariantsCase {
    VARIANTS_NOT_SET = 0,
    CL_VALUE = 1,
    ACCOUNT = 2,
    CONTRACT = 3,
    CONTRACT_PACKAGE = 4,
    CONTRACT_WASM = 5
  }
}

export class StoredValueInstance extends jspb.Message {
  hasClValue(): boolean;
  clearClValue(): void;
  getClValue(): CLValueInstance | undefined;
  setClValue(value?: CLValueInstance): void;

  hasAccount(): boolean;
  clearAccount(): void;
  getAccount(): Account | undefined;
  setAccount(value?: Account): void;

  hasContract(): boolean;
  clearContract(): void;
  getContract(): Contract | undefined;
  setContract(value?: Contract): void;

  hasContractPackage(): boolean;
  clearContractPackage(): void;
  getContractPackage(): ContractPackage | undefined;
  setContractPackage(value?: ContractPackage): void;

  hasContractWasm(): boolean;
  clearContractWasm(): void;
  getContractWasm(): ContractWasm | undefined;
  setContractWasm(value?: ContractWasm): void;

  getValueCase(): StoredValueInstance.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StoredValueInstance.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StoredValueInstance
  ): StoredValueInstance.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StoredValueInstance,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StoredValueInstance;
  static deserializeBinaryFromReader(
    message: StoredValueInstance,
    reader: jspb.BinaryReader
  ): StoredValueInstance;
}

export namespace StoredValueInstance {
  export type AsObject = {
    clValue?: CLValueInstance.AsObject;
    account?: Account.AsObject;
    contract?: Contract.AsObject;
    contractPackage?: ContractPackage.AsObject;
    contractWasm?: ContractWasm.AsObject;
  };

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    CL_VALUE = 1,
    ACCOUNT = 2,
    CONTRACT = 3,
    CONTRACT_PACKAGE = 4,
    CONTRACT_WASM = 5
  }
}

export class Value extends jspb.Message {
  hasIntValue(): boolean;
  clearIntValue(): void;
  getIntValue(): number;
  setIntValue(value: number): void;

  hasBytesValue(): boolean;
  clearBytesValue(): void;
  getBytesValue(): Uint8Array | string;
  getBytesValue_asU8(): Uint8Array;
  getBytesValue_asB64(): string;
  setBytesValue(value: Uint8Array | string): void;

  hasIntList(): boolean;
  clearIntList(): void;
  getIntList(): IntList | undefined;
  setIntList(value?: IntList): void;

  hasStringValue(): boolean;
  clearStringValue(): void;
  getStringValue(): string;
  setStringValue(value: string): void;

  hasAccount(): boolean;
  clearAccount(): void;
  getAccount(): Account | undefined;
  setAccount(value?: Account): void;

  hasContract(): boolean;
  clearContract(): void;
  getContract(): Contract | undefined;
  setContract(value?: Contract): void;

  hasStringList(): boolean;
  clearStringList(): void;
  getStringList(): StringList | undefined;
  setStringList(value?: StringList): void;

  hasNamedKey(): boolean;
  clearNamedKey(): void;
  getNamedKey(): NamedKey | undefined;
  setNamedKey(value?: NamedKey): void;

  hasBigInt(): boolean;
  clearBigInt(): void;
  getBigInt(): BigInt | undefined;
  setBigInt(value?: BigInt): void;

  hasKey(): boolean;
  clearKey(): void;
  getKey(): Key | undefined;
  setKey(value?: Key): void;

  hasUnit(): boolean;
  clearUnit(): void;
  getUnit(): Unit | undefined;
  setUnit(value?: Unit): void;

  hasLongValue(): boolean;
  clearLongValue(): void;
  getLongValue(): number;
  setLongValue(value: number): void;

  getValueCase(): Value.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Value.AsObject;
  static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
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
    intValue: number;
    bytesValue: Uint8Array | string;
    intList?: IntList.AsObject;
    stringValue: string;
    account?: Account.AsObject;
    contract?: Contract.AsObject;
    stringList?: StringList.AsObject;
    namedKey?: NamedKey.AsObject;
    bigInt?: BigInt.AsObject;
    key?: Key.AsObject;
    unit?: Unit.AsObject;
    longValue: number;
  };

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    INT_VALUE = 1,
    BYTES_VALUE = 2,
    INT_LIST = 3,
    STRING_VALUE = 4,
    ACCOUNT = 5,
    CONTRACT = 6,
    STRING_LIST = 7,
    NAMED_KEY = 8,
    BIG_INT = 9,
    KEY = 10,
    UNIT = 11,
    LONG_VALUE = 12
  }
}

export class IntList extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<number>;
  setValuesList(value: Array<number>): void;
  addValues(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntList.AsObject;
  static toObject(includeInstance: boolean, msg: IntList): IntList.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: IntList,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): IntList;
  static deserializeBinaryFromReader(
    message: IntList,
    reader: jspb.BinaryReader
  ): IntList;
}

export namespace IntList {
  export type AsObject = {
    valuesList: Array<number>;
  };
}

export class StringList extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): void;
  addValues(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringList.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: StringList
  ): StringList.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: StringList,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): StringList;
  static deserializeBinaryFromReader(
    message: StringList,
    reader: jspb.BinaryReader
  ): StringList;
}

export namespace StringList {
  export type AsObject = {
    valuesList: Array<string>;
  };
}

export class BigInt extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  getBitWidth(): number;
  setBitWidth(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BigInt.AsObject;
  static toObject(includeInstance: boolean, msg: BigInt): BigInt.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BigInt,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BigInt;
  static deserializeBinaryFromReader(
    message: BigInt,
    reader: jspb.BinaryReader
  ): BigInt;
}

export namespace BigInt {
  export type AsObject = {
    value: string;
    bitWidth: number;
  };
}

export class Key extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): Key.Address | undefined;
  setAddress(value?: Key.Address): void;

  hasHash(): boolean;
  clearHash(): void;
  getHash(): Key.Hash | undefined;
  setHash(value?: Key.Hash): void;

  hasUref(): boolean;
  clearUref(): void;
  getUref(): Key.URef | undefined;
  setUref(value?: Key.URef): void;

  getValueCase(): Key.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Key.AsObject;
  static toObject(includeInstance: boolean, msg: Key): Key.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(message: Key, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Key;
  static deserializeBinaryFromReader(
    message: Key,
    reader: jspb.BinaryReader
  ): Key;
}

export namespace Key {
  export type AsObject = {
    address?: Key.Address.AsObject;
    hash?: Key.Hash.AsObject;
    uref?: Key.URef.AsObject;
  };

  export class Address extends jspb.Message {
    getAccount(): Uint8Array | string;
    getAccount_asU8(): Uint8Array;
    getAccount_asB64(): string;
    setAccount(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Address.AsObject;
    static toObject(includeInstance: boolean, msg: Address): Address.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Address,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Address;
    static deserializeBinaryFromReader(
      message: Address,
      reader: jspb.BinaryReader
    ): Address;
  }

  export namespace Address {
    export type AsObject = {
      account: Uint8Array | string;
    };
  }

  export class Hash extends jspb.Message {
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Hash.AsObject;
    static toObject(includeInstance: boolean, msg: Hash): Hash.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Hash,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Hash;
    static deserializeBinaryFromReader(
      message: Hash,
      reader: jspb.BinaryReader
    ): Hash;
  }

  export namespace Hash {
    export type AsObject = {
      hash: Uint8Array | string;
    };
  }

  export class URef extends jspb.Message {
    getUref(): Uint8Array | string;
    getUref_asU8(): Uint8Array;
    getUref_asB64(): string;
    setUref(value: Uint8Array | string): void;

    getAccessRights(): Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap];
    setAccessRights(
      value: Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap]
    ): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): URef.AsObject;
    static toObject(includeInstance: boolean, msg: URef): URef.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: URef,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): URef;
    static deserializeBinaryFromReader(
      message: URef,
      reader: jspb.BinaryReader
    ): URef;
  }

  export namespace URef {
    export type AsObject = {
      uref: Uint8Array | string;
      accessRights: Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap];
    };

    export interface AccessRightsMap {
      NONE: 0;
      READ: 1;
      WRITE: 2;
      ADD: 4;
      READ_ADD: 5;
      READ_WRITE: 3;
      ADD_WRITE: 6;
      READ_ADD_WRITE: 7;
    }

    export const AccessRights: AccessRightsMap;
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    ADDRESS = 1,
    HASH = 2,
    UREF = 3
  }
}

export class NamedKey extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasKey(): boolean;
  clearKey(): void;
  getKey(): Key | undefined;
  setKey(value?: Key): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NamedKey.AsObject;
  static toObject(includeInstance: boolean, msg: NamedKey): NamedKey.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: NamedKey,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): NamedKey;
  static deserializeBinaryFromReader(
    message: NamedKey,
    reader: jspb.BinaryReader
  ): NamedKey;
}

export namespace NamedKey {
  export type AsObject = {
    name: string;
    key?: Key.AsObject;
  };
}

export class Account extends jspb.Message {
  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): void;

  hasMainPurse(): boolean;
  clearMainPurse(): void;
  getMainPurse(): Key.URef | undefined;
  setMainPurse(value?: Key.URef): void;

  clearNamedKeysList(): void;
  getNamedKeysList(): Array<NamedKey>;
  setNamedKeysList(value: Array<NamedKey>): void;
  addNamedKeys(value?: NamedKey, index?: number): NamedKey;

  clearAssociatedKeysList(): void;
  getAssociatedKeysList(): Array<Account.AssociatedKey>;
  setAssociatedKeysList(value: Array<Account.AssociatedKey>): void;
  addAssociatedKeys(
    value?: Account.AssociatedKey,
    index?: number
  ): Account.AssociatedKey;

  hasActionThresholds(): boolean;
  clearActionThresholds(): void;
  getActionThresholds(): Account.ActionThresholds | undefined;
  setActionThresholds(value?: Account.ActionThresholds): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Account.AsObject;
  static toObject(includeInstance: boolean, msg: Account): Account.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Account,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Account;
  static deserializeBinaryFromReader(
    message: Account,
    reader: jspb.BinaryReader
  ): Account;
}

export namespace Account {
  export type AsObject = {
    publicKey: Uint8Array | string;
    mainPurse?: Key.URef.AsObject;
    namedKeysList: Array<NamedKey.AsObject>;
    associatedKeysList: Array<Account.AssociatedKey.AsObject>;
    actionThresholds?: Account.ActionThresholds.AsObject;
  };

  export class AssociatedKey extends jspb.Message {
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): void;

    getWeight(): number;
    setWeight(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssociatedKey.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: AssociatedKey
    ): AssociatedKey.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: AssociatedKey,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): AssociatedKey;
    static deserializeBinaryFromReader(
      message: AssociatedKey,
      reader: jspb.BinaryReader
    ): AssociatedKey;
  }

  export namespace AssociatedKey {
    export type AsObject = {
      publicKey: Uint8Array | string;
      weight: number;
    };
  }

  export class ActionThresholds extends jspb.Message {
    getDeploymentThreshold(): number;
    setDeploymentThreshold(value: number): void;

    getKeyManagementThreshold(): number;
    setKeyManagementThreshold(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ActionThresholds.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: ActionThresholds
    ): ActionThresholds.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: ActionThresholds,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): ActionThresholds;
    static deserializeBinaryFromReader(
      message: ActionThresholds,
      reader: jspb.BinaryReader
    ): ActionThresholds;
  }

  export namespace ActionThresholds {
    export type AsObject = {
      deploymentThreshold: number;
      keyManagementThreshold: number;
    };
  }
}

export class Unit extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Unit.AsObject;
  static toObject(includeInstance: boolean, msg: Unit): Unit.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Unit,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Unit;
  static deserializeBinaryFromReader(
    message: Unit,
    reader: jspb.BinaryReader
  ): Unit;
}

export namespace Unit {
  export type AsObject = {};
}

export class ProtocolVersion extends jspb.Message {
  getMajor(): number;
  setMajor(value: number): void;

  getMinor(): number;
  setMinor(value: number): void;

  getPatch(): number;
  setPatch(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProtocolVersion.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ProtocolVersion
  ): ProtocolVersion.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ProtocolVersion,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ProtocolVersion;
  static deserializeBinaryFromReader(
    message: ProtocolVersion,
    reader: jspb.BinaryReader
  ): ProtocolVersion;
}

export namespace ProtocolVersion {
  export type AsObject = {
    major: number;
    minor: number;
    patch: number;
  };
}

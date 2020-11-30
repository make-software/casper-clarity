// package: io.casperlabs.casper.consensus.info
// file: io/casperlabs/casper/consensus/info.proto

import * as jspb from 'google-protobuf';
import * as io_casperlabs_casper_consensus_consensus_pb from '../../../../io/casperlabs/casper/consensus/consensus_pb';

export class BlockInfo extends jspb.Message {
  hasSummary(): boolean;
  clearSummary(): void;
  getSummary():
    | io_casperlabs_casper_consensus_consensus_pb.BlockSummary
    | undefined;
  setSummary(
    value?: io_casperlabs_casper_consensus_consensus_pb.BlockSummary
  ): void;

  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): BlockInfo.Status | undefined;
  setStatus(value?: BlockInfo.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockInfo.AsObject;
  static toObject(includeInstance: boolean, msg: BlockInfo): BlockInfo.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: BlockInfo,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): BlockInfo;
  static deserializeBinaryFromReader(
    message: BlockInfo,
    reader: jspb.BinaryReader
  ): BlockInfo;
}

export namespace BlockInfo {
  export type AsObject = {
    summary?: io_casperlabs_casper_consensus_consensus_pb.BlockSummary.AsObject;
    status?: BlockInfo.Status.AsObject;
  };

  export class Status extends jspb.Message {
    hasStats(): boolean;
    clearStats(): void;
    getStats(): BlockInfo.Status.Stats | undefined;
    setStats(value?: BlockInfo.Status.Stats): void;

    clearChildHashesList(): void;
    getChildHashesList(): Array<Uint8Array | string>;
    getChildHashesList_asU8(): Array<Uint8Array>;
    getChildHashesList_asB64(): Array<string>;
    setChildHashesList(value: Array<Uint8Array | string>): void;
    addChildHashes(
      value: Uint8Array | string,
      index?: number
    ): Uint8Array | string;

    getFinality(): BlockInfo.Status.FinalityMap[keyof BlockInfo.Status.FinalityMap];
    setFinality(
      value: BlockInfo.Status.FinalityMap[keyof BlockInfo.Status.FinalityMap]
    ): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Status.AsObject;
    static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Status,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Status;
    static deserializeBinaryFromReader(
      message: Status,
      reader: jspb.BinaryReader
    ): Status;
  }

  export namespace Status {
    export type AsObject = {
      stats?: BlockInfo.Status.Stats.AsObject;
      childHashesList: Array<Uint8Array | string>;
      finality: BlockInfo.Status.FinalityMap[keyof BlockInfo.Status.FinalityMap];
    };

    export class Stats extends jspb.Message {
      getBlockSizeBytes(): number;
      setBlockSizeBytes(value: number): void;

      getDeployErrorCount(): number;
      setDeployErrorCount(value: number): void;

      getDeployCostTotal(): number;
      setDeployCostTotal(value: number): void;

      getDeployGasPriceAvg(): number;
      setDeployGasPriceAvg(value: number): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Stats.AsObject;
      static toObject(includeInstance: boolean, msg: Stats): Stats.AsObject;
      static extensions: {
        [key: number]: jspb.ExtensionFieldInfo<jspb.Message>;
      };
      static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
      };
      static serializeBinaryToWriter(
        message: Stats,
        writer: jspb.BinaryWriter
      ): void;
      static deserializeBinary(bytes: Uint8Array): Stats;
      static deserializeBinaryFromReader(
        message: Stats,
        reader: jspb.BinaryReader
      ): Stats;
    }

    export namespace Stats {
      export type AsObject = {
        blockSizeBytes: number;
        deployErrorCount: number;
        deployCostTotal: number;
        deployGasPriceAvg: number;
      };
    }

    export interface FinalityMap {
      UNDECIDED: 0;
      FINALIZED: 1;
      ORPHANED: 2;
    }

    export const Finality: FinalityMap;
  }

  export interface ViewMap {
    BASIC: 0;
    FULL: 1;
  }

  export const View: ViewMap;
}

export class DeployInfo extends jspb.Message {
  hasDeploy(): boolean;
  clearDeploy(): void;
  getDeploy(): io_casperlabs_casper_consensus_consensus_pb.Deploy | undefined;
  setDeploy(value?: io_casperlabs_casper_consensus_consensus_pb.Deploy): void;

  clearProcessingResultsList(): void;
  getProcessingResultsList(): Array<DeployInfo.ProcessingResult>;
  setProcessingResultsList(value: Array<DeployInfo.ProcessingResult>): void;
  addProcessingResults(
    value?: DeployInfo.ProcessingResult,
    index?: number
  ): DeployInfo.ProcessingResult;

  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): DeployInfo.Status | undefined;
  setStatus(value?: DeployInfo.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployInfo.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DeployInfo
  ): DeployInfo.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DeployInfo,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): DeployInfo;
  static deserializeBinaryFromReader(
    message: DeployInfo,
    reader: jspb.BinaryReader
  ): DeployInfo;
}

export namespace DeployInfo {
  export type AsObject = {
    deploy?: io_casperlabs_casper_consensus_consensus_pb.Deploy.AsObject;
    processingResultsList: Array<DeployInfo.ProcessingResult.AsObject>;
    status?: DeployInfo.Status.AsObject;
  };

  export class ProcessingResult extends jspb.Message {
    hasBlockInfo(): boolean;
    clearBlockInfo(): void;
    getBlockInfo(): BlockInfo | undefined;
    setBlockInfo(value?: BlockInfo): void;

    getCost(): number;
    setCost(value: number): void;

    getIsError(): boolean;
    setIsError(value: boolean): void;

    getErrorMessage(): string;
    setErrorMessage(value: string): void;

    getStage(): number;
    setStage(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProcessingResult.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: ProcessingResult
    ): ProcessingResult.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: ProcessingResult,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): ProcessingResult;
    static deserializeBinaryFromReader(
      message: ProcessingResult,
      reader: jspb.BinaryReader
    ): ProcessingResult;
  }

  export namespace ProcessingResult {
    export type AsObject = {
      blockInfo?: BlockInfo.AsObject;
      cost: number;
      isError: boolean;
      errorMessage: string;
      stage: number;
    };
  }

  export class Status extends jspb.Message {
    getState(): DeployInfo.StateMap[keyof DeployInfo.StateMap];
    setState(value: DeployInfo.StateMap[keyof DeployInfo.StateMap]): void;

    getMessage(): string;
    setMessage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Status.AsObject;
    static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: Status,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): Status;
    static deserializeBinaryFromReader(
      message: Status,
      reader: jspb.BinaryReader
    ): Status;
  }

  export namespace Status {
    export type AsObject = {
      state: DeployInfo.StateMap[keyof DeployInfo.StateMap];
      message: string;
    };
  }

  export interface ViewMap {
    BASIC: 0;
    FULL: 1;
  }

  export const View: ViewMap;

  export interface StateMap {
    UNDEFINED: 0;
    PENDING: 1;
    PROCESSED: 2;
    FINALIZED: 3;
    DISCARDED: 4;
  }

  export const State: StateMap;
}

export class Event extends jspb.Message {
  getEventId(): number;
  setEventId(value: number): void;

  hasBlockAdded(): boolean;
  clearBlockAdded(): void;
  getBlockAdded(): Event.BlockAdded | undefined;
  setBlockAdded(value?: Event.BlockAdded): void;

  hasNewFinalizedBlock(): boolean;
  clearNewFinalizedBlock(): void;
  getNewFinalizedBlock(): Event.NewFinalizedBlock | undefined;
  setNewFinalizedBlock(value?: Event.NewFinalizedBlock): void;

  hasDeployAdded(): boolean;
  clearDeployAdded(): void;
  getDeployAdded(): Event.DeployAdded | undefined;
  setDeployAdded(value?: Event.DeployAdded): void;

  hasDeployRequeued(): boolean;
  clearDeployRequeued(): void;
  getDeployRequeued(): Event.DeployRequeued | undefined;
  setDeployRequeued(value?: Event.DeployRequeued): void;

  hasDeployDiscarded(): boolean;
  clearDeployDiscarded(): void;
  getDeployDiscarded(): Event.DeployDiscarded | undefined;
  setDeployDiscarded(value?: Event.DeployDiscarded): void;

  hasDeployProcessed(): boolean;
  clearDeployProcessed(): void;
  getDeployProcessed(): Event.DeployProcessed | undefined;
  setDeployProcessed(value?: Event.DeployProcessed): void;

  hasDeployFinalized(): boolean;
  clearDeployFinalized(): void;
  getDeployFinalized(): Event.DeployFinalized | undefined;
  setDeployFinalized(value?: Event.DeployFinalized): void;

  hasDeployOrphaned(): boolean;
  clearDeployOrphaned(): void;
  getDeployOrphaned(): Event.DeployOrphaned | undefined;
  setDeployOrphaned(value?: Event.DeployOrphaned): void;

  getValueCase(): Event.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Event,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(
    message: Event,
    reader: jspb.BinaryReader
  ): Event;
}

export namespace Event {
  export type AsObject = {
    eventId: number;
    blockAdded?: Event.BlockAdded.AsObject;
    newFinalizedBlock?: Event.NewFinalizedBlock.AsObject;
    deployAdded?: Event.DeployAdded.AsObject;
    deployRequeued?: Event.DeployRequeued.AsObject;
    deployDiscarded?: Event.DeployDiscarded.AsObject;
    deployProcessed?: Event.DeployProcessed.AsObject;
    deployFinalized?: Event.DeployFinalized.AsObject;
    deployOrphaned?: Event.DeployOrphaned.AsObject;
  };

  export class BlockAdded extends jspb.Message {
    hasBlock(): boolean;
    clearBlock(): void;
    getBlock(): BlockInfo | undefined;
    setBlock(value?: BlockInfo): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockAdded.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: BlockAdded
    ): BlockAdded.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: BlockAdded,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): BlockAdded;
    static deserializeBinaryFromReader(
      message: BlockAdded,
      reader: jspb.BinaryReader
    ): BlockAdded;
  }

  export namespace BlockAdded {
    export type AsObject = {
      block?: BlockInfo.AsObject;
    };
  }

  export class NewFinalizedBlock extends jspb.Message {
    getBlockHash(): Uint8Array | string;
    getBlockHash_asU8(): Uint8Array;
    getBlockHash_asB64(): string;
    setBlockHash(value: Uint8Array | string): void;

    clearIndirectlyFinalizedBlockHashesList(): void;
    getIndirectlyFinalizedBlockHashesList(): Array<Uint8Array | string>;
    getIndirectlyFinalizedBlockHashesList_asU8(): Array<Uint8Array>;
    getIndirectlyFinalizedBlockHashesList_asB64(): Array<string>;
    setIndirectlyFinalizedBlockHashesList(
      value: Array<Uint8Array | string>
    ): void;
    addIndirectlyFinalizedBlockHashes(
      value: Uint8Array | string,
      index?: number
    ): Uint8Array | string;

    clearIndirectlyOrphanedBlockHashesList(): void;
    getIndirectlyOrphanedBlockHashesList(): Array<Uint8Array | string>;
    getIndirectlyOrphanedBlockHashesList_asU8(): Array<Uint8Array>;
    getIndirectlyOrphanedBlockHashesList_asB64(): Array<string>;
    setIndirectlyOrphanedBlockHashesList(
      value: Array<Uint8Array | string>
    ): void;
    addIndirectlyOrphanedBlockHashes(
      value: Uint8Array | string,
      index?: number
    ): Uint8Array | string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NewFinalizedBlock.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: NewFinalizedBlock
    ): NewFinalizedBlock.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: NewFinalizedBlock,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): NewFinalizedBlock;
    static deserializeBinaryFromReader(
      message: NewFinalizedBlock,
      reader: jspb.BinaryReader
    ): NewFinalizedBlock;
  }

  export namespace NewFinalizedBlock {
    export type AsObject = {
      blockHash: Uint8Array | string;
      indirectlyFinalizedBlockHashesList: Array<Uint8Array | string>;
      indirectlyOrphanedBlockHashesList: Array<Uint8Array | string>;
    };
  }

  export class DeployAdded extends jspb.Message {
    hasDeploy(): boolean;
    clearDeploy(): void;
    getDeploy(): io_casperlabs_casper_consensus_consensus_pb.Deploy | undefined;
    setDeploy(value?: io_casperlabs_casper_consensus_consensus_pb.Deploy): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeployAdded.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: DeployAdded
    ): DeployAdded.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: DeployAdded,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): DeployAdded;
    static deserializeBinaryFromReader(
      message: DeployAdded,
      reader: jspb.BinaryReader
    ): DeployAdded;
  }

  export namespace DeployAdded {
    export type AsObject = {
      deploy?: io_casperlabs_casper_consensus_consensus_pb.Deploy.AsObject;
    };
  }

  export class DeployDiscarded extends jspb.Message {
    hasDeploy(): boolean;
    clearDeploy(): void;
    getDeploy(): io_casperlabs_casper_consensus_consensus_pb.Deploy | undefined;
    setDeploy(value?: io_casperlabs_casper_consensus_consensus_pb.Deploy): void;

    getMessage(): string;
    setMessage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeployDiscarded.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: DeployDiscarded
    ): DeployDiscarded.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: DeployDiscarded,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): DeployDiscarded;
    static deserializeBinaryFromReader(
      message: DeployDiscarded,
      reader: jspb.BinaryReader
    ): DeployDiscarded;
  }

  export namespace DeployDiscarded {
    export type AsObject = {
      deploy?: io_casperlabs_casper_consensus_consensus_pb.Deploy.AsObject;
      message: string;
    };
  }

  export class DeployRequeued extends jspb.Message {
    hasDeploy(): boolean;
    clearDeploy(): void;
    getDeploy(): io_casperlabs_casper_consensus_consensus_pb.Deploy | undefined;
    setDeploy(value?: io_casperlabs_casper_consensus_consensus_pb.Deploy): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeployRequeued.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: DeployRequeued
    ): DeployRequeued.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: DeployRequeued,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): DeployRequeued;
    static deserializeBinaryFromReader(
      message: DeployRequeued,
      reader: jspb.BinaryReader
    ): DeployRequeued;
  }

  export namespace DeployRequeued {
    export type AsObject = {
      deploy?: io_casperlabs_casper_consensus_consensus_pb.Deploy.AsObject;
    };
  }

  export class DeployProcessed extends jspb.Message {
    getBlockHash(): Uint8Array | string;
    getBlockHash_asU8(): Uint8Array;
    getBlockHash_asB64(): string;
    setBlockHash(value: Uint8Array | string): void;

    hasProcessedDeploy(): boolean;
    clearProcessedDeploy(): void;
    getProcessedDeploy():
      | io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy
      | undefined;
    setProcessedDeploy(
      value?: io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy
    ): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeployProcessed.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: DeployProcessed
    ): DeployProcessed.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: DeployProcessed,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): DeployProcessed;
    static deserializeBinaryFromReader(
      message: DeployProcessed,
      reader: jspb.BinaryReader
    ): DeployProcessed;
  }

  export namespace DeployProcessed {
    export type AsObject = {
      blockHash: Uint8Array | string;
      processedDeploy?: io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy.AsObject;
    };
  }

  export class DeployFinalized extends jspb.Message {
    getBlockHash(): Uint8Array | string;
    getBlockHash_asU8(): Uint8Array;
    getBlockHash_asB64(): string;
    setBlockHash(value: Uint8Array | string): void;

    hasProcessedDeploy(): boolean;
    clearProcessedDeploy(): void;
    getProcessedDeploy():
      | io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy
      | undefined;
    setProcessedDeploy(
      value?: io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy
    ): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeployFinalized.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: DeployFinalized
    ): DeployFinalized.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: DeployFinalized,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): DeployFinalized;
    static deserializeBinaryFromReader(
      message: DeployFinalized,
      reader: jspb.BinaryReader
    ): DeployFinalized;
  }

  export namespace DeployFinalized {
    export type AsObject = {
      blockHash: Uint8Array | string;
      processedDeploy?: io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy.AsObject;
    };
  }

  export class DeployOrphaned extends jspb.Message {
    getBlockHash(): Uint8Array | string;
    getBlockHash_asU8(): Uint8Array;
    getBlockHash_asB64(): string;
    setBlockHash(value: Uint8Array | string): void;

    hasDeployInfo(): boolean;
    clearDeployInfo(): void;
    getDeployInfo(): DeployInfo | undefined;
    setDeployInfo(value?: DeployInfo): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeployOrphaned.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: DeployOrphaned
    ): DeployOrphaned.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: DeployOrphaned,
      writer: jspb.BinaryWriter
    ): void;
    static deserializeBinary(bytes: Uint8Array): DeployOrphaned;
    static deserializeBinaryFromReader(
      message: DeployOrphaned,
      reader: jspb.BinaryReader
    ): DeployOrphaned;
  }

  export namespace DeployOrphaned {
    export type AsObject = {
      blockHash: Uint8Array | string;
      deployInfo?: DeployInfo.AsObject;
    };
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    BLOCK_ADDED = 1,
    NEW_FINALIZED_BLOCK = 2,
    DEPLOY_ADDED = 3,
    DEPLOY_REQUEUED = 4,
    DEPLOY_DISCARDED = 5,
    DEPLOY_PROCESSED = 6,
    DEPLOY_FINALIZED = 7,
    DEPLOY_ORPHANED = 8
  }
}

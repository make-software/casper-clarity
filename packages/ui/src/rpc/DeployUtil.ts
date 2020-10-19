/**
 * Util methods for making Deploy message
 *
 * @packageDocumentation
 */
import { concat } from '@ethersproject/bytes';
import blake from 'blakejs';
import { Option } from './option';
import * as nacl from 'tweetnacl-ts';
import { encodeBase16 } from 'casperlabs-sdk';
import { CLTypeHelper, PublicKey, ToBytes, U32 } from './CLValue';
import {
  toBytesArrayU8,
  toBytesBytesArray,
  toBytesDeployHash,
  toBytesString,
  toBytesU64,
  toBytesVecT
} from './byterepr';

type ByteArray = Uint8Array;

export interface DeployHeader {
  account: ByteArray;
  timestamp: number;
  ttl: number;
  gasPrice: number;
  bodyHash: ByteArray;
  dependencies: ByteArray[];
  chainName: string;
}

class DeployHash implements ToBytes {
  constructor(private hash: ByteArray) {}

  toBytes(): ByteArray {
    return toBytesDeployHash(this.hash);
  }
}

const toBytesDeployHeader = (deployHeader: DeployHeader) => {
  return concat([
    PublicKey.fromEd25519(deployHeader.account).toBytes(),
    toBytesU64(deployHeader.timestamp),
    toBytesU64(deployHeader.ttl),
    toBytesU64(deployHeader.gasPrice),
    toBytesDeployHash(deployHeader.bodyHash),
    toBytesVecT(deployHeader.dependencies.map(d => new DeployHash(d))),
    toBytesString(deployHeader.chainName)
  ]);
};

export interface Deploy {
  hash: ByteArray;
  header: DeployHeader;
  payment: ExecutableDeployItem;
  session: ExecutableDeployItem;
  approvals: Approval[];
}

export class Approval {
  signer: ByteArray;
  signature: ByteArray;
}

export abstract class ExecutableDeployItem implements ToBytes {
  abstract tag: number;

  abstract toBytes(): ByteArray;
}

export class ModuleBytes extends ExecutableDeployItem {
  tag = 0;
  constructor(private moduleBytes: Uint8Array, private args: Uint8Array) {
    super();
  }

  toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesArrayU8(this.moduleBytes),
      toBytesArrayU8(this.args)
    ]);
  }
}

export class StoredContractByHash extends ExecutableDeployItem {
  tag = 1;
  hash: Uint8Array;
  entryPoint: string;
  args: Uint8Array;

  toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesBytesArray(this.hash),
      toBytesString(this.entryPoint),
      toBytesArrayU8(this.args)
    ]);
  }
}

export class StoredContractByName extends ExecutableDeployItem {
  name: string;
  entryPoint: string;
  args: Uint8Array;
  tag = 2;

  toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesString(this.name),
      toBytesString(this.entryPoint),
      toBytesArrayU8(this.args)
    ]);
  }
}

export class StoredVersionedContractByName extends ExecutableDeployItem {
  name: string;
  version: number | null;
  entryPoint: string;
  args: Uint8Array;
  tag = 4;

  toBytes(): ByteArray {
    let serializedVersion;
    if (this.version === null) {
      serializedVersion = new Option(null, CLTypeHelper.u32());
    } else {
      serializedVersion = new Option(new U32(this.version as number));
    }
    return concat([
      Uint8Array.from([this.tag]),
      toBytesString(this.name),
      serializedVersion.toBytes(),
      toBytesString(this.entryPoint),
      this.args
    ]);
  }
}

export class StoredVersionedContractByHash extends ExecutableDeployItem {
  hash: Uint8Array;
  version: number | null;
  entryPoint: string;
  args: ByteArray;
  tag = 3;

  toBytes(): ByteArray {
    let serializedVersion;
    if (this.version === null) {
      serializedVersion = new Option(null, CLTypeHelper.u32());
    } else {
      serializedVersion = new Option(new U32(this.version as number));
    }
    return concat([
      Uint8Array.from([this.tag]),
      toBytesBytesArray(this.hash),
      serializedVersion.toBytes(),
      toBytesString(this.entryPoint),
      this.args
    ]);
  }
}

export class Transfer extends ExecutableDeployItem {
  args: ByteArray;
  tag = 5;

  toBytes(): ByteArray {
    return concat([Uint8Array.from([this.tag]), this.args]);
  }
}

const serializeHeader = (deployHeader: DeployHeader) => {
  return toBytesDeployHeader(deployHeader);
};

const serializeBody = (
  payment: ExecutableDeployItem,
  session: ExecutableDeployItem
) => {
  return concat([payment.toBytes(), session.toBytes()]);
};

/**
 * Supported contract type
 */
export enum ContractType {
  WASM = 'WASM',
  Hash = 'Hash',
  Name = 'Name'
}

/**
 * Makes Deploy message
 */
export function makeDeploy(
  session: ExecutableDeployItem,
  payment: ExecutableDeployItem,
  accountPublicKeyHash: ByteArray,
  chainName: string,
  gasPrice: number = 10,
  ttl: number = 3600000,
  dependencies: Uint8Array[] = [],
  timestamp?: number
): Deploy {
  const serializedBody = serializeBody(session, payment);
  const bodyHash = blake.blake2b(serializedBody, null, 32);
  const uniqueDependencies = dependencies.filter(
    d =>
      dependencies.filter(t => encodeBase16(d) === encodeBase16(t)).length < 2
  );
  if (!timestamp) {
    timestamp = Date.now();
  }
  const header: DeployHeader = {
    account: accountPublicKeyHash,
    bodyHash,
    chainName,
    dependencies: uniqueDependencies,
    gasPrice: gasPrice,
    timestamp: timestamp,
    ttl
  };
  const serializedHeader = serializeHeader(header);
  const deployHash = blake.blake2b(serializedHeader, null, 32);
  return {
    hash: deployHash,
    header,
    payment,
    session,
    approvals: []
  };
}

/**
 * Uses the provided key pair to sign the Deploy message
 *
 * @param deploy
 * @param signingKeyPair
 */
export const signDeploy = (
  deploy: Deploy,
  signingKeyPair: nacl.SignKeyPair
): Deploy => {
  const approval = new Approval();
  const signature = nacl.sign_detached(deploy.hash, signingKeyPair.secretKey);
  approval.signer = signingKeyPair.publicKey;
  approval.signature = signature;
  deploy.approvals.push(approval);

  return deploy;
};

/**
 * Sets the already generated Ed25519 signature for the Deploy message
 *
 * @param deploy
 * @param sig the Ed25519 signature
 * @param publicKey the public key used to generate the Ed25519 signature
 */
export const setSignature = (
  deploy: Deploy,
  sig: ByteArray,
  publicKey: ByteArray
): Deploy => {
  const approval = new Approval();
  approval.signature = sig;
  approval.signer = publicKey;
  deploy.approvals.push(approval);
  return deploy;
};

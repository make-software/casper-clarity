/**
 * Util methods for making Deploy message
 *
 * @packageDocumentation
 */
import { encode } from '@msgpack/msgpack';
import blake from 'blakejs';
import * as nacl from 'tweetnacl-ts';
import { encodeBase16 } from 'casperlabs-sdk';

export interface DeployHeader {
  account: ByteArray;
  timestamp: number;
  ttl: number;
  gasPrice: number;
  bodyHash: ByteArray;
  dependencies: ByteArray[];
  chainName: string;
}

export interface Deploy {
  hash: ByteArray;
  header: DeployHeader;
  payment: ExecutableDeployItem;
  session: ExecutableDeployItem;
  approval: Approval[];
}

export class Approval {
  signer: ByteArray;
  signature: ByteArray;
}

export type ExecutableDeployItem =
  | ModuleBytes
  | StoredContractByHash
  | StoredContractByName
  | StoredVersionedContractByHash
  | StoredVersionedContractByName
  | Transfer;

export class ModuleBytes {
  moduleBytes: Uint8Array;
  args: Uint8Array;
}

export class StoredContractByHash {
  hash: Uint8Array;
  entryPoint: string;
  args: Uint8Array;
}

export class StoredContractByName {
  name: string;
  entryPoint: string;
  args: Uint8Array;
}

export class StoredVersionedContractByName {
  name: string;
  version: number | null;
  entryPoint: string;
  args: Uint8Array;
}

export class StoredVersionedContractByHash {
  hash: Uint8Array;
  version: number | null;
  entryPoint: string;
  args: ByteArray;
}

export class Transfer {
  args: ByteArray;
}

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
  const serializedBody = encode([session, payment]);
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
  const serializedHeader = encode(header);
  const deployHash = blake.blake2b(serializedHeader, null, 32);
  return {
    hash: deployHash,
    header,
    payment,
    session,
    approval: []
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
  deploy.approval.push(approval);

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
  deploy.approval.push(approval);
  return deploy;
};

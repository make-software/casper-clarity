/**
 * Util methods for making Deploy message
 *
 * @packageDocumentation
 */
import { concat } from '@ethersproject/bytes';
import blake from 'blakejs';
import { Option } from './option';
import * as nacl from 'tweetnacl-ts';
import { encodeBase16 } from './Conversions';
import { CLTypeHelper, CLValue, PublicKey, ToBytes, U32 } from './CLValue';
import {
  toBytesArrayU8,
  toBytesBytesArray,
  toBytesDeployHash,
  toBytesString,
  toBytesU64,
  toBytesVecT
} from './byterepr';
import { RuntimeArgs } from './RuntimeArgs';
import JSBI from 'jsbi';

type ByteArray = Uint8Array;

export interface DeployHeader {
  account: PublicKey;
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
    deployHeader.account.toBytes(),
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
  signer: string;
  signature: string;
}

interface ToJson {
  toJson(): Record<string, any>;
}

export abstract class ExecutableDeployItem implements ToBytes, ToJson {
  abstract tag: number;

  abstract toBytes(): ByteArray;

  abstract toJson(): Record<string, any>;
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

  toJson(): Record<string, any> {
    return {
      ModuleBytes: {
        module_bytes: encodeBase16(this.moduleBytes),
        args: encodeBase16(this.args)
      }
    };
  }
}

export class StoredContractByHash extends ExecutableDeployItem {
  tag = 1;
  constructor(
    private hash: Uint8Array,
    private entryPoint: string,
    private args: Uint8Array
  ) {
    super();
  }

  toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesBytesArray(this.hash),
      toBytesString(this.entryPoint),
      toBytesArrayU8(this.args)
    ]);
  }

  toJson(): Record<string, any> {
    return {
      StoredContractByHash: {
        hash: encodeBase16(this.hash),
        entry_point: this.entryPoint,
        args: encodeBase16(this.args)
      }
    };
  }
}

export class StoredContractByName extends ExecutableDeployItem {
  tag = 2;

  constructor(
    private name: string,
    private entryPoint: string,
    private args: Uint8Array
  ) {
    super();
  }

  toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesString(this.name),
      toBytesString(this.entryPoint),
      toBytesArrayU8(this.args)
    ]);
  }

  toJson(): Record<string, any> {
    return {
      StoredContractByName: {
        name: this.name,
        entry_point: this.entryPoint,
        args: encodeBase16(this.args)
      }
    };
  }
}

export class StoredVersionedContractByName extends ExecutableDeployItem {
  tag = 4;

  constructor(
    private name: string,
    private version: number | null,
    private entryPoint: string,
    private args: Uint8Array
  ) {
    super();
  }

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
      toBytesArrayU8(this.args)
    ]);
  }

  toJson(): Record<string, any> {
    return {
      StoredVersionedContractByName: {
        name: this.name,
        entry_point: this.entryPoint,
        args: encodeBase16(this.args)
      }
    };
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
      toBytesArrayU8(this.args)
    ]);
  }

  toJson(): Record<string, any> {
    return {
      StoredVersionedContractByHash: {
        hash: encodeBase16(this.hash),
        version: this.version,
        entry_point: this.entryPoint,
        args: encodeBase16(this.args)
      }
    };
  }
}

export class Transfer extends ExecutableDeployItem {
  args: ByteArray;
  tag = 5;

  toBytes(): ByteArray {
    return concat([Uint8Array.from([this.tag]), toBytesArrayU8(this.args)]);
  }

  toJson(): Record<string, any> {
    return {
      Transfer: { args: encodeBase16(this.args) }
    };
  }
}

export const serializeHeader = (deployHeader: DeployHeader) => {
  return toBytesDeployHeader(deployHeader);
};

export const serializeBody = (
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
  accountPublicKey: PublicKey,
  chainName: string,
  gasPrice: number = 10,
  ttl: number = 3600000,
  dependencies: Uint8Array[] = [],
  timestamp?: number
): Deploy {
  const serializedBody = serializeBody(payment, session);
  const bodyHash = blake.blake2b(serializedBody, null, 32);
  const uniqueDependencies = dependencies.filter(
    d =>
      dependencies.filter(t => encodeBase16(d) === encodeBase16(t)).length < 2
  );
  if (!timestamp) {
    timestamp = Date.now();
  }
  const header: DeployHeader = {
    account: accountPublicKey,
    bodyHash,
    chainName,
    dependencies: uniqueDependencies,
    gasPrice,
    timestamp,
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
  approval.signer = '01' + encodeBase16(signingKeyPair.publicKey);
  approval.signature = '01' + encodeBase16(signature);
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
  approval.signature = '01' + encodeBase16(sig);
  approval.signer = '01' + encodeBase16(publicKey);
  deploy.approvals.push(approval);
  return deploy;
};

export const standardPayment = (paymentAmount: bigint | JSBI) => {
  const paymentArgs = RuntimeArgs.fromMap({
    amount: CLValue.fromU512(paymentAmount.toString())
  });

  return new ModuleBytes(Uint8Array.from([]), paymentArgs.toBytes());
};

export const deployToJson = (deploy: Deploy) => {
  const header = deploy.header;
  const headerJson = {
    account: header.account.toAccountHash(),
    timestamp: new Date(header.timestamp).toISOString(),
    ttl: '1h',
    gas_price: header.gasPrice,
    body_hash: encodeBase16(header.bodyHash),
    dependencies: header.dependencies.map(it => encodeBase16(it)),
    chain_name: header.chainName
  };
  const json = {
    hash: encodeBase16(deploy.hash),
    header: headerJson,
    payment: deploy.payment.toJson(),
    session: deploy.session.toJson(),
    approvals: deploy.approvals.map(it => {
      return {
        signer: it.signer,
        signature: it.signature
      };
    })
  };
  return { deploy: json };
};

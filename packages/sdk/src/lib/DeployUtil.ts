/**
 * Util methods for making Deploy message
 *
 * @packageDocumentation
 */
import { concat } from '@ethersproject/bytes';
import blake from 'blakejs';
import { Option } from './option';
import { encodeBase16 } from './Conversions';
import humanizeDuration from 'humanize-duration';
import {
  CLTypedAndToBytesHelper,
  CLTypeHelper,
  CLValue,
  PublicKey,
  ToBytes,
  U32
} from './CLValue';
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
import { Keys, URef } from './index';
import { AsymmetricKey } from './Keys';
import { BigNumberish } from '@ethersproject/bignumber';

type ByteArray = Uint8Array;

const shortEnglishHumanizer = humanizeDuration.humanizer({
  spacer: '',
  serialComma: false,
  language: 'shortEn',
  languages: {
    // https://docs.rs/humantime/2.0.1/humantime/fn.parse_duration.html
    shortEn: {
      y: () => 'y',
      mo: () => 'M',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms'
    }
  }
});

/**
 * Return a humanizer duration
 * @param ttl in milliseconds
 */
export const humanizerTTL = (ttl: number) => {
  return shortEnglishHumanizer(ttl);
};

/**
 * The header portion of a Deploy
 */
export interface DeployHeader {
  /**
   * The account within which the deploy will be run.
   */
  account: PublicKey;
  /**
   * When the deploy was created.
   */
  timestamp: number;
  /**
   * How long the deploy will stay valid.
   */
  ttl: number;
  /**
   * Price per gas unit for this deploy.
   */
  gasPrice: number;
  /**
   * Hash of the Wasm code.
   */
  bodyHash: ByteArray;
  /**
   * Other deploys that have to be run before this one.
   */
  dependencies: ByteArray[];
  /**
   * Which chain the deploy is supposed to be run on.
   */
  chainName: string;
}

/**
 * The cryptographic hash of a Deploy.
 */
class DeployHash implements ToBytes {
  constructor(private hash: ByteArray) {}

  public toBytes(): ByteArray {
    return toBytesDeployHash(this.hash);
  }
}

/**
 * Serialized DeployHeader to an array of bytes
 * @param deployHeader
 */
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

/**
 * A deploy containing a smart contract along with the requester's signature(s).
 */
export interface Deploy {
  /**
   * The DeployHash identifying this Deploy
   */
  hash: ByteArray;
  /**
   * The deployHeader
   */
  header: DeployHeader;
  /**
   * The ExecutableDeployItem for payment code.
   */
  payment: ExecutableDeployItem;
  /**
   * the ExecutableDeployItem for session code.
   */
  session: ExecutableDeployItem;
  /**
   * An array of signature and public key of the signers, who approve this deploy
   */
  approvals: Approval[];
}

/**
 * A struct containing a signature and the public key of the signer.
 */
export class Approval {
  public signer: string;
  public signature: string;
}

interface ToJson {
  toJson(): Record<string, any>;
}

export abstract class ExecutableDeployItem implements ToBytes, ToJson {
  public abstract tag: number;

  public abstract toBytes(): ByteArray;

  public abstract toJson(): Record<string, any>;
}

export class ModuleBytes extends ExecutableDeployItem {
  public tag = 0;

  constructor(private moduleBytes: Uint8Array, private args: Uint8Array) {
    super();
  }

  public toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesArrayU8(this.moduleBytes),
      toBytesArrayU8(this.args)
    ]);
  }

  public toJson(): Record<string, any> {
    return {
      ModuleBytes: {
        module_bytes: encodeBase16(this.moduleBytes),
        args: encodeBase16(this.args)
      }
    };
  }
}

export class StoredContractByHash extends ExecutableDeployItem {
  public tag = 1;

  constructor(
    private hash: Uint8Array,
    private entryPoint: string,
    private args: Uint8Array
  ) {
    super();
  }

  public toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesBytesArray(this.hash),
      toBytesString(this.entryPoint),
      toBytesArrayU8(this.args)
    ]);
  }

  public toJson(): Record<string, any> {
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
  public tag = 2;

  constructor(
    private name: string,
    private entryPoint: string,
    private args: Uint8Array
  ) {
    super();
  }

  public toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesString(this.name),
      toBytesString(this.entryPoint),
      toBytesArrayU8(this.args)
    ]);
  }

  public toJson(): Record<string, any> {
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
  public tag = 4;

  constructor(
    private name: string,
    private version: number | null,
    private entryPoint: string,
    private args: Uint8Array
  ) {
    super();
  }

  public toBytes(): ByteArray {
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

  public toJson(): Record<string, any> {
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
  public hash: Uint8Array;
  public version: number | null;
  public entryPoint: string;
  public args: ByteArray;
  public tag = 3;

  public toBytes(): ByteArray {
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

  public toJson(): Record<string, any> {
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
  public args: ByteArray;
  public tag = 5;

  /**
   * Constructor for Transfer deploy item.
   * @param amount The number of motes to transfer
   * @param target URef of the target purse or the public key of target account. You could generate this public key from accountHex by PublicKey.fromHex
   * @param sourcePurse URef of the source purse. If this is omitted, the main purse of the account creating this \
   * transfer will be used as the source purse
   * @param id user-defined transfer id
   */
  constructor(
    amount: BigNumberish,
    target: URef | PublicKey,
    sourcePurse?: URef,
    id: number | null = null
  ) {
    super();
    const runtimeArgs = new RuntimeArgs([]);
    runtimeArgs.insert('amount', CLValue.fromU512(amount));
    if (sourcePurse) {
      runtimeArgs.insert('source', CLValue.fromURef(sourcePurse));
    }
    if (target instanceof URef) {
      runtimeArgs.insert('target', CLValue.fromURef(target));
    } else if (target instanceof PublicKey) {
      runtimeArgs.insert('target', CLValue.fromBytes(target.toAccountHash()));
    } else {
      throw new Error('Please specify target');
    }
    if (!id) {
      runtimeArgs.insert('id', CLValue.fromOption(null, CLTypeHelper.u64()));
    } else {
      runtimeArgs.insert(
        'id',
        CLValue.fromOption(CLTypedAndToBytesHelper.u64(id), CLTypeHelper.u64())
      );
    }
    this.args = runtimeArgs.toBytes();
  }

  public toBytes(): ByteArray {
    return concat([Uint8Array.from([this.tag]), toBytesArrayU8(this.args)]);
  }

  public toJson(): Record<string, any> {
    return {
      Transfer: { args: encodeBase16(this.args) }
    };
  }
}

/**
 * Serialize deployHeader into a array of bytes
 * @param deployHeader
 */
export const serializeHeader = (deployHeader: DeployHeader) => {
  return toBytesDeployHeader(deployHeader);
};

/**
 * Serialize deployBody into a array of bytes
 * @param payment
 * @param session
 */
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

export class DeployParams {
  /**
   * Container for `Deploy` construction options.
   * @param accountPublicKey
   * @param chainName Name of the chain, to avoid the `Deploy` from being accidentally or maliciously included in a different chain.
   * @param gasPrice Conversion rate between the cost of Wasm opcodes and the motes sent by the payment code.
   * @param ttl Time that the `Deploy` will remain valid for, in milliseconds. The default value is 3600000, which is 1 hour
   * @param dependencies Hex-encoded `Deploy` hashes of deploys which must be executed before this one.
   * @param timestamp  If `timestamp` is empty, the current time will be used. Note that timestamp is UTC, not local.
   */
  constructor(
    public accountPublicKey: PublicKey,
    public chainName: string,
    public gasPrice: number = 10,
    public ttl: number = 3600000,
    public dependencies: Uint8Array[] = [],
    public timestamp?: number
  ) {
    this.dependencies = dependencies.filter(
      d =>
        dependencies.filter(t => encodeBase16(d) === encodeBase16(t)).length < 2
    );
    if (!timestamp) {
      this.timestamp = Date.now();
    }
  }
}

/**
 * Makes Deploy message
 */
export function makeDeploy(
  deployParam: DeployParams,
  session: ExecutableDeployItem,
  payment: ExecutableDeployItem
): Deploy {
  const serializedBody = serializeBody(payment, session);
  const bodyHash = blake.blake2b(serializedBody, null, 32);

  const header: DeployHeader = {
    account: deployParam.accountPublicKey,
    bodyHash,
    chainName: deployParam.chainName,
    dependencies: deployParam.dependencies,
    gasPrice: deployParam.gasPrice,
    timestamp: deployParam.timestamp!,
    ttl: deployParam.ttl
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
 * @param signingKey the keyPair to sign deploy
 */
export const signDeploy = (
  deploy: Deploy,
  signingKey: AsymmetricKey
): Deploy => {
  const approval = new Approval();
  const signature = signingKey.sign(deploy.hash);
  approval.signer = signingKey.accountHex();
  approval.signature = Keys.Ed25519.accountHex(signature);
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

/**
 * Standard payment code.
 *
 * @param paymentAmount the number of motes paying to execution engine
 */
export const standardPayment = (paymentAmount: bigint | JSBI) => {
  const paymentArgs = RuntimeArgs.fromMap({
    amount: CLValue.fromU512(paymentAmount.toString())
  });

  return new ModuleBytes(Uint8Array.from([]), paymentArgs.toBytes());
};

/**
 * Convert the deploy object to json
 *
 * @param deploy
 */
export const deployToJson = (deploy: Deploy) => {
  const header = deploy.header;
  const headerJson = {
    account: header.account.toAccountHex(),
    timestamp: new Date(header.timestamp).toISOString(),
    ttl: humanizerTTL(deploy.header.ttl),
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

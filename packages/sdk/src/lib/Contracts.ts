import blake from 'blakejs';
import { Deploy } from 'casperlabs-grpc/io/casperlabs/casper/consensus/consensus_pb';
import * as fs from 'fs';
import { Message } from 'google-protobuf';
import * as nacl from 'tweetnacl-ts';
import { ByteArray } from '../index';
import { Args, BigIntValue, BytesValue } from './Args';
import { ContractType, makeDeploy, signDeploy } from './DeployUtil';
import { Ed25519 } from './Keys';

// https://www.npmjs.com/package/tweetnacl-ts
// https://github.com/dcposch/blakejs

/**
 * Use blake2b to compute hash of ByteArray
 *
 * @param x
 */
export function byteHash(x: ByteArray): ByteArray {
  return blake.blake2b(x, null, 32);
}

/**
 * Compute hash of protobuf object
 *
 * we use this method to compute
 * deployHash and blockHash
 *
 * @param x protobuf Message
 */
export function protoHash<T extends Message>(x: T): ByteArray {
  return byteHash(x.serializeBinary());
}

export class Contract {
  private sessionWasm: ByteArray;
  private paymentWasm: ByteArray;

  /**
   *
   * @param sessionPath
   * @param paymentPath the path of payment contract file, set it undefined if you want use standard payment
   */
  constructor(sessionPath: string, paymentPath?: string) {
    this.sessionWasm = fs.readFileSync(sessionPath);
    if (!paymentPath) {
      this.paymentWasm = Buffer.from('');
    } else {
      this.paymentWasm = fs.readFileSync(paymentPath);
    }
  }

  /**
   * Generate the Deploy message for this contract
   *
   * @param args Arguments
   * @param paymentAmount
   * @param accountPublicKeyHash
   * @param signingKeyPair key pair to sign the deploy
   */
  public deploy(
    args: Deploy.Arg[],
    paymentAmount: bigint,
    accountPublicKeyHash: ByteArray,
    signingKeyPair: nacl.SignKeyPair
  ): Deploy {
    const deploy = makeDeploy(
      args,
      ContractType.WASM,
      this.sessionWasm,
      this.paymentWasm,
      paymentAmount,
      accountPublicKeyHash
    );
    return signDeploy(deploy, signingKeyPair);
  }
}

/**
 * Always use the same account for deploying and signing.
 */
export class BoundContract {
  constructor(
    private contract: Contract,
    private contractKeyPair: nacl.SignKeyPair
  ) {}

  public deploy(args: Deploy.Arg[], paymentAmount: bigint): Deploy {
    return this.contract.deploy(
      args,
      paymentAmount,
      Ed25519.publicKeyHash(this.contractKeyPair.publicKey),
      this.contractKeyPair
    );
  }
}

export class Faucet {
  /**
   * Arguments for Faucet smart contract
   *
   * @param accountPublicKeyHash the public key hash that want to be funded
   */
  public static args(accountPublicKeyHash: ByteArray): Deploy.Arg[] {
    return Args(['account', BytesValue(accountPublicKeyHash)]);
  }
}

export class Transfer {
  /**
   * Arguments for Transfer smart contract
   *
   * @param accountPublicKeyHash the target account to transfer tokens
   * @param amount the amount of tokens to transfer
   */
  public static args(
    accountPublicKeyHash: ByteArray,
    amount: bigint
  ): Deploy.Arg[] {
    return Args(
      ['account', BytesValue(accountPublicKeyHash)],
      ['amount', BigIntValue(amount)]
    );
  }
}

import { URef } from './uref';
import { concat } from '@ethersproject/bytes';
import { CLTypedAndToBytes, SimpleType } from './CLValue';

export enum KeyVariant {
  /** The Account variant */
  ACCOUNT_ID = 0,
  /** The Hash variant */
  HASH_ID = 1,
  /** The URef variant */
  UREF_ID = 2
}

/** A cryptographic public key. */
export class AccountHash {
  /**
   * Constructs a new `AccountHash`.
   *
   * @param bytes The bytes constituting the public key.
   */
  constructor(public bytes: Uint8Array) {}

  /** Serializes a `AccountHash` into an array of bytes. */
  toBytes(): Uint8Array {
    return this.bytes;
  }
}

/**
 * The type under which data (e.g. [[CLValue]]s, smart contracts, user accounts)
 * are indexed on the network.
 */
export class Key extends CLTypedAndToBytes {
  variant: KeyVariant;
  hash: Uint8Array | null;
  uRef: URef | null;
  account: AccountHash | null;

  /** Creates a `Key` from a given [[URef]]. */
  static fromURef(uref: URef): Key {
    let key = new Key();
    key.variant = KeyVariant.UREF_ID;
    key.uRef = uref;
    return key;
  }

  /** Creates a `Key` from a given hash. */
  static fromHash(hash: Uint8Array): Key {
    let key = new Key();
    key.variant = KeyVariant.HASH_ID;
    key.hash = hash;
    return key;
  }

  /** Creates a `Key` from a [[<AccountHash>]] representing an account. */
  static fromAccount(account: AccountHash): Key {
    let key = new Key();
    key.variant = KeyVariant.ACCOUNT_ID;
    key.account = account;
    return key;
  }

  clType() {
    return SimpleType.Key;
  }

  /** Serializes a `Key` into an array of bytes. */
  toBytes() {
    if (this.variant === KeyVariant.ACCOUNT_ID) {
      return concat([Uint8Array.from([this.variant]), this.account!.toBytes()]);
    } else if (this.variant === KeyVariant.HASH_ID) {
      return concat([Uint8Array.from([this.variant]), this.hash!]);
    } else if (this.variant === KeyVariant.UREF_ID) {
      return concat([Uint8Array.from([this.variant]), this.uRef!.toBytes()]);
    } else {
      throw new Error('Unknown variant');
    }
  }
}

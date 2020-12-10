import { concat } from '@ethersproject/bytes';
import {
  toBytesArrayU8,
  toBytesBytesArray,
  toBytesNumber,
  toBytesString,
  toBytesStringList,
  toBytesU32,
  toBytesVecT
} from './byterepr';
import { BigNumberish } from '@ethersproject/bignumber';
import { URef } from './uref';
import { decodeBase16, encodeBase16 } from './Conversions';
import { Option } from './option';
import { byteHash } from './Contracts';
import { SignatureAlgorithm } from './Keys';

type ByteArray = Uint8Array;

export interface CLTyped {
  clType: () => CLType;
}

export interface ToBytes {
  toBytes: () => ByteArray;
}

const ED25519_TAG = 1;
const SECP256K1_TAG = 2;

export abstract class CLTypedAndToBytes implements ToBytes, CLTyped {
  public abstract clType(): CLType;

  public abstract toBytes(): ByteArray;

  public clTypeEncoded(): ByteArray {
    return CLTypeHelper.toBytesHelper(this.clType());
  }
}

export enum SimpleType {
  Bool = 0,
  I32 = 1,
  I64 = 2,
  U8 = 3,
  U32 = 4,
  U64 = 5,
  U128 = 6,
  U256 = 7,
  U512 = 8,
  Unit = 9,
  String = 10,
  Key = 11,
  URef = 12,
  PublicKey = 22
}

class Bool extends CLTypedAndToBytes {
  constructor(private b: boolean) {
    super();
  }

  public toBytes(): ByteArray {
    return new Uint8Array([this.b ? 1 : 0]);
  }

  public clType(): CLType {
    return SimpleType.Bool;
  }
}

abstract class NumberCoder extends CLTypedAndToBytes {
  public bitSize: number;
  public signed: boolean;
  public value: BigNumberish;
  public name: string;

  protected constructor(bitSize: number, signed: boolean, value: BigNumberish) {
    super();
    this.name = (signed ? 'i' : 'u') + bitSize;
    this.bitSize = bitSize;
    this.signed = signed;
    this.value = value;
  }

  public toBytes = (): ByteArray => {
    return toBytesNumber(this.bitSize, this.signed, this.value);
  };

  public abstract clType(): CLType;
}

class U8 extends NumberCoder {
  constructor(u8: number) {
    super(8, false, u8);
  }

  public clType(): CLType {
    return SimpleType.U8;
  }
}

export class U32 extends NumberCoder {
  constructor(n: number) {
    super(32, false, n);
  }

  public clType(): CLType {
    return SimpleType.U32;
  }
}

class I32 extends NumberCoder {
  constructor(n: number) {
    super(32, true, n);
  }

  public clType(): CLType {
    return SimpleType.I32;
  }
}

class U64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, false, n);
  }

  public clType(): CLType {
    return SimpleType.U64;
  }
}

class I64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, true, n);
  }

  public clType(): CLType {
    return SimpleType.I64;
  }
}

class U128 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(128, false, n);
  }

  public clType(): CLType {
    return SimpleType.U128;
  }
}

class U256 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(256, false, n);
  }

  public clType(): CLType {
    return SimpleType.U256;
  }
}

class U512 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(512, false, n);
  }

  public clType(): CLType {
    return SimpleType.U512;
  }
}

class Unit extends CLTypedAndToBytes {
  public clType(): CLType {
    return SimpleType.Unit;
  }

  public toBytes(): ByteArray {
    return Uint8Array.from([]);
  }
}

class StringValue extends CLTypedAndToBytes {
  constructor(private str: string) {
    super();
  }

  public toBytes = () => {
    return toBytesString(this.str);
  };

  public clType(): CLType {
    return SimpleType.String;
  }
}

class List<T extends CLTypedAndToBytes> extends CLTypedAndToBytes {
  constructor(private vec: T[]) {
    super();
    if (vec.length === 0) {
      throw new Error("Can't create instance for empty list");
    }
  }

  public clType(): CLType {
    return CLTypeHelper.list(this.vec[0].clType());
  }

  public toBytes(): ByteArray {
    return toBytesVecT(this.vec);
  }
}

class Tuple1 extends CLTypedAndToBytes {
  constructor(private v0: CLTypedAndToBytes) {
    super();
  }

  public toBytes(): ByteArray {
    return this.v0.toBytes();
  }

  public clType(): CLType {
    return CLTypeHelper.tuple1(this.v0.clType());
  }
}

class Tuple2 extends CLTypedAndToBytes {
  constructor(private v0: CLTypedAndToBytes, private v1: CLTypedAndToBytes) {
    super();
  }

  public toBytes(): ByteArray {
    return concat([this.v0.toBytes(), this.v1.toBytes()]);
  }

  public clType(): CLType {
    return CLTypeHelper.tuple2(this.v0.clType(), this.v1.clType());
  }
}

class Tuple3 extends CLTypedAndToBytes {
  constructor(
    private v0: CLTypedAndToBytes,
    private v1: CLTypedAndToBytes,
    private v2: CLTypedAndToBytes
  ) {
    super();
  }

  public clType(): CLType {
    return CLTypeHelper.tuple3(
      this.v0.clType(),
      this.v1.clType(),
      this.v2.clType()
    );
  }

  public toBytes(): ByteArray {
    return concat([this.v0.toBytes(), this.v1.toBytes(), this.v2.toBytes()]);
  }
}

export class PublicKey extends CLTypedAndToBytes {
  private constructor(public rawPublicKey: ByteArray, private tag: number) {
    super();
  }

  public clType(): CLType {
    return SimpleType.PublicKey;
  }

  public toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      toBytesBytesArray(this.rawPublicKey)
    ]);
  }

  public toAccountHex(): string {
    let accountHash: string;
    switch (this.tag) {
      case ED25519_TAG:
        accountHash = '01' + encodeBase16(this.rawPublicKey);
        break;
      case SECP256K1_TAG:
        accountHash = '02' + encodeBase16(this.rawPublicKey);
        break;
      default:
        throw new Error('Unsupported type of public key');
    }
    return accountHash;
  }

  public toAccountHash(): ByteArray {
    const algorithmIdentifier = this.signatureAlgorithm();
    const separator = Buffer.from([0]);
    const prefix = Buffer.concat([
      Buffer.from(algorithmIdentifier.toLowerCase()),
      separator
    ]);

    if (this.rawPublicKey.length === 0) {
      return Buffer.from([]);
    } else {
      return byteHash(Buffer.concat([prefix, Buffer.from(this.rawPublicKey)]));
    }
  }

  public static fromEd25519(publicKey: ByteArray) {
    return new PublicKey(publicKey, ED25519_TAG);
  }

  public static fromSecp256K1(publicKey: ByteArray) {
    return new PublicKey(publicKey, SECP256K1_TAG);
  }

  public static from(
    publicKey: ByteArray,
    signatureAlgorithm: SignatureAlgorithm
  ) {
    switch (signatureAlgorithm) {
      case SignatureAlgorithm.Ed25519:
        return PublicKey.fromEd25519(publicKey);
      case SignatureAlgorithm.Secp256K1:
        return PublicKey.fromSecp256K1(publicKey);
      default:
        throw new Error('Unsupported type of public key');
    }
  }

  /**
   * Tries to decode PublicKey from its hex-representation.
   * The hex format should be as produced by PublicKey.toAccountHex
   * @param publicKeyHex
   */
  public static fromHex(publicKeyHex: string) {
    if (publicKeyHex.length < 2) {
      throw new Error('asymmetric key error: too short');
    }
    const publicKeyHexBytes = decodeBase16(publicKeyHex);
    switch (publicKeyHexBytes[0]) {
      case 1:
        return PublicKey.fromEd25519(publicKeyHexBytes.subarray(1));
      default:
        throw new Error('Unsupported type of public key');
    }
  }

  public signatureAlgorithm() {
    switch (this.tag) {
      case ED25519_TAG:
        return SignatureAlgorithm.Ed25519;
      case SECP256K1_TAG:
        return SignatureAlgorithm.Secp256K1;
      default:
        throw new Error('Unsupported type of public key');
    }
  }
}

export interface MapEntry {
  key: CLTypedAndToBytes;
  value: CLTypedAndToBytes;
}

class MapValue extends CLTypedAndToBytes {
  constructor(private v: MapEntry[]) {
    super();
  }

  public toBytes(): ByteArray {
    const kvBytes: Uint8Array[] = this.v.map(vv => {
      return concat([vv.key.toBytes(), vv.value.toBytes()]);
    });
    kvBytes.splice(0, 0, toBytesU32(this.v.length));
    return concat(kvBytes);
  }

  public clType(): CLType {
    return new MapType(this.v[0].key.clType(), this.v[0].value.clType());
  }
}

class OptionType {
  public tag = 13;

  constructor(public innerType: CLType) {}
}

class ListType {
  public tag = 14;
  public innerType: CLType;

  constructor(innerType: CLType) {
    this.innerType = innerType;
  }
}

class ByteArrayType {
  public tag = 15;

  constructor(public size: number) {}
}

class MapType {
  public tag = 17;

  constructor(public keyType: CLType, public valueType: CLType) {}
}

class Tuple1Type {
  public tag = 18;

  constructor(public t0: CLType) {}
}

class Tuple2Type {
  public tag = 19;

  constructor(public t0: CLType, public t1: CLType) {}
}

class Tuple3Type {
  public tag = 20;

  constructor(public t0: CLType, public t1: CLType, public t2: CLType) {}
}

export type CLType =
  | SimpleType
  | ListType
  | ByteArrayType
  | MapType
  | OptionType
  | Tuple1Type
  | Tuple2Type
  | Tuple3Type;

export class CLTypeHelper {
  public static u8() {
    return SimpleType.U8;
  }

  public static u32() {
    return SimpleType.U32;
  }

  public static u64() {
    return SimpleType.U64;
  }

  public static u128() {
    return SimpleType.U128;
  }

  public static u256() {
    return SimpleType.U256;
  }

  public static u512() {
    return SimpleType.U512;
  }

  public static i32() {
    return SimpleType.I32;
  }

  public static i64() {
    return SimpleType.I64;
  }

  public static bool() {
    return SimpleType.Bool;
  }

  public static unit() {
    return SimpleType.Unit;
  }

  public static string() {
    return SimpleType.String;
  }

  public static key() {
    return SimpleType.Key;
  }

  public static publicKey() {
    return SimpleType.PublicKey;
  }

  public static uRef() {
    return SimpleType.URef;
  }

  public static option(innerType: CLType) {
    return new OptionType(innerType);
  }

  public static list(innerType: CLType) {
    return new ListType(innerType);
  }

  public static byteArray(len: number) {
    return new ByteArrayType(len);
  }

  public static map(keyType: CLType, valueType: CLType) {
    return new MapType(keyType, valueType);
  }

  public static tuple1(t0: CLType) {
    return new Tuple1Type(t0);
  }

  public static tuple2(t0: CLType, t1: CLType) {
    return new Tuple2Type(t0, t1);
  }

  public static tuple3(t0: CLType, t1: CLType, t2: CLType) {
    return new Tuple3Type(t0, t1, t2);
  }

  public static toBytesHelper(type: CLType): ByteArray {
    if (type instanceof ListType) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypeHelper.toBytesHelper(type.innerType)
      ]);
    } else if (type instanceof Tuple1Type) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypeHelper.toBytesHelper(type.t0)
      ]);
    } else if (type instanceof Tuple2Type) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypeHelper.toBytesHelper(type.t0),
        CLTypeHelper.toBytesHelper(type.t1)
      ]);
    } else if (type instanceof Tuple3Type) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypeHelper.toBytesHelper(type.t0),
        CLTypeHelper.toBytesHelper(type.t1),
        CLTypeHelper.toBytesHelper(type.t2)
      ]);
    } else if (type instanceof ByteArrayType) {
      return concat([Uint8Array.from([type.tag]), toBytesU32(type.size)]);
    } else if (type instanceof MapType) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypeHelper.toBytesHelper(type.keyType),
        CLTypeHelper.toBytesHelper(type.valueType)
      ]);
    } else if (type instanceof OptionType) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypeHelper.toBytesHelper(type.innerType)
      ]);
    } else {
      switch (type) {
        case SimpleType.Bool:
        case SimpleType.I32:
        case SimpleType.I64:
        case SimpleType.U8:
        case SimpleType.U32:
        case SimpleType.U64:
        case SimpleType.U128:
        case SimpleType.U256:
        case SimpleType.U512:
        case SimpleType.Unit:
        case SimpleType.String:
        case SimpleType.Key:
        case SimpleType.URef:
        case SimpleType.PublicKey:
          return Uint8Array.from([type]);
        default:
          throw new Error('Wrong type');
      }
    }
  }
}

class ByteArrayValue extends CLTypedAndToBytes {
  constructor(private bytes: ByteArray) {
    super();
  }

  public clType(): CLType {
    return CLTypeHelper.byteArray(this.bytes.length);
  }

  public toBytes(): ByteArray {
    return toBytesBytesArray(this.bytes);
  }
}

export class CLTypedAndToBytesHelper {
  public static bool = (b: boolean) => {
    return new Bool(b);
  };

  public static u8 = (u8: number) => {
    return new U8(u8);
  };

  public static u32 = (u32: number) => {
    return new U32(u32);
  };

  public static i32 = (i32: number) => {
    return new I32(i32);
  };

  public static u64 = (u64: BigNumberish) => {
    return new U64(u64);
  };

  public static i64 = (i64: BigNumberish) => {
    return new I64(i64);
  };

  public static u128 = (u128: BigNumberish) => {
    return new U128(u128);
  };

  public static u256 = (u256: BigNumberish) => {
    return new U256(u256);
  };

  public static u512 = (u512: BigNumberish) => {
    return new U512(u512);
  };

  public static unit = () => {
    return new Unit();
  };

  public static string = (x: string) => {
    return new StringValue(x);
  };

  public static list<T extends CLTypedAndToBytes>(vec: T[]) {
    // todo(abner) implement fromEmptyList
    return new List(vec);
  }

  public static tuple1<T extends CLTypedAndToBytes>(t0: T) {
    return new Tuple1(t0);
  }

  public static tuple2<T extends CLTypedAndToBytes>(t0: T, t1: T) {
    return new Tuple2(t0, t1);
  }

  public static tuple3<T extends CLTypedAndToBytes>(t0: T, t1: T, t2: T) {
    return new Tuple3(t0, t1, t2);
  }

  public static map(mapEntries: MapEntry[]) {
    return new MapValue(mapEntries);
  }

  public static publicKey(publicKey: ByteArray) {
    return PublicKey.fromEd25519(publicKey);
  }

  public static bytes(bytes: ByteArray) {
    return new ByteArrayValue(bytes);
  }
}

/**
 * A Casper value, i.e. a value which can be stored and manipulated by smart contracts.
 *
 * It holds the underlying data as a type-erased, serialized array of bytes and also holds the
 * [[CLType]] of the underlying data as a separate member.
 */
export class CLValue implements ToBytes {
  /**
   * Please use static methods to constructs a new `CLValue`
   */
  private constructor(private bytes: ByteArray, private clType: CLType) {}

  public static fromT<T extends CLTypedAndToBytes>(v: T) {
    return new CLValue(v.toBytes(), v.clType());
  }

  /**
   * Serializes a `CLValue` into an array of bytes.
   */
  public toBytes() {
    return concat([
      toBytesArrayU8(this.bytes),
      CLTypeHelper.toBytesHelper(this.clType)
    ]);
  }

  public static fromBool = (b: boolean) => {
    return CLValue.fromT(new Bool(b));
  };

  public static fromU8 = (u8: number) => {
    return CLValue.fromT(new U8(u8));
  };

  public static fromU32 = (u32: number) => {
    return CLValue.fromT(new U32(u32));
  };

  public static fromI32 = (i32: number) => {
    return CLValue.fromT(new I32(i32));
  };

  public static fromU64 = (u64: BigNumberish) => {
    return CLValue.fromT(new U64(u64));
  };

  public static fromI64 = (i64: BigNumberish) => {
    return CLValue.fromT(new I64(i64));
  };

  public static fromU128 = (u128: BigNumberish) => {
    return CLValue.fromT(new U128(u128));
  };

  public static fromU256 = (u256: BigNumberish) => {
    return CLValue.fromT(new U256(u256));
  };

  public static fromU512 = (u512: BigNumberish) => {
    return CLValue.fromT(new U512(u512));
  };

  public static fromUnit = () => {
    return CLValue.fromT(new Unit());
  };

  public static fromString = (x: string) => {
    return CLValue.fromT(new StringValue(x));
  };

  public static fromKey = (key: KeyValue) => {
    return CLValue.fromT(key);
  };

  public static fromURef = (uRef: URef) => {
    return CLValue.fromT(uRef);
  };

  public static fromStringList = (strings: string[]) => {
    return new CLValue(
      toBytesStringList(strings),
      CLTypeHelper.list(SimpleType.String)
    );
  };

  public static fromList<T extends CLTypedAndToBytes>(vec: T[]) {
    return CLValue.fromT(new List(vec));
  }

  public static fromTuple1<T extends CLTypedAndToBytes>(t0: T) {
    return CLValue.fromT(new Tuple1(t0));
  }

  public static fromTuple2<T extends CLTypedAndToBytes>(t0: T, t1: T) {
    return CLValue.fromT(new Tuple2(t0, t1));
  }

  public static fromTuple3<T extends CLTypedAndToBytes>(t0: T, t1: T, t2: T) {
    return CLValue.fromT(new Tuple3(t0, t1, t2));
  }

  public static fromOption(t: CLTypedAndToBytes | null, innerType?: CLType) {
    return CLValue.fromT(new Option(t, innerType));
  }

  public static fromMap(mapEntries: MapEntry[]) {
    return CLValue.fromT(new MapValue(mapEntries));
  }

  public static fromPublicKey(publicKey: ByteArray) {
    return CLValue.fromT(PublicKey.fromEd25519(publicKey));
  }

  public static fromBytes(bytes: ByteArray) {
    return new CLValue(
      toBytesBytesArray(bytes),
      CLTypeHelper.byteArray(bytes.byteLength)
    );
  }
}

export enum KeyVariant {
  /** The Account variant */
  ACCOUNT_ID = 0,
  /** The Hash variant */
  HASH_ID = 1,
  /** The URef variant */
  UREF_ID = 2
}

/// The length in bytes of a [`AccountHash`].
const ACCOUNT_HASH_LENGTH: number = 32;

/** A cryptographic public key. */
export class AccountHash extends CLTypedAndToBytes {
  /**
   * Constructs a new `AccountHash`.
   *
   * @param bytes The bytes constituting the public key.
   */
  constructor(public bytes: Uint8Array) {
    super();
  }

  /** Serializes a `AccountHash` into an array of bytes. */
  public toBytes(): Uint8Array {
    return this.bytes;
  }

  public clType(): CLType {
    return CLTypeHelper.byteArray(ACCOUNT_HASH_LENGTH);
  }
}

/**
 * The type under which data (e.g. [[CLValue]]s, smart contracts, user accounts)
 * are indexed on the network.
 */
export class KeyValue extends CLTypedAndToBytes {
  public variant: KeyVariant;
  public hash: Uint8Array | null;
  public uRef: URef | null;
  public account: AccountHash | null;

  /** Creates a `Key` from a given [[URef]]. */
  public static fromURef(uref: URef): KeyValue {
    const key = new KeyValue();
    key.variant = KeyVariant.UREF_ID;
    key.uRef = uref;
    return key;
  }

  /** Creates a `Key` from a given hash. */
  public static fromHash(hash: Uint8Array): KeyValue {
    const key = new KeyValue();
    key.variant = KeyVariant.HASH_ID;
    key.hash = hash;
    return key;
  }

  /** Creates a `Key` from a [[<AccountHash>]] representing an account. */
  public static fromAccount(account: AccountHash): KeyValue {
    const key = new KeyValue();
    key.variant = KeyVariant.ACCOUNT_ID;
    key.account = account;
    return key;
  }

  public clType() {
    return SimpleType.Key;
  }

  /** Serializes a `Key` into an array of bytes. */
  public toBytes() {
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

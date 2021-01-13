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
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { decodeBase16, encodeBase16 } from './Conversions';
import { Option } from './option';
import { byteHash } from './Contracts';
import { SignatureAlgorithm } from './Keys';

const ED25519_PUBLIC_KEY_LENGTH = 32;
const SECP256K1_PUBLIC_KEY_LENGTH = 33;
type ByteArray = Uint8Array;

type Type<T> = new (...args: any[]) => T;

/**
 * Static interface  declaration
 */
export interface BytesDeserializableStatic<T> extends Type<BytesSerializable> {
  fromBytes(bytes: ByteArray): Result<T>;
}

export interface BytesSerializable extends CLTyped, ToBytes {}

export interface CLTyped {
  /**
   * Returns the CLType
   */
  clType: () => CLType;
}

export interface ToBytes {
  toBytes: () => ByteArray;
}

export abstract class CLTypedAndToBytes implements BytesSerializable {
  public abstract clType(): CLType;

  public abstract toBytes(): ByteArray;

  public clTypeEncoded(): ByteArray {
    return CLTypeHelper.toBytesHelper(this.clType());
  }
}

export function staticImplements<T>() {
  // @ts-ignore
  return (constructor: T) => {
    // @ts-ignore
  };
}

const ED25519_TAG = 1;
const SECP256K1_TAG = 2;

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

enum ComplexType {
  Option = 13,
  List = 14,
  ByteArray = 15,
  Result = 16,
  Map = 17,
  Tuple1 = 18,
  Tuple2 = 19,
  Tuple3 = 20,
  Any = 21
}

/**
 * Enum representing possible results of deserialization.
 */
export enum FromBytesError {
  /**
   * Last operation was a success
   */
  Ok = 0,
  /**
   * Early end of stream
   */
  EarlyEndOfStream = 1,
  /**
   * Unexpected data encountered while decoding byte stream
   */
  FormattingError = 2
}

/**
 * Class representing a result of an operation that might have failed. Can contain either a value
 * resulting from a successful completion of a calculation, or an error. Similar to `Result` in Rust
 * or `Either` in Haskell.
 */
export class Result<T> {
  /**
   * Creates new Result with value
   * @param value value (success) or null (error)
   * @param error FromBytesError code
   * @param rem Remaining input stream
   */
  constructor(
    private val: T | null,
    private rem: ByteArray | null,
    public error: FromBytesError
  ) {}

  public static Err<T>(errorCode: FromBytesError) {
    return new Result<T>(null, null, errorCode);
  }

  public static Ok<T>(val: T, rem: ByteArray) {
    return new Result<T>(val, rem, FromBytesError.Ok);
  }

  get remainder(): ByteArray {
    if (this.rem === null) {
      throw new Error("Don't have remainder");
    }
    return this.rem;
  }

  /**
   * Assumes that reference wrapper contains a value and then returns it
   */
  get value(): T {
    if (!this.hasValue()) {
      throw new Error("Don't have value");
    }
    return this.val!;
  }

  /**
   * Checks if given Result contains a value
   */
  public hasValue(): boolean {
    return this.val !== null;
  }

  /**
   * Checks if error value is set.
   *
   * Truth also implies !hasValue(), false value implies hasValue()
   */
  public hasError(): boolean {
    return this.error !== FromBytesError.Ok;
  }
}

@staticImplements<BytesDeserializableStatic<Bool>>()
export class Bool extends CLTypedAndToBytes {
  constructor(private b: boolean) {
    super();
  }

  public toBytes(): ByteArray {
    return new Uint8Array([this.b ? 1 : 0]);
  }

  public clType(): CLType {
    return SimpleType.Bool;
  }

  public static fromBytes(bytes: ByteArray): Result<Bool> {
    if (bytes.length === 0) {
      return Result.Err<Bool>(FromBytesError.EarlyEndOfStream);
    }
    if (bytes[0] === 1) {
      return Result.Ok<Bool>(new Bool(true), bytes.subarray(1));
    } else if (bytes[0] === 0) {
      return Result.Ok<Bool>(new Bool(false), bytes.subarray(1));
    } else {
      return Result.Err<Bool>(FromBytesError.FormattingError);
    }
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

@staticImplements<BytesDeserializableStatic<U8>>()
export class U8 extends NumberCoder {
  constructor(u8: number) {
    super(8, false, u8);
  }

  public clType(): CLType {
    return SimpleType.U8;
  }

  public static fromBytes(bytes: ByteArray): Result<U8> {
    if (bytes.length === 0) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    return Result.Ok(new U8(bytes[0]), bytes.subarray(1));
  }
}

@staticImplements<BytesDeserializableStatic<U32>>()
export class U32 extends NumberCoder {
  constructor(n: number) {
    super(32, false, n);
  }

  public clType(): CLType {
    return SimpleType.U32;
  }

  public static fromBytes(bytes: ByteArray): Result<U32> {
    if (bytes.length < 4) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const u32Bytes = Buffer.from(bytes.subarray(0, 4));
    const u32 = u32Bytes.readUInt32LE();

    return Result.Ok(new U32(u32), bytes.subarray(4));
  }
}

@staticImplements<BytesDeserializableStatic<I32>>()
export class I32 extends NumberCoder {
  constructor(n: number) {
    super(32, true, n);
  }

  public clType(): CLType {
    return SimpleType.I32;
  }

  public static fromBytes(bytes: ByteArray): Result<I32> {
    if (bytes.length < 4) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const i32Bytes = Buffer.from(bytes.subarray(0, 4));
    const i32 = i32Bytes.readInt32LE();
    return Result.Ok(new I32(i32), bytes.subarray(4));
  }
}

@staticImplements<BytesDeserializableStatic<U64>>()
export class U64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, false, n);
  }

  public clType(): CLType {
    return SimpleType.U64;
  }

  public static fromBytes(bytes: ByteArray): Result<U64> {
    const tmp = Uint8Array.from(bytes);
    if (bytes.length < 8) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const u64Bytes = tmp.subarray(0, 8);
    const rem = tmp.subarray(8);
    return Result.Ok(new U64(BigNumber.from(u64Bytes.reverse())), rem);
  }
}

@staticImplements<BytesDeserializableStatic<I64>>()
export class I64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, true, n);
  }

  public clType(): CLType {
    return SimpleType.I64;
  }

  public static fromBytes(bytes: ByteArray): Result<I64> {
    if (bytes.length < 8) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const tmp = Uint8Array.from(bytes);
    const i64Bytes = tmp.subarray(0, 8);
    const rem = tmp.subarray(8);
    return Result.Ok(
      new I64(BigNumber.from(i64Bytes.reverse()).fromTwos(64)),
      rem
    );
  }
}

@staticImplements<BytesDeserializableStatic<U128>>()
export class U128 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(128, false, n);
  }

  public clType(): CLType {
    return SimpleType.U128;
  }

  public static fromBytes(bytes: ByteArray): Result<U128> {
    if (bytes.length < 1) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const tmp = Uint8Array.from(bytes);
    const n = tmp[0];
    if (n === 0 || n > 16) {
      return Result.Err(FromBytesError.FormattingError);
    }
    if (n + 1 > bytes.length) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const u128Bytes = tmp.subarray(1, 1 + n);
    const rem = tmp.subarray(1 + n);
    return Result.Ok(new U128(BigNumber.from(u128Bytes.reverse())), rem);
  }
}

@staticImplements<BytesDeserializableStatic<U256>>()
class U256 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(256, false, n);
  }

  public clType(): CLType {
    return SimpleType.U256;
  }

  public static fromBytes(bytes: ByteArray): Result<U128> {
    if (bytes.length < 1) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const tmp = Uint8Array.from(bytes);
    const n = tmp[0];
    if (n === 0 || n > 32) {
      return Result.Err(FromBytesError.FormattingError);
    }
    if (n + 1 > bytes.length) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const u256Bytes = tmp.subarray(1, 1 + n);
    const rem = tmp.subarray(1 + n);
    return Result.Ok(new U256(BigNumber.from(u256Bytes.reverse())), rem);
  }
}

@staticImplements<BytesDeserializableStatic<U512>>()
class U512 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(512, false, n);
  }

  public clType(): CLType {
    return SimpleType.U512;
  }

  public static fromBytes(bytes: ByteArray): Result<U512> {
    if (bytes.length < 1) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const tmp = Uint8Array.from(bytes);
    const n = tmp[0];
    if (n === 0 || n > 64) {
      return Result.Err(FromBytesError.FormattingError);
    }
    if (n + 1 > bytes.length) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const u512Bytes = tmp.subarray(1, 1 + n);
    const rem = tmp.subarray(1 + n);
    return Result.Ok(new U512(BigNumber.from(u512Bytes.reverse())), rem);
  }
}

@staticImplements<BytesDeserializableStatic<Unit>>()
export class Unit extends CLTypedAndToBytes {
  public clType(): CLType {
    return SimpleType.Unit;
  }

  public toBytes(): ByteArray {
    return Uint8Array.from([]);
  }

  public static fromBytes(bytes: ByteArray): Result<Unit> {
    return Result.Ok<Unit>(new Unit(), bytes);
  }
}

@staticImplements<BytesDeserializableStatic<StringValue>>()
export class StringValue extends CLTypedAndToBytes {
  constructor(public str: string) {
    super();
  }

  public toBytes = () => {
    return toBytesString(this.str);
  };

  public clType(): CLType {
    return SimpleType.String;
  }

  public static fromBytes(bytes: ByteArray): Result<StringValue> {
    const res = U32.fromBytes(bytes);
    if (res.hasError()) {
      return Result.Err(res.error);
    }
    const len = res.value.value as number;
    const str = Buffer.from(res.remainder.subarray(0, len)).toString('utf8');
    return Result.Ok<StringValue>(
      new StringValue(str),
      res.remainder.subarray(len)
    );
  }
}

export const fromBytesByCLType = (
  type: CLType,
  bytes: ByteArray
): Result<CLTypedAndToBytes> => {
  if (type instanceof ListType) {
    return List.fromBytes(type, bytes);
  } else if (type instanceof Tuple1Type) {
    return Tuple1.fromBytes(type, bytes);
  } else if (type instanceof Tuple2Type) {
    return Tuple2.fromBytes(type, bytes);
  } else if (type instanceof Tuple3Type) {
    return Tuple3.fromBytes(type, bytes);
  } else if (type instanceof ByteArrayType) {
    return ByteArrayValue.fromBytes(bytes);
  } else if (type instanceof MapType) {
    return MapValue.fromBytes(type, bytes);
  } else if (type instanceof OptionType) {
    return Option.fromBytes(type, bytes);
  } else {
    return fromBytesSimpleType(type, bytes);
  }
};

const fromBytesSimpleType = (
  simpleType: SimpleType,
  bytes: ByteArray
): Result<CLTypedAndToBytes> => {
  let innerRes: Result<CLTypedAndToBytes>;
  switch (simpleType) {
    case SimpleType.Bool:
      innerRes = Bool.fromBytes(bytes);
      break;
    case SimpleType.I32:
      innerRes = I32.fromBytes(bytes);
      break;
    case SimpleType.I64:
      innerRes = I64.fromBytes(bytes);
      break;
    case SimpleType.U8:
      innerRes = U8.fromBytes(bytes);
      break;
    case SimpleType.U32:
      innerRes = U32.fromBytes(bytes);
      break;
    case SimpleType.U64:
      innerRes = U64.fromBytes(bytes);
      break;
    case SimpleType.U128:
      innerRes = U128.fromBytes(bytes);
      break;
    case SimpleType.U256:
      innerRes = U256.fromBytes(bytes);
      break;
    case SimpleType.U512:
      innerRes = U512.fromBytes(bytes);
      break;
    case SimpleType.Unit:
      innerRes = Unit.fromBytes(bytes);
      break;
    case SimpleType.String:
      innerRes = StringValue.fromBytes(bytes);
      break;
    case SimpleType.Key:
      innerRes = KeyValue.fromBytes(bytes);
      break;
    case SimpleType.URef:
      innerRes = URef.fromBytes(bytes);
      break;
    case SimpleType.PublicKey:
      innerRes = PublicKey.fromBytes(bytes);
      break;
    default:
      innerRes = Result.Err(FromBytesError.FormattingError);
      break;
  }
  if (innerRes.hasError()) {
    return Result.Err(innerRes.error);
  } else {
    return Result.Ok(innerRes.value, innerRes.remainder);
  }
};

export class List<T extends CLTypedAndToBytes> extends CLTypedAndToBytes {
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

  public static fromBytes(
    type: ListType,
    bytes: ByteArray
  ): Result<List<CLTypedAndToBytes>> {
    const u32Res = U32.fromBytes(bytes);
    if (u32Res.hasError()) {
      return Result.Err(u32Res.error);
    }
    const size = u32Res.value.value as number;
    const vec = [];
    let remainder = u32Res.remainder;
    for (let i = 0; i < size; i++) {
      const v = fromBytesByCLType(type.innerType, remainder);
      if (v.hasError()) {
        return Result.Err(v.error);
      }
      vec.push(v.value);
      remainder = v.remainder;
    }
    return Result.Ok(new List(vec), remainder);
  }
}

export class Tuple1 extends CLTypedAndToBytes {
  constructor(private v0: CLTypedAndToBytes) {
    super();
  }

  public toBytes(): ByteArray {
    return this.v0.toBytes();
  }

  public clType(): CLType {
    return CLTypeHelper.tuple1(this.v0.clType());
  }

  public static fromBytes(type: Tuple1Type, bytes: ByteArray): Result<Tuple1> {
    const innerRes = fromBytesByCLType(type.t0, bytes);
    if (innerRes.hasError()) {
      return Result.Err(innerRes.error);
    }
    const tuple = new Tuple1(innerRes.value);
    return Result.Ok(tuple, innerRes.remainder);
  }
}

export class Tuple2 extends CLTypedAndToBytes {
  constructor(private v0: CLTypedAndToBytes, private v1: CLTypedAndToBytes) {
    super();
  }

  public toBytes(): ByteArray {
    return concat([this.v0.toBytes(), this.v1.toBytes()]);
  }

  public clType(): CLType {
    return CLTypeHelper.tuple2(this.v0.clType(), this.v1.clType());
  }

  public static fromBytes(type: Tuple2Type, bytes: ByteArray): Result<Tuple2> {
    const t0Res = fromBytesByCLType(type.t0, bytes);
    if (t0Res.hasError()) {
      return Result.Err(t0Res.error);
    }
    const t1Res = fromBytesByCLType(type.t1, t0Res.remainder);
    if (t1Res.hasError()) {
      return Result.Err(t1Res.error);
    }
    const tuple = new Tuple2(t0Res.value, t1Res.value);
    return Result.Ok(tuple, t1Res.remainder);
  }
}

export class Tuple3 extends CLTypedAndToBytes {
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

  public static fromBytes(type: Tuple3Type, bytes: ByteArray): Result<Tuple3> {
    const t0Res = fromBytesByCLType(type.t0, bytes);
    if (t0Res.hasError()) {
      return Result.Err(t0Res.error);
    }
    const t1Res = fromBytesByCLType(type.t1, t0Res.remainder);
    if (t1Res.hasError()) {
      return Result.Err(t1Res.error);
    }
    const t2Res = fromBytesByCLType(type.t2, t1Res.remainder);
    if (t2Res.hasError()) {
      return Result.Err(t2Res.error);
    }
    const tuple = new Tuple3(t0Res.value, t1Res.value, t2Res.value);
    return Result.Ok(tuple, t2Res.remainder);
  }
}

@staticImplements<BytesDeserializableStatic<PublicKey>>()
export class PublicKey extends CLTypedAndToBytes {
  constructor(public rawPublicKey: ByteArray, private tag: number) {
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
      case 2:
        return PublicKey.fromSecp256K1(publicKeyHexBytes.subarray(1));
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

  /** Deserializes a `PublicKey` from an array of bytes. */
  public static fromBytes(bytes: ByteArray): Result<PublicKey> {
    if (bytes.length < 1) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const variant = bytes[0];
    let currentPos = 1;

    let expectedPublicKeySize: number;

    switch (variant) {
      case ED25519_TAG:
        expectedPublicKeySize = ED25519_PUBLIC_KEY_LENGTH;
        break;
      case SECP256K1_TAG:
        expectedPublicKeySize = SECP256K1_PUBLIC_KEY_LENGTH;
        break;
      default:
        return Result.Err<PublicKey>(FromBytesError.FormattingError);
    }
    const publicKeyBytes = bytes.subarray(
      currentPos,
      currentPos + expectedPublicKeySize
    );
    currentPos += expectedPublicKeySize;

    const publicKey = new PublicKey(publicKeyBytes, variant);
    return Result.Ok(publicKey, bytes.subarray(currentPos));
  }
}

export interface MapEntry {
  key: CLTypedAndToBytes;
  value: CLTypedAndToBytes;
}

export class MapValue extends CLTypedAndToBytes {
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

  public static fromBytes(type: MapType, bytes: ByteArray): Result<MapValue> {
    const u32Res = U32.fromBytes(bytes);
    if (u32Res.hasError()) {
      return Result.Err(u32Res.error);
    }
    const size = u32Res.value.value as number;
    const vec: MapEntry[] = [];
    let remainder = u32Res.remainder;
    for (let i = 0; i < size; i++) {
      const keyRes = fromBytesByCLType(type.keyType, remainder);
      if (keyRes.hasError()) {
        return Result.Err(keyRes.error);
      }
      remainder = keyRes.remainder;
      const valueRes = fromBytesByCLType(type.valueType, remainder);
      if (valueRes.hasError()) {
        return Result.Err(valueRes.error);
      }
      remainder = valueRes.remainder;
      vec.push({ key: keyRes.value, value: valueRes.value });
    }
    return Result.Ok(new MapValue(vec), remainder);
  }
}

export class OptionType {
  public tag = ComplexType.Option;

  constructor(public innerType: CLType) {}
}

class ListType {
  public tag = ComplexType.List;
  public innerType: CLType;

  constructor(innerType: CLType) {
    this.innerType = innerType;
  }
}

class ByteArrayType {
  public tag = ComplexType.ByteArray;

  constructor(public size: number) {}
}

class MapType {
  public tag = ComplexType.Map;

  constructor(public keyType: CLType, public valueType: CLType) {}
}

class Tuple1Type {
  public tag = ComplexType.Tuple1;

  constructor(public t0: CLType) {}
}

class Tuple2Type {
  public tag = ComplexType.Tuple2;

  constructor(public t0: CLType, public t1: CLType) {}
}

class Tuple3Type {
  public tag = ComplexType.Tuple3;

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

  public static fromBytes(bytes: ByteArray): Result<CLType> {
    if (bytes.length < 1) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const tag = bytes[0];
    const rem = bytes.subarray(1);
    switch (tag) {
      case SimpleType.Bool:
      case SimpleType.I32:
      case SimpleType.I64:
      case SimpleType.U8:
      case SimpleType.U32:
      case SimpleType.U64:
      case SimpleType.U256:
      case SimpleType.U512:
      case SimpleType.Unit:
      case SimpleType.String:
      case SimpleType.Key:
      case SimpleType.URef:
      case SimpleType.PublicKey:
        return Result.Ok<CLType>(tag as SimpleType, rem);
      case ComplexType.Option: {
        // 1 inner type
        const innerTypeRes = CLTypeHelper.fromBytes(rem);
        if (innerTypeRes.hasError()) {
          return Result.Err(innerTypeRes.error);
        }

        return Result.Ok(
          CLTypeHelper.option(innerTypeRes.value),
          innerTypeRes.remainder
        );
      }
      case ComplexType.List: {
        // 1 inner type
        const innerTypeRes = CLTypeHelper.fromBytes(rem);
        if (innerTypeRes.hasError()) {
          return Result.Err(innerTypeRes.error);
        }

        return Result.Ok(
          CLTypeHelper.list(innerTypeRes.value),
          innerTypeRes.remainder
        );
      }
      case ComplexType.ByteArray: {
        // size of bytes
        const sizeRes = U32.fromBytes(rem);
        if (sizeRes.hasError()) {
          return Result.Err(sizeRes.error);
        }
        return Result.Ok(
          CLTypeHelper.byteArray(sizeRes.value.value as number),
          sizeRes.remainder
        );
      }
      case ComplexType.Result:
        // todo(abner) support Result
        throw new Error('Result type is unsupported now');
      case ComplexType.Map: {
        // type of key
        const keyTypeRes = CLTypeHelper.fromBytes(rem);
        if (keyTypeRes.hasError()) {
          return Result.Err(keyTypeRes.error);
        }
        const valueTypeRes = CLTypeHelper.fromBytes(keyTypeRes.remainder);
        if (valueTypeRes.hasError()) {
          return Result.Err(valueTypeRes.error);
        }
        return Result.Ok(
          CLTypeHelper.map(keyTypeRes.value, valueTypeRes.value),
          valueTypeRes.remainder
        );
      }

      case ComplexType.Tuple1: {
        // 1 inner type
        const innerTypeRes = CLTypeHelper.fromBytes(rem);
        if (innerTypeRes.hasError()) {
          return Result.Err(innerTypeRes.error);
        }

        return Result.Ok(
          CLTypeHelper.tuple1(innerTypeRes.value),
          innerTypeRes.remainder
        );
      }
      case ComplexType.Tuple2: {
        // 2 inner types
        const innerType1Res = CLTypeHelper.fromBytes(rem);
        if (innerType1Res.hasError()) {
          return Result.Err(innerType1Res.error);
        }

        const innerType2Res = CLTypeHelper.fromBytes(innerType1Res.remainder);
        if (innerType2Res.hasError()) {
          return Result.Err(innerType2Res.error);
        }

        return Result.Ok(
          CLTypeHelper.tuple2(innerType1Res.value, innerType2Res.value),
          innerType2Res.remainder
        );
      }
      case ComplexType.Tuple3: {
        // 3 inner types
        const innerType1Res = CLTypeHelper.fromBytes(rem);
        if (innerType1Res.hasError()) {
          return Result.Err(innerType1Res.error);
        }

        const innerType2Res = CLTypeHelper.fromBytes(innerType1Res.remainder);
        if (innerType2Res.hasError()) {
          return Result.Err(innerType2Res.error);
        }

        const innerType3Res = CLTypeHelper.fromBytes(innerType1Res.remainder);
        if (innerType3Res.hasError()) {
          return Result.Err(innerType3Res.error);
        }

        return Result.Ok(
          CLTypeHelper.tuple3(
            innerType1Res.value,
            innerType2Res.value,
            innerType3Res.value
          ),
          innerType3Res.remainder
        );
      }
      case ComplexType.Any:
        // todo(abner) support Any
        throw new Error('Any type is unsupported now');
        break;
      default:
        return Result.Err(FromBytesError.FormattingError);
    }
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

@staticImplements<BytesDeserializableStatic<ByteArrayValue>>()
class ByteArrayValue extends CLTypedAndToBytes {
  constructor(public rawBytes: ByteArray) {
    super();
  }

  public clType(): CLType {
    return CLTypeHelper.byteArray(this.rawBytes.length);
  }

  public toBytes(): ByteArray {
    return toBytesBytesArray(this.rawBytes);
  }

  public static fromBytes(bytes: ByteArray): Result<ByteArrayValue> {
    const u32Res = U32.fromBytes(bytes);
    if (u32Res.hasError()) {
      return Result.Err(u32Res.error);
    }
    const size = u32Res.value.value as number;
    if (u32Res.remainder.length < size) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const b = new ByteArrayValue(u32Res.remainder.subarray(0, length));
    const rem = u32Res.remainder.subarray(length);
    return Result.Ok(b, rem);
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

  public static tuple2(t0: CLTypedAndToBytes, t1: CLTypedAndToBytes) {
    return new Tuple2(t0, t1);
  }

  public static tuple3(
    t0: CLTypedAndToBytes,
    t1: CLTypedAndToBytes,
    t2: CLTypedAndToBytes
  ) {
    return new Tuple3(t0, t1, t2);
  }

  public static option(t: CLTypedAndToBytes | null, innerType?: CLType) {
    return new Option(t, innerType);
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

  public static fromBytes(bytes: ByteArray): Result<CLValue> {
    const bytesRes = ByteArrayValue.fromBytes(bytes);
    if (bytesRes.hasError()) {
      return Result.Err(bytesRes.error);
    }
    const clTypeRes = CLTypeHelper.fromBytes(bytesRes.remainder);
    if (clTypeRes.hasError()) {
      return Result.Err(clTypeRes.error);
    }
    const clValue = new CLValue(bytesRes.value.rawBytes, clTypeRes.value);
    return Result.Ok(clValue, clTypeRes.remainder);
  }

  public static bool = (b: boolean) => {
    return CLValue.fromT(new Bool(b));
  };

  public static u8 = (u8: number) => {
    return CLValue.fromT(new U8(u8));
  };

  public static u32 = (u32: number) => {
    return CLValue.fromT(new U32(u32));
  };

  public static i32 = (i32: number) => {
    return CLValue.fromT(new I32(i32));
  };

  public static u64 = (u64: BigNumberish) => {
    return CLValue.fromT(new U64(u64));
  };

  public static i64 = (i64: BigNumberish) => {
    return CLValue.fromT(new I64(i64));
  };

  public static u128 = (u128: BigNumberish) => {
    return CLValue.fromT(new U128(u128));
  };

  public static u256 = (u256: BigNumberish) => {
    return CLValue.fromT(new U256(u256));
  };

  public static u512 = (u512: BigNumberish) => {
    return CLValue.fromT(new U512(u512));
  };

  public static unit = () => {
    return CLValue.fromT(new Unit());
  };

  public static string = (x: string) => {
    return CLValue.fromT(new StringValue(x));
  };

  public static key = (key: KeyValue) => {
    return CLValue.fromT(key);
  };

  public static uref = (uRef: URef) => {
    return CLValue.fromT(uRef);
  };

  public static stringList = (strings: string[]) => {
    return new CLValue(
      toBytesStringList(strings),
      CLTypeHelper.list(SimpleType.String)
    );
  };

  public static list<T extends CLTypedAndToBytes>(vec: T[]) {
    return CLValue.fromT(new List(vec));
  }

  public static tuple1<T extends CLTypedAndToBytes>(t0: T) {
    return CLValue.fromT(new Tuple1(t0));
  }

  public static tuple2<T extends CLTypedAndToBytes>(t0: T, t1: T) {
    return CLValue.fromT(new Tuple2(t0, t1));
  }

  public static tuple3<T extends CLTypedAndToBytes>(t0: T, t1: T, t2: T) {
    return CLValue.fromT(new Tuple3(t0, t1, t2));
  }

  public static option(t: CLTypedAndToBytes | null, innerType?: CLType) {
    return CLValue.fromT(new Option(t, innerType));
  }

  public static map(mapEntries: MapEntry[]) {
    return CLValue.fromT(new MapValue(mapEntries));
  }

  public static publicKey(publicKey: ByteArray) {
    return CLValue.fromT(PublicKey.fromEd25519(publicKey));
  }

  public static byteArray(bytes: ByteArray) {
    return CLValue.fromT(new ByteArrayValue(bytes));
  }
}

export enum KeyVariant {
  /** The Account variant */
  ACCOUNT_ID = 0,
  /** The Hash variant */
  HASH_ID = 1,
  /** The URef variant */
  UREF_ID = 2

  // todo(abner) support the new introduced variants
  /**  The Transfer variant */
  // TRANSFER_ID = 3,
  // DEPLOY_INFO_ID = 4,
  // ERA_INFO_ID = 5
}

/// The length in bytes of a [`AccountHash`].
const ACCOUNT_HASH_LENGTH: number = 32;

/** A cryptographic public key. */
@staticImplements<BytesDeserializableStatic<AccountHash>>()
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

  public static fromBytes(bytes: ByteArray): Result<AccountHash> {
    if (bytes.length < ACCOUNT_HASH_LENGTH) {
      return Result.Err<AccountHash>(FromBytesError.EarlyEndOfStream);
    }

    const accountHashBytes = bytes.subarray(0, ACCOUNT_HASH_LENGTH);
    const accountHash = new AccountHash(accountHashBytes);
    return Result.Ok<AccountHash>(
      accountHash,
      bytes.subarray(ACCOUNT_HASH_LENGTH)
    );
  }
}

/**
 * The type under which data (e.g. [[CLValue]]s, smart contracts, user accounts)
 * are indexed on the network.
 */
@staticImplements<BytesDeserializableStatic<KeyValue>>()
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

  public static fromBytes(bytes: ByteArray): Result<KeyValue> {
    if (bytes.length < 1) {
      return Result.Err(FromBytesError.EarlyEndOfStream);
    }
    const tag = bytes[0];
    let currentPos = 1;

    if (tag === KeyVariant.HASH_ID) {
      const hashBytes = bytes.subarray(currentPos, 32 + currentPos);
      currentPos += 32;
      const key = KeyValue.fromHash(hashBytes);
      return Result.Ok<KeyValue>(key, bytes.subarray(currentPos));
    } else if (tag === KeyVariant.UREF_ID) {
      const urefBytes = bytes.subarray(1);
      const urefResult = URef.fromBytes(urefBytes);
      if (urefResult.hasError()) {
        return Result.Err<KeyValue>(urefResult.error);
      }
      const key = KeyValue.fromURef(urefResult.value);
      return Result.Ok(key, urefResult.remainder);
    } else if (tag === KeyVariant.ACCOUNT_ID) {
      const accountHashBytes = bytes.subarray(1);
      const accountHashResult = AccountHash.fromBytes(accountHashBytes);
      if (accountHashResult.hasError()) {
        return Result.Err(accountHashResult.error);
      }
      const key = KeyValue.fromAccount(accountHashResult.value);
      return Result.Ok(key, accountHashResult.remainder);
    } else {
      return Result.Err(FromBytesError.FormattingError);
    }
  }
}

const FORMATTED_STRING_PREFIX: string = 'uref-';
/**
 * Length of [[URef]] address field.
 * @internal
 */
const UREF_ADDR_LENGTH = 32;
/**
 * Length of [[ACCESS_RIGHT]] field.
 * @internal
 */
const ACCESS_RIGHT_LENGTH = 1;

const UREF_BYTES_LENGTH = UREF_ADDR_LENGTH + ACCESS_RIGHT_LENGTH;

export enum AccessRights {
  // No permissions
  None = 0b0,
  // Permission to read the value under the associated [[URef]].
  READ = 0b001,
  // Permission to write a value under the associated [[URef]].
  WRITE = 0b010,
  // Permission to add to the value under the associated [[URef]].
  ADD = 0b100,
  // Permission to read or write the value under the associated [[URef]].
  READ_WRITE = AccessRights.READ | AccessRights.WRITE,
  // Permission to read or add to the value under the associated [[URef]].
  READ_ADD = AccessRights.READ | AccessRights.ADD,
  // Permission to add to, or write the value under the associated [[URef]].
  ADD_WRITE = AccessRights.ADD | AccessRights.WRITE,
  // Permission to read, add to, or write the value under the associated [[URef]].
  READ_ADD_WRITE = AccessRights.READ | AccessRights.ADD | AccessRights.WRITE
}

@staticImplements<BytesDeserializableStatic<URef>>()
export class URef extends CLTypedAndToBytes {
  /**
   * Constructs new instance of URef.
   * @param uRefAddr Bytes representing address of the URef.
   * @param accessRights Access rights flag. Use [[AccessRights.NONE]] to indicate no permissions.
   */
  constructor(public uRefAddr: Uint8Array, public accessRights: AccessRights) {
    super();
    if (this.uRefAddr.byteLength !== 32) {
      throw new Error('The length of URefAddr should be 32');
    }
  }

  /**
   * Parses a casper-client supported string formatted argument into a `URef`.
   */
  public static fromFormattedStr(input: string) {
    if (!input.startsWith(FORMATTED_STRING_PREFIX)) {
      throw new Error("prefix is not 'uref-'");
    }
    const parts = input.substring(FORMATTED_STRING_PREFIX.length).split('-', 2);
    if (parts.length !== 2) {
      throw new Error('no access rights as suffix');
    }

    const addr = decodeBase16(parts[0]);
    const accessRight = parseInt(parts[1], 8) as AccessRights;

    return new URef(addr, accessRight);
  }

  /**
   * Serializes the URef into an array of bytes that represents it in the Casper serialization
   * format.
   */
  public toBytes(): ByteArray {
    return concat([this.uRefAddr, Uint8Array.from([this.accessRights])]);
  }

  public clType(): CLType {
    return CLTypeHelper.uRef();
  }

  public static fromBytes(bytes: ByteArray): Result<URef> {
    if (bytes.length < UREF_BYTES_LENGTH) {
      return Result.Err<URef>(FromBytesError.EarlyEndOfStream);
    }

    const urefBytes = bytes.subarray(0, UREF_ADDR_LENGTH);
    const accessRights = bytes[UREF_BYTES_LENGTH - 1];
    const uref = new URef(urefBytes, accessRights);
    return Result.Ok(uref, bytes.subarray(UREF_BYTES_LENGTH));
  }
}

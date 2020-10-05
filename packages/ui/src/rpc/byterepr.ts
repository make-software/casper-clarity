// migrate from casper-types/bytesrepr.rs
// https://github.com/CasperLabs/casper-node/blob/4b9f01463845120f6c428a08e108da67b448abb1/types/src/bytesrepr.rs

'use strict';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { MaxUint256, NegativeOne, One, Zero } from '@ethersproject/constants';

import { arrayify, concat } from '@ethersproject/bytes';

interface CLTyped {
  clType: CLType;
}

interface ToBytes {
  toBytes: () => ByteArray;
}

// CLTyped, ToBytes
interface CLValue extends CLTyped, ToBytes {}
// todo(abner): supports Option<T>, Result<T,E>, unit
abstract class NumberCoder implements CLValue {
  readonly bitSize: number;
  readonly signed: boolean;
  readonly value: BigNumberish;
  readonly name: string;

  protected constructor(bitSize: number, signed: boolean, value: BigNumberish) {
    this.name = (signed ? 'i' : 'u') + bitSize;
    this.bitSize = bitSize;
    this.signed = signed;
    this.value = value;
  }

  toBytes = (): ByteArray => {
    let v = BigNumber.from(this.value);

    // Check bounds are safe for encoding
    let maxUintValue = MaxUint256.mask(this.bitSize);
    if (this.signed) {
      let bounds = maxUintValue.mask(this.bitSize - 1);
      if (v.gt(bounds) || v.lt(bounds.add(One).mul(NegativeOne))) {
        throw new Error('value out-of-bounds, value: ' + this.value);
      }
    } else if (v.lt(Zero) || v.gt(maxUintValue.mask(this.bitSize))) {
      throw new Error('value out-of-bounds, value: ' + this.value);
    }
    v = v.toTwos(this.bitSize).mask(this.bitSize);
    let bytes = arrayify(v);
    if (v.gt(0)) {
      // for unsigned number, we had to deal with paddings
      if (this.bitSize > 64) {
        // for u128, u256, u512, we have to and append extra byte for length
        return concat([bytes, Uint8Array.from([bytes.length])]).reverse();
      } else {
        // for other types, we have to add padding 0s
        const byteLength = this.bitSize / 8;
        return concat([
          bytes.reverse(),
          new Uint8Array(byteLength - bytes.length)
        ]);
      }
    } else {
      return bytes.reverse();
    }
  };
  abstract get clType(): CLType;
}

class Bool implements CLValue {
  constructor(private b: boolean) {}
  toBytes(): ByteArray {
    return new Uint8Array([this.b ? 1 : 0]);
  }
  get clType(): CLType {
    return SimpleType.Bool;
  }
}

class U8 extends NumberCoder {
  constructor(u8: number) {
    super(8, false, u8);
  }
  get clType(): CLType {
    return SimpleType.U8;
  }
}

class U32 extends NumberCoder {
  constructor(n: number) {
    super(32, false, n);
  }
  get clType(): CLType {
    return SimpleType.U32;
  }
}

class I32 extends NumberCoder {
  constructor(n: number) {
    super(32, true, n);
  }
  get clType(): CLType {
    return SimpleType.I32;
  }
}

class U64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, false, n);
  }

  get clType(): CLType {
    return SimpleType.U64;
  }
}

class I64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, true, n);
  }

  get clType(): CLType {
    return SimpleType.I64;
  }
}

class U128 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(128, false, n);
  }

  get clType(): CLType {
    return SimpleType.U128;
  }
}

class U256 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(256, false, n);
  }

  get clType(): CLType {
    return SimpleType.U256;
  }
}

class U512 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(512, false, n);
  }

  get clType(): CLType {
    return SimpleType.U512;
  }
}

class StringValue implements CLValue {
  constructor(private str: string) {}
  toBytes = () => {
    const arr = Uint8Array.from(Buffer.from(this.str));
    return concat([CLValues.u32(arr.length).toBytes(), arr]);
  };

  get clType(): CLType {
    return SimpleType.String;
  }
}

abstract class KeyLike implements CLValue {
  abstract readonly tag: number;
  abstract toBytes(): ByteArray;
  get clType(): CLType {
    return SimpleType.Key;
  }
}

class KeyAccount extends KeyLike {
  tag = 0;
  constructor(private accountHashBytes: ByteArray) {
    super();
    if (this.accountHashBytes.byteLength !== 32) {
      throw new Error('The length of accountHash should be 32');
    }
  }

  toBytes(): ByteArray {
    return concat([Uint8Array.from([this.tag]), this.accountHashBytes]);
  }
}

class KeyHash extends KeyLike {
  readonly tag: number = 1;
  constructor(private hash: Uint8Array) {
    super();
    if (this.hash.byteLength !== 32) {
      throw new Error('The length of Hash should be 32');
    }
  }

  toBytes(): ByteArray {
    return concat([Uint8Array.from([this.tag]), this.hash]);
  }
}

enum AccessRight {
  None = 0b0,
  READ = 0b001,
  WRITE = 0b010,
  ADD = 0b100,
  READ_ADD = AccessRight.READ | AccessRight.ADD,
  READ_WRITE = AccessRight.READ | AccessRight.WRITE,
  ADD_WRITE = AccessRight.ADD | AccessRight.WRITE,
  READ_ADD_WRITE = AccessRight.READ | AccessRight.ADD | AccessRight.WRITE
}

class KeyURef extends KeyLike {
  readonly tag = 2;
  constructor(private URefAddr: Uint8Array, private accessRight: AccessRight) {
    super();
    if (this.URefAddr.byteLength !== 32) {
      throw new Error('The length of URefAddr should be 32');
    }
  }
  toBytes(): ByteArray {
    return concat([
      Uint8Array.from([this.tag]),
      this.URefAddr,
      Uint8Array.from([this.accessRight])
    ]);
  }
}

class URef implements CLValue {
  constructor(private URefAddr: Uint8Array, private accessRight: AccessRight) {
    if (this.URefAddr.byteLength !== 32) {
      throw new Error('The length of URefAddr should be 32');
    }
  }

  get clType(): CLType {
    return SimpleType.URef;
  }

  toBytes(): ByteArray {
    return concat([this.URefAddr, Uint8Array.from([this.accessRight])]);
  }
}

export class Key {
  static account(accountHash: ByteArray) {
    return new KeyAccount(accountHash);
  }
  static hash(hash: ByteArray) {
    return new KeyHash(hash);
  }
  static uRef(URefAddr: ByteArray, accessRight: AccessRight) {
    return new KeyURef(URefAddr, accessRight);
  }
}

function vecToBytes<T extends CLValue>(vec: T[]) {
  const valueByteList = vec.map(e => e.toBytes());
  valueByteList.splice(0, 0, CLValues.u32(vec.length).toBytes());

  return concat(valueByteList);
}

class List<T extends CLValue> implements CLValue {
  // todo(abner) implement EmptyList
  constructor(private vec: T[]) {
    if (vec.length === 0) {
      throw new Error('');
    }
  }

  toBytes(): ByteArray {
    return vecToBytes(this.vec);
  }

  get clType(): CLType {
    return new ListType(this.vec[0].clType);
  }
}

type SupportArrayLen =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 64
  | 128
  | 256
  | 512;

class FixedList<T extends CLValue> implements CLValue {
  private readonly size: number;
  private vec: T[];
  // todo(abner) implements EmptyFixedList
  constructor(size: SupportArrayLen, vec: T[]) {
    if (size !== vec.length) {
      throw new Error('The size is not equal to the length of vec');
    }
    this.size = size;
    this.vec = vec;
  }
  toBytes(): ByteArray {
    const v = this.vec.map(e => e.toBytes());
    return concat(v);
  }

  get clType(): CLType {
    return new FixedListType(this.vec[0].clType, this.size);
  }
}

class Tuple1 implements CLValue {
  constructor(private v0: CLValue) {}

  toBytes(): ByteArray {
    return this.v0.toBytes();
  }

  get clType(): CLType {
    return new Tuple1Type(this.v0.clType);
  }
}

class Tuple2 implements CLValue {
  constructor(private v0: CLValue, private v1: CLValue) {}

  toBytes(): ByteArray {
    return concat([this.v0.toBytes(), this.v1.toBytes()]);
  }

  get clType(): CLType {
    return new Tuple2Type(this.v0.clType, this.v1.clType);
  }
}

class Tuple3 implements CLValue {
  constructor(private v0: CLValue, private v1: CLValue, private v2: CLValue) {}

  get clType(): CLType {
    return new Tuple3Type(this.v0.clType, this.v1.clType, this.v2.clType);
  }

  toBytes(): ByteArray {
    return concat([this.v0.toBytes(), this.v1.toBytes(), this.v2.toBytes()]);
  }
}

interface MapEntry {
  key: CLValue;
  value: CLValue;
}

class MapValue implements CLValue {
  // todo(abner) implements EmptyMapValue
  constructor(private v: MapEntry[]) {}
  toBytes(): ByteArray {
    const kvBytes: Uint8Array[] = this.v.flatMap(vv => {
      return [vv.key.toBytes(), vv.value.toBytes()];
    });
    kvBytes.splice(0, 0, CLValues.u32(this.v.length).toBytes());
    return concat(kvBytes);
  }
  get clType(): CLType {
    return new MapType(this.v[0].key.clType, this.v[0].value.clType);
  }
}

export class CLValues {
  static bool = (x: boolean) => {
    return new Bool(x);
  };

  static u8 = (x: number) => {
    return new U8(x);
  };

  static u32 = (x: number) => {
    return new U32(x);
  };

  static i32 = (x: number) => {
    return new I32(x);
  };

  static i64 = (x: BigNumberish) => {
    return new I64(x);
  };

  static u64 = (x: BigNumberish) => {
    return new U64(x);
  };

  static u128 = (x: BigNumberish) => {
    return new U128(x);
  };

  static u256 = (x: BigNumberish) => {
    return new U256(x);
  };

  static u512 = (x: BigNumberish) => {
    return new U512(x);
  };

  static string(x: string) {
    return new StringValue(x);
  }

  static list<T extends CLValue>(vec: T[]) {
    return new List(vec);
  }

  static fixedList<T extends CLValue>(size: SupportArrayLen, vec: T[]) {
    return new FixedList(size, vec);
  }

  static map(mapEntries: MapEntry[]) {
    return new MapValue(mapEntries);
  }

  static URef(uRefAddr: Uint8Array, accessRight: AccessRight) {
    return new URef(uRefAddr, accessRight);
  }

  static tuple1(t0: CLValue) {
    return new Tuple1(t0);
  }

  static tuple2(t0: CLValue, t1: CLValue) {
    return new Tuple2(t0, t1);
  }

  static tuple3(t0: CLValue, t1: CLValue, t2: CLValue) {
    return new Tuple3(t0, t1, t2);
  }
}

enum SimpleType {
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

class ListType {
  tag = 14;
  innerType: CLType;
  constructor(innerType: CLType) {
    this.innerType = innerType;
  }
}

class FixedListType {
  tag = 15;
  constructor(public innerType: CLType, public size: number) {}
}

class MapType {
  tag = 17;
  constructor(public keyType: CLType, public valueType: CLType) {}
}

class Tuple1Type {
  tag = 18;
  constructor(public t0: CLType) {}
}

class Tuple2Type {
  tag = 19;
  constructor(public t0: CLType, public t1: CLType) {}
}

class Tuple3Type {
  tag = 20;
  constructor(public t0: CLType, public t1: CLType, public t2: CLType) {}
}

type CLType =
  | SimpleType
  | ListType
  | FixedListType
  | MapType
  | Tuple1Type
  | Tuple2Type
  | Tuple3Type;

export class CLTypes {
  static toBytes(type: CLType): ByteArray {
    if (type instanceof ListType) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypes.toBytes(type.innerType)
      ]);
    } else if (type instanceof Tuple1Type) {
      return concat([Uint8Array.from([type.tag]), CLTypes.toBytes(type.t0)]);
    } else if (type instanceof Tuple2Type) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypes.toBytes(type.t0),
        CLTypes.toBytes(type.t1)
      ]);
    } else if (type instanceof Tuple3Type) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypes.toBytes(type.t0),
        CLTypes.toBytes(type.t1),
        CLTypes.toBytes(type.t2)
      ]);
    } else if (type instanceof FixedListType) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypes.toBytes(type.innerType),
        CLValues.u32(type.size).toBytes()
      ]);
    } else if (type instanceof MapType) {
      return concat([
        Uint8Array.from([type.tag]),
        CLTypes.toBytes(type.keyType),
        CLTypes.toBytes(type.valueType)
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
          throw new Error('error type');
      }
    }
  }
}

export class NamedArg implements ToBytes {
  private nameBytes: StringValue;
  constructor(public name: string, public value: CLValue) {
    this.nameBytes = CLValues.string(name);
  }

  toBytes(): ByteArray {
    return concat([this.nameBytes.toBytes(), this.value.toBytes()]);
  }
}

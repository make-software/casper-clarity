// migrate from casper-types/bytesrepr.rs
// https://github.com/CasperLabs/casper-node/blob/4b9f01463845120f6c428a08e108da67b448abb1/types/src/bytesrepr.rs

'use strict';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { MaxUint256, NegativeOne, One, Zero } from '@ethersproject/constants';

import { arrayify, concat } from '@ethersproject/bytes';

interface ToBytes {
  toBytes: () => ByteArray;
}
// todo(abner): supports Option<T>, Result<T,E>, unit
abstract class NumberCoder implements ToBytes {
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
}

class Bool implements ToBytes {
  constructor(private b: boolean) {}
  toBytes(): ByteArray {
    return new Uint8Array([this.b ? 1 : 0]);
  }
}

class U8 extends NumberCoder {
  constructor(u8: number) {
    super(8, false, u8);
  }
}

class U16 extends NumberCoder {
  constructor(n: number) {
    super(16, false, n);
  }
}

class U32 extends NumberCoder {
  constructor(n: number) {
    super(32, false, n);
  }
}

class I32 extends NumberCoder {
  constructor(n: number) {
    super(32, true, n);
  }
}

class U64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, false, n);
  }
}

class I64 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(64, true, n);
  }
}

class U128 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(128, false, n);
  }
}

class U256 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(256, false, n);
  }
}

class U512 extends NumberCoder {
  constructor(n: BigNumberish) {
    super(512, false, n);
  }
}

class StringValue implements ToBytes {
  constructor(private str: string) {}
  toBytes = () => {
    const arr = Uint8Array.from(Buffer.from(this.str));
    return concat([CLValues.u32(arr.length).toBytes(), arr]);
  };
}

function vecToBytes<T extends ToBytes>(vec: T[]) {
  const valueByteList = vec.map(e => e.toBytes());
  valueByteList.splice(0, 0, CLValues.u32(vec.length).toBytes());

  return concat(valueByteList);
}

class List<T extends ToBytes> implements ToBytes {
  constructor(private vec: T[]) {}

  toBytes(): ByteArray {
    return vecToBytes(this.vec);
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

class FixedList<T extends ToBytes> implements ToBytes {
  private size: number;
  private vec: T[];
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
}

class Tuple1 implements ToBytes {
  constructor(private v0: ToBytes) {}

  toBytes(): ByteArray {
    return this.v0.toBytes();
  }
}

class Tuple2 implements ToBytes {
  constructor(private v0: ToBytes, private v1: ToBytes) {}

  toBytes(): ByteArray {
    return concat([this.v0.toBytes(), this.v1.toBytes()]);
  }
}

class Tuple3 implements ToBytes {
  constructor(private v0: ToBytes, private v1: ToBytes, private v2: ToBytes) {}

  toBytes(): ByteArray {
    return concat([this.v0.toBytes(), this.v1.toBytes(), this.v2.toBytes()]);
  }
}

interface MapEntry {
  key: ToBytes;
  value: ToBytes;
}

class MapValue implements ToBytes {
  constructor(private v: MapEntry[]) {}
  toBytes(): ByteArray {
    const kvBytes: Uint8Array[] = this.v.flatMap(vv => {
      return [vv.key.toBytes(), vv.value.toBytes()];
    });
    kvBytes.splice(0, 0, CLValues.u32(this.v.length).toBytes());
    return concat(kvBytes);
  }
}

export class CLValues {
  static bool = (x: boolean) => {
    return new Bool(x);
  };

  static u8 = (x: number) => {
    return new U8(x);
  };

  static u16 = (x: number) => {
    return new U16(x);
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

  static list<T extends ToBytes>(vec: T[]) {
    return new List(vec);
  }

  static fixedList<T extends ToBytes>(size: SupportArrayLen, vec: T[]) {
    return new FixedList(size, vec);
  }

  static map(mapEntries: MapEntry[]) {
    return new MapValue(mapEntries);
  }

  static tuple1(t0: ToBytes) {
    return new Tuple1(t0);
  }

  static tuple2(t0: ToBytes, t1: ToBytes) {
    return new Tuple2(t0, t1);
  }

  static tuple3(t0: ToBytes, t1: ToBytes, t2: ToBytes) {
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

// export class Instances {
//   static bool = toCLValueInstance<boolean>((value, x) => {
//     value.setClType(Types.bool());
//     value.setValue(Values.bool(x));
//   });
//
//   static i32 = toCLValueInstance<number>((value, x) => {
//     value.setClType(Types.i32());
//     value.setValue(Values.i32(x));
//   });
//
//   static i64 = toCLValueInstance<number>((value, x) => {
//     value.setClType(Types.i64());
//     value.setValue(Values.i64(x));
//   });
//
//   static u8 = toCLValueInstance<number>((value, x) => {
//     value.setClType(Types.u8());
//     value.setValue(Values.u8(x));
//   });
//
//   static u32 = toCLValueInstance<number>((value, x) => {
//     value.setClType(Types.u32());
//     value.setValue(Values.u32(x));
//   });
//
//   static u64 = toCLValueInstance<number>((value, x) => {
//     value.setClType(Types.u64());
//     value.setValue(Values.u64(x));
//   });
//
//   static u128 = toCLValueInstance<bigint | JSBI>((value, x) => {
//     value.setClType(Types.u128());
//     value.setValue(Values.u128(x));
//   });
//
//   static u256 = toCLValueInstance<bigint | JSBI>((value, x) => {
//     value.setClType(Types.u256());
//     value.setValue(Values.u256(x));
//   });
//
//   static u512 = toCLValueInstance<bigint | JSBI>((value, x) => {
//     value.setClType(Types.u512());
//     value.setValue(Values.u512(x));
//   });
//
//   static unit() {
//     const value = new CLValueInstance();
//     value.setClType(Types.unit());
//     value.setValue(Values.unit());
//     return value;
//   }
//
//   static string = toCLValueInstance<string>((value, x) => {
//     value.setClType(Types.string());
//     value.setValue(Values.string(x));
//   });
//
//   static bytes = toCLValueInstance<ByteArray>((value, x) => {
//     value.setClType(Types.bytes());
//     value.setValue(Values.bytes(x));
//   });
//
//   static bytesFixedLength = toCLValueInstance<ByteArray>((value, x) => {
//     value.setClType(Types.bytesFixedLength(x.byteLength));
//     value.setValue(Values.bytes(x));
//   });
//
//   static list = toCLValueInstance<CLValueInstance[]>((value, x) => {
//     if (x.length === 0 || x[0].getClType() === undefined) {
//       value.setClType(Types.list(Types.any()));
//     } else {
//       value.setClType(Types.list(x[0].getClType()!));
//     }
//     const innerELes = x
//       .filter(it => it.getValue() !== undefined)
//       .map(it => it.getValue()!);
//     value.setValue(Values.list(innerELes));
//   });
//
//   static fixedList = toCLValueInstance<CLValueInstance[]>((value, x) => {
//     if (x.length === 0 || x[0].getClType() === undefined) {
//       value.setClType(Types.fixedList(Types.any(), x.length));
//     } else {
//       value.setClType(Types.fixedList(x[0].getClType()!, x.length));
//     }
//     const innerELes = x
//       .filter(it => it.getValue() !== undefined)
//       .map(it => it.getValue()!);
//     value.setValue(Values.fixedList(innerELes));
//   });
//
//   static tuple1(t0: CLValueInstance) {
//     const t = new CLValueInstance();
//     t.setClType(Types.tuple1(t0.getClType()));
//     t.setValue(Values.tuple1(t0.getValue()));
//     return t;
//   }
//
//   static tuple2(t0: CLValueInstance, t1: CLValueInstance) {
//     const t = new CLValueInstance();
//     t.setClType(Types.tuple2(t0.getClType(), t1.getClType()));
//     t.setValue(Values.tuple2(t0.getValue(), t1.getValue()));
//     return t;
//   }
//
//   static tuple3(t0: CLValueInstance, t1: CLValueInstance, t2: CLValueInstance) {
//     const t = new CLValueInstance();
//     t.setClType(Types.tuple3(t0.getClType(), t1.getClType(), t2.getClType()));
//     t.setValue(Values.tuple3(t0.getValue(), t1.getValue(), t2.getValue()));
//     return t;
//   }
//
//   static map(eles: [CLValueInstance, CLValueInstance][]) {
//     for (let i = 0; i < eles.length - 1; i++) {
//       if (
//         eles[i][0]?.getClType()?.toString() !==
//         eles[i + 1][0]?.getClType()?.toString()
//       ) {
//         throw new Error('the type of keys should be the same');
//       }
//       if (
//         eles[i][1]?.getClType()?.toString() !==
//         eles[i + 1][1]?.getClType()?.toString()
//       ) {
//         throw new Error('the type of values should be the same');
//       }
//     }
//     const t = new CLValueInstance();
//     t.setClType(Types.map(eles[0][0].getClType()!, eles[0][1].getClType()!));
//
//     const clValue = new CLValueInstance.Value();
//     const mapEntries = eles.map(e => {
//       const entry = new CLValueInstance.MapEntry();
//       entry.setKey(e[0].getValue());
//       entry.setValue(e[1].getValue());
//       return entry;
//     });
//     const mapValue = new CLValueInstance.Map();
//     mapValue.setValuesList(mapEntries);
//     clValue.setMapValue(mapValue);
//     t.setValue(clValue);
//     return t;
//   }
//
//   static listEmpty(innerType: CLType) {
//     const t = new CLValueInstance();
//     t.setClType(Types.list(innerType));
//     t.setValue(Values.list([]));
//     return t;
//   }
//
//   static fixedListEmpty(innerType: CLType) {
//     const t = new CLValueInstance();
//     t.setClType(Types.fixedList(innerType, 0));
//     t.setValue(Values.fixedList([]));
//     return t;
//   }
//
//   static mapEmpty(keyType: CLType, valueType: CLType) {
//     const t = new CLValueInstance();
//     t.setClType(Types.map(keyType, valueType));
//     t.setValue(Values.map([]));
//     return t;
//   }
// }

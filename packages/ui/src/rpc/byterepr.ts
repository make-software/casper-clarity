// migrate from casper-types/bytesrepr.rs
// https://github.com/CasperLabs/casper-node/blob/4b9f01463845120f6c428a08e108da67b448abb1/types/src/bytesrepr.rs

'use strict';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { MaxUint256, NegativeOne, One, Zero } from '@ethersproject/constants';

import { arrayify, concat } from '@ethersproject/bytes';

interface ToBytes {
  toBytes: () => ByteArray;
}

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
    return Uint8Array.from(Buffer.from(this.str));
  };
}

export class CLValue {
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

  // static unit() {
  //   const value = new CLValueInstance.Value();
  //   value.setUnit(new Unit());
  //   return value;
  // }

  static string(x: string) {
    return new StringValue(x);
  }

  // static bytes = Values.toValue<ByteArray>((v, x) => {
  //   v.setBytesValue(x);
  // });

  // static list = Values.toValue<CLValueInstance.Value[]>((v, x) => {
  //   const list = new CLValueInstance.List();
  //   list.setValuesList(x);
  //   v.setListValue(list);
  // });

  // static fixedList = Values.toValue<CLValueInstance.Value[]>((v, x) => {
  //   const fixedList = new CLValueInstance.FixedList();
  //   fixedList.setLength(x.length);
  //   fixedList.setValuesList(x);
  //   v.setFixedListValue(fixedList);
  // });

  // static map = Values.toValue<CLValueInstance.MapEntry[]>((v, x) => {
  //   const map = new CLValueInstance.Map();
  //   map.setValuesList(x);
  //   v.setMapValue(map);
  // });

  // static tuple1(t0?: CLValueInstance.Value) {
  //   const value = new CLValueInstance.Value();
  //   const tuple1 = new CLValueInstance.Tuple1();
  //   tuple1.setValue1(t0);
  //   value.setTuple1Value(tuple1);
  //   return value;
  // }

  // static tuple2(t0?: CLValueInstance.Value, t1?: CLValueInstance.Value) {
  //   const value = new CLValueInstance.Value();
  //   const tuple2 = new CLValueInstance.Tuple2();
  //   tuple2.setValue1(t0);
  //   tuple2.setValue2(t1);
  //   value.setTuple2Value(tuple2);
  //   return value;
  // }

  // static tuple3(
  //   t0?: CLValueInstance.Value,
  //   t1?: CLValueInstance.Value,
  //   t2?: CLValueInstance.Value
  // ) {
  //   const value = new CLValueInstance.Value();
  //   const tuple3 = new CLValueInstance.Tuple3();
  //   tuple3.setValue1(t0);
  //   tuple3.setValue2(t1);
  //   tuple3.setValue3(t2);
  //   value.setTuple3Value(tuple3);
  //   return value;
  // }
}

// function toCLValueInstance<T>(
//   set: (value: CLValueInstance, x: T) => void
// ): ToValue<T> {
//   return (x: T) => {
//     const value = new CLValueInstance();
//     set(value, x);
//     return value;
//   };
// }
//
// export const BytesValue = toCLValueInstance<ByteArray>((value, x) => {
//   const innerType = new CLType();
//   innerType.setSimpleType(CLType.Simple.U8);
//   const t = new CLType();
//   const fixedListType = new CLType.FixedList();
//   fixedListType.setInner(innerType);
//   fixedListType.setLen(x.length);
//   t.setFixedListType(fixedListType);
//
//   const v = new CLValueInstance.Value();
//   const fixedListValue = new CLValueInstance.FixedList();
//   const bytes = Array.from(x, b => {
//     const byteValue = new CLValueInstance.Value();
//     byteValue.setU8(b);
//     return byteValue;
//   });
//   fixedListValue.setLength(bytes.length);
//   fixedListValue.setValuesList(bytes);
//   v.setFixedListValue(fixedListValue);
//
//   value.setClType(t);
//   value.setValue(v);
//
//   return value;
// });
//
// export const BigIntValue = toCLValueInstance<bigint | JSBI>((value, x) => {
//   const t = new CLType();
//   t.setSimpleType(CLType.Simple.U512);
//
//   const v = new CLValueInstance.Value();
//   const n = new CLValueInstance.U512();
//   n.setValue(x.toString());
//   v.setU512(n);
//
//   value.setClType(t);
//   value.setValue(v);
//
//   return value;
// });
//
// export class Types {
//   private static simpleType(type: CLType.SimpleMap[keyof CLType.SimpleMap]) {
//     const t = new CLType();
//     t.setSimpleType(type);
//     return t;
//   }
//
//   static bool() {
//     return Types.simpleType(CLType.Simple.BOOL);
//   }
//
//   static i32() {
//     return Types.simpleType(CLType.Simple.I32);
//   }
//
//   static i64() {
//     return Types.simpleType(CLType.Simple.I64);
//   }
//
//   static u8() {
//     return Types.simpleType(CLType.Simple.U8);
//   }
//
//   static u32() {
//     return Types.simpleType(CLType.Simple.U32);
//   }
//
//   static u64() {
//     return Types.simpleType(CLType.Simple.U64);
//   }
//
//   static u128() {
//     return Types.simpleType(CLType.Simple.U128);
//   }
//
//   static u256() {
//     return Types.simpleType(CLType.Simple.U256);
//   }
//
//   static u512() {
//     return Types.simpleType(CLType.Simple.U512);
//   }
//
//   static unit() {
//     return Types.simpleType(CLType.Simple.UNIT);
//   }
//
//   static string() {
//     return Types.simpleType(CLType.Simple.STRING);
//   }
//
//   static key() {
//     return Types.simpleType(CLType.Simple.KEY);
//   }
//
//   static uref() {
//     return Types.simpleType(CLType.Simple.UREF);
//   }
//
//   static bytes() {
//     return Types.list(Types.u8());
//   }
//
//   static bytesFixedLength(len: number) {
//     return Types.fixedList(Types.u8(), len);
//   }
//
//   static list(inner: CLType) {
//     const t = new CLType();
//     const innerListType = new CLType.List();
//     innerListType.setInner(inner);
//     t.setListType(innerListType);
//     return t;
//   }
//
//   static fixedList(inner: CLType, len: number) {
//     const t = new CLType();
//     const innerFixedListType = new CLType.FixedList();
//     innerFixedListType.setInner(inner);
//     innerFixedListType.setLen(len);
//     t.setFixedListType(innerFixedListType);
//     return t;
//   }
//
//   static map(key: CLType, value: CLType) {
//     const t = new CLType();
//     const innerType = new CLType.Map();
//     innerType.setKey(key);
//     innerType.setValue(value);
//     t.setMapType(innerType);
//     return t;
//   }
//
//   static tuple1(t0?: CLType) {
//     const t = new CLType();
//     const innerType = new CLType.Tuple1();
//     innerType.setType0(t0);
//     t.setTuple1Type(innerType);
//     return t;
//   }
//
//   static tuple2(t0?: CLType, t1?: CLType) {
//     const t = new CLType();
//     const innerType = new CLType.Tuple2();
//     innerType.setType0(t0);
//     innerType.setType1(t1);
//     t.setTuple2Type(innerType);
//     return t;
//   }
//
//   static tuple3(t0?: CLType, t1?: CLType, t2?: CLType) {
//     const t = new CLType();
//     const innerType = new CLType.Tuple3();
//     innerType.setType0(t0);
//     innerType.setType1(t1);
//     innerType.setType2(t2);
//     t.setTuple3Type(innerType);
//     return t;
//   }
//
//   static any() {
//     const t = new CLType();
//     const anyType = new CLType.Any();
//     t.setAnyType(anyType);
//     return t;
//   }
// }
//
// export class Values {
//   static toValue<T>(
//     set: (value: CLValueInstance.Value, x: T) => void
//   ): (x: T) => CLValueInstance.Value {
//     return (x: T) => {
//       const value = new CLValueInstance.Value();
//       set(value, x);
//       return value;
//     };
//   }
// }
//
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

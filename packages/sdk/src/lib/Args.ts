import { Deploy } from 'casperlabs-grpc/io/casperlabs/casper/consensus/consensus_pb';
import {
  CLType,
  CLValueInstance,
  Unit
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import JSBI from 'jsbi';
import { ByteArray } from '../index';

// Functions to convert data to protobuf Deploy.Arg

type ToValue<T> = (x: T) => CLValueInstance;

function toCLValueInstance<T>(
  set: (value: CLValueInstance, x: T) => void
): ToValue<T> {
  return (x: T) => {
    const value = new CLValueInstance();
    set(value, x);
    return value;
  };
}

export const BytesValue = toCLValueInstance<ByteArray>((value, x) => {
  const innerType = new CLType();
  innerType.setSimpleType(CLType.Simple.U8);
  const t = new CLType();
  const fixedListType = new CLType.FixedList();
  fixedListType.setInner(innerType);
  fixedListType.setLen(x.length);
  t.setFixedListType(fixedListType);

  const v = new CLValueInstance.Value();
  const fixedListValue = new CLValueInstance.FixedList();
  const bytes = Array.from(x, b => {
    const byteValue = new CLValueInstance.Value();
    byteValue.setU8(b);
    return byteValue;
  });
  fixedListValue.setLength(bytes.length);
  fixedListValue.setValuesList(bytes);
  v.setFixedListValue(fixedListValue);

  value.setClType(t);
  value.setValue(v);

  return value;
});

export const BigIntValue = toCLValueInstance<bigint | JSBI>((value, x) => {
  const t = new CLType();
  t.setSimpleType(CLType.Simple.U512);

  const v = new CLValueInstance.Value();
  const n = new CLValueInstance.U512();
  n.setValue(x.toString());
  v.setU512(n);

  value.setClType(t);
  value.setValue(v);

  return value;
});

export class Types {
  private static simpleType(type: CLType.SimpleMap[keyof CLType.SimpleMap]) {
    const t = new CLType();
    t.setSimpleType(type);
    return t;
  }

  static bool() {
    return Types.simpleType(CLType.Simple.BOOL);
  }

  static i32() {
    return Types.simpleType(CLType.Simple.I32);
  }

  static i64() {
    return Types.simpleType(CLType.Simple.I64);
  }

  static u8() {
    return Types.simpleType(CLType.Simple.U8);
  }

  static u32() {
    return Types.simpleType(CLType.Simple.U32);
  }

  static u64() {
    return Types.simpleType(CLType.Simple.U64);
  }

  static u128() {
    return Types.simpleType(CLType.Simple.U128);
  }

  static u256() {
    return Types.simpleType(CLType.Simple.U256);
  }

  static u512() {
    return Types.simpleType(CLType.Simple.U512);
  }

  static unit() {
    return Types.simpleType(CLType.Simple.UNIT);
  }

  static string() {
    return Types.simpleType(CLType.Simple.STRING);
  }

  static key() {
    return Types.simpleType(CLType.Simple.KEY);
  }

  static uref() {
    return Types.simpleType(CLType.Simple.UREF);
  }

  static list(inner: CLType) {
    const t = new CLType();
    const innerListType = new CLType.List();
    innerListType.setInner(inner);
    t.setListType(innerListType);
    return t;
  }

  static fixedList(inner: CLType, len: number) {
    const t = new CLType();
    const innerFixedListType = new CLType.FixedList();
    innerFixedListType.setInner(inner);
    innerFixedListType.setLen(len);
    t.setFixedListType(innerFixedListType);
    return t;
  }

  static map(key: CLType, value: CLType) {
    const t = new CLType();
    const innerType = new CLType.Map();
    innerType.setKey(key);
    innerType.setValue(value);
    t.setMapType(innerType);
    return t;
  }

  static tuple1(t0?: CLType) {
    const t = new CLType();
    const innerType = new CLType.Tuple1();
    innerType.setType0(t0);
    t.setTuple1Type(innerType);
    return t;
  }

  static tuple2(t0?: CLType, t1?: CLType) {
    const t = new CLType();
    const innerType = new CLType.Tuple2();
    innerType.setType0(t0);
    innerType.setType1(t1);
    t.setTuple2Type(innerType);
    return t;
  }

  static tuple3(t0?: CLType, t1?: CLType, t2?: CLType) {
    const t = new CLType();
    const innerType = new CLType.Tuple3();
    innerType.setType0(t0);
    innerType.setType1(t1);
    innerType.setType2(t2);
    t.setTuple3Type(innerType);
    return t;
  }

  static any() {
    const t = new CLType();
    const anyType = new CLType.Any();
    t.setAnyType(anyType);
    return t;
  }
}

export class Values {
  static toValue<T>(
    set: (value: CLValueInstance.Value, x: T) => void
  ): (x: T) => CLValueInstance.Value {
    return (x: T) => {
      const value = new CLValueInstance.Value();
      set(value, x);
      return value;
    };
  }

  static bool = Values.toValue<boolean>((v, x) => {
    v.setBoolValue(x);
  });

  static i32 = Values.toValue<number>((v, x) => {
    v.setI32(x);
  });

  static i64 = Values.toValue<number>((v, x) => {
    v.setI64(x);
  });

  static u8 = Values.toValue<number>((v, x) => {
    v.setU8(x);
  });

  static u32 = Values.toValue<number>((v, x) => {
    v.setU32(x);
  });

  static u64 = Values.toValue<number>((v, x) => {
    v.setU64(x);
  });

  static u128 = Values.toValue<bigint | JSBI>((v, x) => {
    const u128 = new CLValueInstance.U128();
    u128.setValue(x.toString());
    v.setU128(u128);
  });

  static u256 = Values.toValue<bigint | JSBI>((v, x) => {
    const u256 = new CLValueInstance.U256();
    u256.setValue(x.toString());
    v.setU256(u256);
  });

  static u512 = Values.toValue<bigint | JSBI>((v, x) => {
    const u512 = new CLValueInstance.U512();
    u512.setValue(x.toString());
    v.setU512(u512);
  });

  static unit() {
    const value = new CLValueInstance.Value();
    value.setUnit(new Unit());
    return value;
  }

  static string = Values.toValue<string>((v, x) => {
    v.setStrValue(x);
  });

  static bytes = Values.toValue<ByteArray>((v, x) => {
    v.setBytesValue(x);
  });

  static list = Values.toValue<CLValueInstance.Value[]>((v, x) => {
    const list = new CLValueInstance.List();
    list.setValuesList(x);
    v.setListValue(list);
  });

  static fixedList = Values.toValue<CLValueInstance.Value[]>((v, x) => {
    const fixedList = new CLValueInstance.FixedList();
    fixedList.setLength(x.length);
    fixedList.setValuesList(x);
    v.setFixedListValue(fixedList);
  });

  static map = Values.toValue<CLValueInstance.MapEntry[]>((v, x) => {
    const map = new CLValueInstance.Map();
    map.setValuesList(x);
    v.setMapValue(map);
  });

  static tuple1(t0?: CLValueInstance.Value) {
    const value = new CLValueInstance.Value();
    const tuple1 = new CLValueInstance.Tuple1();
    tuple1.setValue1(t0);
    value.setTuple1Value(tuple1);
    return value;
  }

  static tuple2(t0?: CLValueInstance.Value, t1?: CLValueInstance.Value) {
    const value = new CLValueInstance.Value();
    const tuple2 = new CLValueInstance.Tuple2();
    tuple2.setValue1(t0);
    tuple2.setValue2(t1);
    value.setTuple2Value(tuple2);
    return value;
  }

  static tuple3(
    t0?: CLValueInstance.Value,
    t1?: CLValueInstance.Value,
    t2?: CLValueInstance.Value
  ) {
    const value = new CLValueInstance.Value();
    const tuple3 = new CLValueInstance.Tuple3();
    tuple3.setValue1(t0);
    tuple3.setValue2(t1);
    tuple3.setValue3(t2);
    value.setTuple3Value(tuple3);
    return value;
  }
}

export class Instances {
  static bool = toCLValueInstance<boolean>((value, x) => {
    value.setClType(Types.bool());
    value.setValue(Values.bool(x));
  });

  static i32 = toCLValueInstance<number>((value, x) => {
    value.setClType(Types.i32());
    value.setValue(Values.i32(x));
  });

  static i64 = toCLValueInstance<number>((value, x) => {
    value.setClType(Types.i64());
    value.setValue(Values.i64(x));
  });

  static u8 = toCLValueInstance<number>((value, x) => {
    value.setClType(Types.u8());
    value.setValue(Values.u8(x));
  });

  static u32 = toCLValueInstance<number>((value, x) => {
    value.setClType(Types.u32());
    value.setValue(Values.u32(x));
  });

  static u64 = toCLValueInstance<number>((value, x) => {
    value.setClType(Types.u64());
    value.setValue(Values.u64(x));
  });

  static u128 = toCLValueInstance<bigint | JSBI>((value, x) => {
    value.setClType(Types.u128());
    value.setValue(Values.u128(x));
  });

  static u256 = toCLValueInstance<bigint | JSBI>((value, x) => {
    value.setClType(Types.u256());
    value.setValue(Values.u256(x));
  });

  static u512 = toCLValueInstance<bigint | JSBI>((value, x) => {
    value.setClType(Types.u512());
    value.setValue(Values.u512(x));
  });

  static unit() {
    const value = new CLValueInstance();
    value.setClType(Types.unit());
    value.setValue(Values.unit());
    return value;
  }

  static string = toCLValueInstance<string>((value, x) => {
    value.setClType(Types.string());
    value.setValue(Values.string(x));
  });

  static bytes = toCLValueInstance<ByteArray>((value, x) => {
    value.setClType(Types.list(Types.u8()));
    value.setValue(Values.bytes(x));
  });

  static bytesFixedLength = toCLValueInstance<ByteArray>((value, x) => {
    value.setClType(Types.fixedList(Types.u8(), x.byteLength));
    value.setValue(Values.bytes(x));
  });

  static list = toCLValueInstance<CLValueInstance[]>((value, x) => {
    if (x.length === 0 || x[0].getClType() === undefined) {
      value.setClType(Types.list(Types.any()));
    } else {
      value.setClType(Types.list(x[0].getClType()!));
    }
    const innerELes = x
      .filter(it => it.getValue() !== undefined)
      .map(it => it.getValue()!);
    value.setValue(Values.list(innerELes));
  });

  static fixedList = toCLValueInstance<CLValueInstance[]>((value, x) => {
    if (x.length === 0 || x[0].getClType() === undefined) {
      value.setClType(Types.fixedList(Types.any(), x.length));
    } else {
      value.setClType(Types.fixedList(x[0].getClType()!, x.length));
    }
    const innerELes = x
      .filter(it => it.getValue() !== undefined)
      .map(it => it.getValue()!);
    value.setValue(Values.fixedList(innerELes));
  });

  static tuple1(t0: CLValueInstance) {
    const t = new CLValueInstance();
    t.setClType(Types.tuple1(t0.getClType()));
    t.setValue(Values.tuple1(t0.getValue()));
    return t;
  }

  static tuple2(t0: CLValueInstance, t1: CLValueInstance) {
    const t = new CLValueInstance();
    t.setClType(Types.tuple2(t0.getClType(), t1.getClType()));
    t.setValue(Values.tuple2(t0.getValue(), t1.getValue()));
    return t;
  }

  static tuple3(t0: CLValueInstance, t1: CLValueInstance, t2: CLValueInstance) {
    const t = new CLValueInstance();
    t.setClType(Types.tuple3(t0.getClType(), t1.getClType(), t2.getClType()));
    t.setValue(Values.tuple3(t0.getValue(), t1.getValue(), t2.getValue()));
    return t;
  }

  static map(eles: [CLValueInstance, CLValueInstance][]) {
    for (let i = 0; i < eles.length - 1; i++) {
      if (
        eles[i][0]?.getClType()?.toString() !==
        eles[i + 1][0]?.getClType()?.toString()
      ) {
        throw new Error('the type of keys should be the same');
      }
      if (
        eles[i][1]?.getClType()?.toString() !==
        eles[i + 1][1]?.getClType()?.toString()
      ) {
        throw new Error('the type of values should be the same');
      }
    }
    const t = new CLValueInstance();
    t.setClType(Types.map(eles[0][0].getClType()!, eles[0][1].getClType()!));

    const clValue = new CLValueInstance.Value();
    const mapEntries = eles.map(e => {
      const entry = new CLValueInstance.MapEntry();
      entry.setKey(e[0].getValue());
      entry.setValue(e[1].getValue());
      return entry;
    });
    const mapValue = new CLValueInstance.Map();
    mapValue.setValuesList(mapEntries);
    clValue.setMapValue(mapValue);
    t.setValue(clValue);
    return t;
  }

  static mapEmpty(keyType: CLType, valueType: CLType) {
    const t = new CLValueInstance();
    t.setClType(Types.map(keyType, valueType));
    t.setValue(Values.map([]));
    return t;
  }
}

export const StringValue = toCLValueInstance<string>((value, x) => {
  const t = new CLType();
  t.setSimpleType(CLType.Simple.STRING);

  const v = new CLValueInstance.Value();
  v.setStrValue(x);

  value.setClType(t);
  value.setValue(v);

  return value;
});

export function Args(...args: [string, CLValueInstance][]): Deploy.Arg[] {
  return args.map(x => {
    const [name, value] = x;
    const arg = new Deploy.Arg();
    arg.setName(name);
    arg.setValue(value);
    return arg;
  });
}

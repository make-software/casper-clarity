import * as Arg from '../../src/lib/Args';
import { expect } from 'chai';
import { CLType } from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import JSBI from 'jsbi';

const address = Buffer.from(Array.from({ length: 32 }, (_, i) => i));
const addressHex = address.toString('hex');

describe('Arg DSL', () => {
  it('could create bool instance', () => {
    let bool = Arg.Instances.bool(true).toObject();
    expect(bool.clType?.simpleType).equal(CLType.Simple.BOOL);
    expect(bool.value?.boolValue).true;
  });

  it('could create number instances', () => {
    const u8 = Arg.Instances.u8(255).toObject();
    expect(u8.clType?.simpleType).eq(CLType.Simple.U8);
    expect(u8.value?.u8).eq(255);

    const u32 = Arg.Instances.u32(63358).toObject();
    expect(u32.clType?.simpleType).eq(CLType.Simple.U32);
    expect(u32.value?.u32).eq(63358);

    const i32 = Arg.Instances.i32(63358).toObject();
    expect(i32.clType?.simpleType).eq(CLType.Simple.I32);
    expect(i32.value?.i32).eq(63358);

    const u64 = Arg.Instances.u64(6335832332).toObject();
    expect(u64.clType?.simpleType).eq(CLType.Simple.U64);
    expect(u64.value?.u64).eq(6335832332);

    const i64 = Arg.Instances.i64(6335832332).toObject();
    expect(i64.clType?.simpleType).eq(CLType.Simple.I64);
    expect(i64.value?.i64).eq(6335832332);
  });

  it('should create BigInt', function() {
    const bigIntStr = '1000000000000000000000';
    const u128 = Arg.Instances.u128(JSBI.BigInt(bigIntStr)).toObject();
    expect(u128.clType?.simpleType).eq(CLType.Simple.U128);
    expect(u128.value?.u128?.value).eq(bigIntStr);

    const u256 = Arg.Instances.u256(JSBI.BigInt(bigIntStr)).toObject();
    expect(u256.clType?.simpleType).eq(CLType.Simple.U256);
    expect(u256.value?.u256?.value).eq(bigIntStr);

    const u512 = Arg.Instances.u512(JSBI.BigInt(bigIntStr)).toObject();
    expect(u512.clType?.simpleType).eq(CLType.Simple.U512);
    expect(u512.value?.u512?.value).eq(bigIntStr);
  });

  it('should create bytes and byteFixedLength instance', function() {
    const bytes = Arg.Instances.bytes(address).toObject();
    expect(bytes.clType?.listType?.inner?.simpleType).eq(CLType.Simple.U8);
    expect(
      Buffer.from(bytes.value?.bytesValue as string, 'base64').toString('hex')
    ).eq(addressHex);

    const bytesFixedLength = Arg.Instances.bytesFixedLength(address).toObject();
    expect(bytesFixedLength.clType?.fixedListType?.inner?.simpleType).eq(
      CLType.Simple.U8
    );
    expect(bytesFixedLength.clType?.fixedListType?.len).eq(32);
    expect(
      new Buffer(
        bytesFixedLength.value?.bytesValue as string,
        'base64'
      ).toString('hex')
    ).eq(addressHex);
  });

  it('should create string instance', function() {
    const str = Arg.Instances.string('test').toObject();
    expect(str.clType?.simpleType).eq(CLType.Simple.STRING);
  });

  it('should create list and listFixedLength instances', function() {
    const u8List = [
      Arg.Instances.u8(1),
      Arg.Instances.u8(2),
      Arg.Instances.u8(3)
    ];
    const list = Arg.Instances.list(u8List).toObject();

    expect(list.clType?.listType?.inner?.simpleType).eq(CLType.Simple.U8);
    const innerList = list.value?.listValue?.valuesList!;
    expect(innerList?.length).eq(u8List.length);
    expect(innerList[0].u8).eq(1);
    expect(innerList[1].u8).eq(2);
    expect(innerList[2].u8).eq(3);

    const fixedList = Arg.Instances.fixedList(u8List).toObject();

    expect(fixedList.clType?.fixedListType?.inner?.simpleType).eq(
      CLType.Simple.U8
    );
    expect(fixedList.clType?.fixedListType?.len).eq(CLType.Simple.U8);
    const fixedInnerList = fixedList.value?.fixedListValue?.valuesList!;
    expect(fixedInnerList?.length).eq(u8List.length);
    expect(fixedInnerList[0].u8).eq(1);
    expect(fixedInnerList[1].u8).eq(2);
    expect(fixedInnerList[2].u8).eq(3);
  });

  it('should create tuple instances', function() {
    const tuple1 = Arg.Instances.tuple1(Arg.Instances.u8(1)).toObject();
    expect(tuple1?.clType?.tuple1Type?.type0?.simpleType).eq(CLType.Simple.U8);
    expect(tuple1?.value?.tuple1Value?.value1?.u8).eq(1);

    const tuple2 = Arg.Instances.tuple2(
      Arg.Instances.u8(1),
      Arg.Instances.string('test')
    ).toObject();
    expect(tuple2?.clType?.tuple2Type?.type0?.simpleType).eq(CLType.Simple.U8);
    expect(tuple2?.value?.tuple2Value?.value1?.u8).eq(1);
    expect(tuple2?.clType?.tuple2Type?.type1?.simpleType).eq(
      CLType.Simple.STRING
    );
    expect(tuple2?.value?.tuple2Value?.value2?.strValue).eq('test');

    const tuple3 = Arg.Instances.tuple3(
      Arg.Instances.u8(1),
      Arg.Instances.string('test'),
      Arg.Instances.u512(JSBI.BigInt(100))
    ).toObject();
    expect(tuple3?.clType?.tuple3Type?.type0?.simpleType).eq(CLType.Simple.U8);
    expect(tuple3?.value?.tuple3Value?.value1?.u8).eq(1);
    expect(tuple3?.clType?.tuple3Type?.type1?.simpleType).eq(
      CLType.Simple.STRING
    );
    expect(tuple3?.value?.tuple3Value?.value2?.strValue).eq('test');
    expect(tuple3?.clType?.tuple3Type?.type2?.simpleType).eq(
      CLType.Simple.U512
    );
    expect(tuple3?.value?.tuple3Value?.value3?.u512?.value).eq('100');
  });

  it('should create map instance', function() {
    const map = Arg.Instances.map([
      [Arg.Instances.string('A'), Arg.Instances.u8(1)],
      [Arg.Instances.string('B'), Arg.Instances.u8(2)],
      [Arg.Instances.string('C'), Arg.Instances.u8(3)]
    ]);
    expect(
      map
        .getClType()
        ?.getMapType()
        ?.getKey()
        ?.getSimpleType()
    ).eq(CLType.Simple.STRING);
    expect(
      map
        .getClType()
        ?.getMapType()
        ?.getValue()
        ?.getSimpleType()
    ).eq(CLType.Simple.U8);
    const valueList = map
      ?.getValue()
      ?.getMapValue()
      ?.getValuesList()!;
    expect(valueList[0]?.getKey()?.getStrValue()).eq('A');
    expect(valueList[1]?.getKey()?.getStrValue()).eq('B');
    expect(valueList[2]?.getKey()?.getStrValue()).eq('C');

    expect(valueList[0]?.getValue()?.getU8()).eq(1);
    expect(valueList[1]?.getValue()?.getU8()).eq(2);
    expect(valueList[2]?.getValue()?.getU8()).eq(3);
  });
});

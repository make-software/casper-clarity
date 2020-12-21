import { expect } from 'chai';
import { CLValue, RuntimeArgs } from '../../src/lib';
import { decodeBase16 } from '../../src';
import { toBytesU32 } from '../../src/lib/byterepr';

describe(`RuntimeArgs`, () => {
  it('should serialize RuntimeArgs correctly', () => {
    const args = RuntimeArgs.fromMap({
      foo: CLValue.i32(1)
    });
    const bytes = args.toBytes();
    expect(bytes).to.deep.eq(
      Uint8Array.from([
        1,
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        102,
        111,
        111,
        4,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ])
    );
  });

  it('should serialize empty NamedArgs correctly', () => {
    const truth = decodeBase16('00000000');
    const runtimeArgs = RuntimeArgs.fromMap({});
    console.log(toBytesU32(0));
    const bytes = runtimeArgs.toBytes();
    expect(bytes).to.deep.eq(truth);
  });
});

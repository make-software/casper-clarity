import { expect } from 'chai';
import { CLValue } from './CLValue';
import { RuntimeArgs } from './RuntimeArgs';
import { decodeBase16 } from 'casperlabs-sdk';

describe(`RuntimeArgs`, () => {
  it('should serialize RuntimeArgs correctly', () => {
    let args = RuntimeArgs.fromMap({
      foo: CLValue.fromI32(1)
    });
    let bytes = args.toBytes();
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
    const bytes = runtimeArgs.toBytes();
    expect(bytes).to.deep.eq(truth);
  });
});

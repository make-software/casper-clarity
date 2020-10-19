import { expect } from 'chai';
import { CLValues, NamedArg, toBytesDeployHash } from './byterepr';
import { DeployItem } from './DeployUtil';
import { decodeBase16, encodeBase16 } from 'casperlabs-sdk';
import { CLValue, PublicKey } from './CLValue';

describe(`numbers' toBytes`, () => {
  it('should be able to encode u8', () => {
    let u8 = CLValues.u8(10);
    expect(u8.toBytes()).to.deep.eq(Uint8Array.from([0x0a]));

    u8 = CLValues.u8(255);
    expect(u8.toBytes()).to.deep.eq(Uint8Array.from([0xff]));

    u8 = CLValues.u8(256);
    expect(u8.toBytes).to.throws('out');
  });

  it('should be able to encode u32', () => {
    let u32 = CLValues.u32(0xf0e0_d0c0);
    expect(u32.toBytes()).to.deep.eq(Uint8Array.from([0xc0, 0xd0, 0xe0, 0xf0]));
    u32 = CLValues.u32(100000);
    expect(u32.toBytes()).to.deep.eq(Uint8Array.from([160, 134, 1, 0]));
  });

  it('should be able to encode i32', () => {
    let i32 = CLValues.i32(-100000);
    expect(i32.toBytes()).to.deep.eq(Uint8Array.from([96, 121, 254, 255]));
    i32 = CLValues.i32(100000);
    expect(i32.toBytes()).to.deep.eq(Uint8Array.from([160, 134, 1, 0]));
  });

  it('should be able to encode u128', () => {
    let u128 = CLValues.u128(100000);
    expect(u128.toBytes()).to.deep.eq(Uint8Array.from([3, 160, 134, 1]));
    u128 = CLValues.u128(0xf0e0_d0c0_0000);
    expect(u128.toBytes()).to.deep.eq(
      Uint8Array.from([6, 0, 0, 0xc0, 0xd0, 0xe0, 0xf0])
    );
    u128 = CLValues.u128(0x0000_f0e0_d0c0_0000);
    expect(u128.toBytes()).to.deep.eq(
      Uint8Array.from([6, 0, 0, 0xc0, 0xd0, 0xe0, 0xf0])
    );
  });

  it('should be able to encode utf8 string', () => {
    let string = CLValues.string('test_测试');
    expect(string.toBytes()).to.deep.eq(
      Uint8Array.from([
        11,
        0,
        0,
        0,
        116,
        101,
        115,
        116,
        95,
        230,
        181,
        139,
        232,
        175,
        149
      ])
    );
  });

  it('should serialize NamedArgs correctly', function() {
    const arg1 = new NamedArg('foo', CLValues.i32(1));
    const bytes = DeployItem.namedArgsToBytes([arg1]);
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

  it('should serialize DeployHash correctly', function() {
    const deployHash = decodeBase16(
      '7e83be8eb783d4631c3239eee08e95f33396210e23893155b6fb734e9b7f0df7'
    );
    const bytes = toBytesDeployHash(deployHash);
    expect(bytes).to.deep.eq(
      Uint8Array.from([
        126,
        131,
        190,
        142,
        183,
        131,
        212,
        99,
        28,
        50,
        57,
        238,
        224,
        142,
        149,
        243,
        51,
        150,
        33,
        14,
        35,
        137,
        49,
        85,
        182,
        251,
        115,
        78,
        155,
        127,
        13,
        247
      ])
    );
  });

  it('should serialize PublicKey correctly', function() {
    const publicKey = Uint8Array.from(Array(32).fill(42));
    const bytes = PublicKey.fromEd25519(publicKey).toBytes();
    expect(bytes).to.deep.eq(
      Uint8Array.from([
        1,
        32,
        0,
        0,
        0,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42,
        42
      ])
    );
  });
});

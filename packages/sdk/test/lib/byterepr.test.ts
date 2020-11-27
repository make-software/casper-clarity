import { expect } from 'chai';
import { decodeBase16 } from '../../src';
import { CLValue, PublicKey, KeyValue } from '../../src/lib';
import {
  toBytesDeployHash,
  toBytesI32,
  toBytesString,
  toBytesU128,
  toBytesU32,
  toBytesU64,
  toBytesU8,
  toBytesVecT
} from '../../src/lib/byterepr';
import { AccessRights, URef } from '../../src/lib';

describe(`numbers' toBytes`, () => {
  it('should be able to encode u8', () => {
    let bytesU8 = toBytesU8(10);
    expect(bytesU8).to.deep.eq(Uint8Array.from([0x0a]));

    bytesU8 = toBytesU8(255);
    expect(bytesU8).to.deep.eq(Uint8Array.from([0xff]));

    expect(() => toBytesU8(256)).to.throws('out');
  });

  it('should be able to encode u32', () => {
    let bytesU32 = toBytesU32(0xf0e0_d0c0);
    expect(bytesU32).to.deep.eq(Uint8Array.from([0xc0, 0xd0, 0xe0, 0xf0]));
    bytesU32 = toBytesU32(100000);
    expect(bytesU32).to.deep.eq(Uint8Array.from([160, 134, 1, 0]));
    bytesU32 = toBytesU32(0);
    expect(bytesU32).to.deep.eq(Uint8Array.from([0, 0, 0, 0]));
  });

  it('should be able to encode i32', () => {
    let bytesI32 = toBytesI32(-100000);
    expect(bytesI32).to.deep.eq(Uint8Array.from([96, 121, 254, 255]));
    bytesI32 = toBytesI32(100000);
    expect(bytesI32).to.deep.eq(Uint8Array.from([160, 134, 1, 0]));
    bytesI32 = toBytesI32(0);
    expect(bytesI32).to.deep.eq(Uint8Array.from([0, 0, 0, 0]));
    bytesI32 = toBytesI32(-1);
    expect(bytesI32).to.deep.eq(Uint8Array.from([255, 255, 255, 255]));
  });

  it('should be able to encode u64', () => {
    let bytesU128 = toBytesU64('14198572906121139257');
    expect(bytesU128).to.deep.eq(
      Uint8Array.from([57, 20, 214, 178, 212, 118, 11, 197])
    );
    bytesU128 = toBytesU64('9834009477689550808');
    expect(bytesU128).to.deep.eq(
      Uint8Array.from([216, 167, 130, 99, 132, 107, 121, 136])
    );
  });

  it('should be able to encode u128', () => {
    let bytesU128 = toBytesU128(100000);
    expect(bytesU128).to.deep.eq(Uint8Array.from([3, 160, 134, 1]));
    bytesU128 = toBytesU128(0xf0e0_d0c0_0000);
    expect(bytesU128).to.deep.eq(
      Uint8Array.from([6, 0, 0, 0xc0, 0xd0, 0xe0, 0xf0])
    );
    bytesU128 = toBytesU128(0x0000_f0e0_d0c0_0000);
    expect(bytesU128).to.deep.eq(
      Uint8Array.from([6, 0, 0, 0xc0, 0xd0, 0xe0, 0xf0])
    );
  });

  it('should be able to encode utf8 string', () => {
    const bytesString = toBytesString('test_测试');
    expect(bytesString).to.deep.eq(
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

  it('should serialize a vector of CLValue correctly', () => {
    const truth = decodeBase16(
      '0100000015000000110000006765745f7061796d656e745f70757273650a'
    );
    const bytes = toBytesVecT([CLValue.fromString('get_payment_purse')]);
    expect(bytes).to.deep.eq(truth);
  });

  it('should serialize Key of URef variant correctly', () => {
    const truth = decodeBase16(
      '022a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a07'
    );
    const uref = new URef(
      decodeBase16(
        '2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a'
      ),
      AccessRights.READ_ADD_WRITE
    );
    const bytes = KeyValue.fromURef(uref).toBytes();
    expect(bytes).to.deep.eq(truth);
  });

  it('should serialize DeployHash correctly', () => {
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
  it('should serialize ByteArray correctly', () => {
    const byteArray = Uint8Array.from(Array(32).fill(42));
    const bytes = CLValue.fromBytes(byteArray).toBytes();
    expect(bytes).to.deep.eq(
      Uint8Array.from([
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
        42,
        15,
        32,
        0,
        0,
        0
      ])
    );
  });

  it('should serialize PublicKey correctly', () => {
    const publicKey = Uint8Array.from(Array(32).fill(42));
    const bytes = PublicKey.fromEd25519(publicKey).toBytes();
    expect(bytes).to.deep.eq(
      Uint8Array.from([
        1,
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

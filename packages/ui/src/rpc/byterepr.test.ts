// @ts-nocheck
import { expect } from 'chai';
import * as CLValueInstance from './byterepr';

describe(`numbers' toBytes`, () => {
  it('should be able to encode u8', () => {
    let u8 = new CLValueInstance.U8(10);
    expect(u8.toBytes()).to.deep.eq(Uint8Array.from([0x0a]));

    u8 = new CLValueInstance.U8(255);
    expect(u8.toBytes()).to.deep.eq(Uint8Array.from([0xff]));

    u8 = new CLValueInstance.U8(256);
    expect(u8.toBytes).to.throws('out');
  });

  it('should be able to encode u16', () => {
    let u16 = new CLValueInstance.U16(0xf0e0);
    expect(u16.toBytes()).to.deep.eq(Uint8Array.from([0xe0, 0xf0]));

    u16 = new CLValueInstance.U16(0xf0e0ff);
    expect(u16.toBytes).to.throws();
  });

  it('should be able to encode u32', () => {
    let u32 = new CLValueInstance.U32(0xf0e0_d0c0);
    expect(u32.toBytes()).to.deep.eq(Uint8Array.from([0xc0, 0xd0, 0xe0, 0xf0]));
    u32 = new CLValueInstance.U32(100000);
    expect(u32.toBytes()).to.deep.eq(Uint8Array.from([160, 134, 1, 0]));
  });

  it('should be able to encode i32', () => {
    let i32 = new CLValueInstance.I32(-100000);
    expect(i32.toBytes()).to.deep.eq(Uint8Array.from([96, 121, 254, 255]));
    i32 = new CLValueInstance.I32(100000);
    expect(i32.toBytes()).to.deep.eq(Uint8Array.from([160, 134, 1, 0]));
  });

  it('should be able to encode u128', () => {
    let u128 = new CLValueInstance.U128(100000);
    expect(u128.toBytes()).to.deep.eq(Uint8Array.from([3, 160, 134, 1]));
    u128 = new CLValueInstance.U128(0xf0e0_d0c0_0000);
    expect(u128.toBytes()).to.deep.eq(
      Uint8Array.from([6, 0, 0, 0xc0, 0xd0, 0xe0, 0xf0])
    );
    u128 = new CLValueInstance.U128(0x0000_f0e0_d0c0_0000);
    expect(u128.toBytes()).to.deep.eq(
      Uint8Array.from([6, 0, 0, 0xc0, 0xd0, 0xe0, 0xf0])
    );
  });
});

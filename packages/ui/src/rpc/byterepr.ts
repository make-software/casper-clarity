// migrate from casper-types/bytesrepr.rs
// https://github.com/CasperLabs/casper-node/blob/4b9f01463845120f6c428a08e108da67b448abb1/types/src/bytesrepr.rs

'use strict';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { MaxUint256, NegativeOne, One, Zero } from '@ethersproject/constants';

import { arrayify, concat } from '@ethersproject/bytes';
import { decodeASCII } from '@improbable-eng/grpc-web/dist/typings/ChunkParser';

interface ToBytes {
  toBytes(): ByteArray;
}

export abstract class NumberCoder implements ToBytes {
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

export class Bool implements ToBytes {
  constructor(private b: boolean) {}
  toBytes(): ByteArray {
    return new Uint8Array([this.b ? 1 : 0]);
  }
}

export class U8 extends NumberCoder {
  constructor(u8: number) {
    super(8, false, u8);
  }
}

export class U16 extends NumberCoder {
  constructor(n: number) {
    super(16, false, n);
  }
}

export class U32 extends NumberCoder {
  constructor(n: number) {
    super(32, false, n);
  }
}

export class I32 extends NumberCoder {
  constructor(n: number) {
    super(32, true, n);
  }
}

export class U64 extends NumberCoder {
  constructor(n: number) {
    super(64, false, n);
  }
}
export class I64 extends NumberCoder {
  constructor(n: number) {
    super(64, true, n);
  }
}
export class U128 extends NumberCoder {
  constructor(n: number) {
    super(128, false, n);
  }
}

export class U256 extends NumberCoder {
  constructor(n: number) {
    super(256, false, n);
  }
}

export class U512 extends NumberCoder {
  constructor(n: number) {
    super(512, false, n);
  }
}

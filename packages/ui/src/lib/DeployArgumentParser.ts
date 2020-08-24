import JSBI from 'jsbi';
import { CLType } from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import validator from 'validator';

const powerOf2 = (n: number): JSBI => {
  return JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(n));
};

const numberLimitForUnsigned = (bit: number) => {
  return {
    min: JSBI.BigInt(0),
    max: JSBI.subtract(powerOf2(bit), JSBI.BigInt(1))
  };
};

const numberLimitForSigned = (bit: number) => {
  return {
    min: JSBI.multiply(JSBI.BigInt(-1), powerOf2(bit - 1)),
    max: JSBI.subtract(powerOf2(bit - 1), JSBI.BigInt(1))
  };
};

const NumberLimit = {
  [CLType.Simple.U8]: numberLimitForUnsigned(8),
  [CLType.Simple.U32]: numberLimitForUnsigned(32),
  [CLType.Simple.U64]: numberLimitForUnsigned(64),
  [CLType.Simple.U128]: numberLimitForUnsigned(128),
  [CLType.Simple.U256]: numberLimitForUnsigned(256),
  [CLType.Simple.U512]: numberLimitForUnsigned(512),
  [CLType.Simple.I32]: numberLimitForSigned(32),
  [CLType.Simple.I64]: numberLimitForSigned(64)
};

const BigIntTypeToString = {
  [CLType.Simple.U8]: 'U8',
  [CLType.Simple.U32]: 'U32',
  [CLType.Simple.U64]: 'U64',
  [CLType.Simple.U128]: 'U128',
  [CLType.Simple.U256]: 'U256',
  [CLType.Simple.U512]: 'U512',
  [CLType.Simple.I32]: 'I32',
  [CLType.Simple.I64]: 'I64'
};

// All validator method follow this rule:
// When there is a error, returns a message, otherwise returns false.
export class DeployArgumentParser {
  static parseTuple() {}

  static parseMap() {}

  static parseList() {}

  static parseBool() {}

  static validateBase16String(v: any): string | false {
    const valid = typeof v === typeof 's';
    if (!valid || validator.isHexadecimal(v)) {
      return `${v} is not valid base16 encoded string`;
    }
    return false;
  }

  static validateString(v: any): string | false {
    const valid = typeof v === typeof 's';
    if (!valid) {
      return `${v} is not a valid string literal`;
    }
    return false;
  }

  static validateBoolean(v: any): string | false {
    const valid = typeof v === 'boolean';
    if (!valid) {
      return `${v} is not a valid boolean literal`;
    }
    return false;
  }

  static validateBigInt(
    v: any,
    type: CLType.SimpleMap[keyof CLType.SimpleMap]
  ) {
    if (typeof v !== 'number') {
      return `${v} is not a valid number literal`;
    }
    v = v as number;
    switch (type) {
      case CLType.Simple.U8:
      case CLType.Simple.U32:
      case CLType.Simple.U64:
      case CLType.Simple.I32:
      case CLType.Simple.I64:
      case CLType.Simple.U128:
      case CLType.Simple.U256:
      case CLType.Simple.U512:
        let limit: { min: JSBI; max: JSBI } = (NumberLimit as any)[type];
        const value = JSBI.BigInt(v);
        if (
          JSBI.lessThan(value, limit.min) ||
          JSBI.greaterThan(value, limit.max)
        ) {
          return `Value ${v} is not valid ${
            BigIntTypeToString[type]
          }, which should be in [${limit.min.toString(
            10
          )}, ${limit.max.toString(10)}]`;
        }
        return false;
      default:
        return `Type error`;
    }
  }
}

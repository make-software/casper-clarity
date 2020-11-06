import JSBI from 'jsbi';
import validator from 'validator';
import {
  decodeBase16,
  AccessRights,
  URef,
  CLValue,
  SimpleType,
  CLTypedAndToBytes,
  AccountHash,
  KeyValue,
  NamedArg,
  MapEntry,
  CLTypedAndToBytesHelper
} from 'casperlabs-sdk';
import { FormState } from 'formstate';
import {
  DeployArgument,
  FormDeployArgument,
  KeyType,
  SupportedType,
  UISimpleType
} from '../containers/DeployContractsContainer';

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
  [SimpleType.U8]: numberLimitForUnsigned(8),
  [SimpleType.U32]: numberLimitForUnsigned(32),
  [SimpleType.U64]: numberLimitForUnsigned(64),
  [SimpleType.U128]: numberLimitForUnsigned(128),
  [SimpleType.U256]: numberLimitForUnsigned(256),
  [SimpleType.U512]: numberLimitForUnsigned(512),
  [SimpleType.I32]: numberLimitForSigned(32),
  [SimpleType.I64]: numberLimitForSigned(64)
};

const BigIntTypeToString = {
  [SimpleType.U8]: 'U8',
  [SimpleType.U32]: 'U32',
  [SimpleType.U64]: 'U64',
  [SimpleType.U128]: 'U128',
  [SimpleType.U256]: 'U256',
  [SimpleType.U512]: 'U512',
  [SimpleType.I32]: 'I32',
  [SimpleType.I64]: 'I64'
};

// All validator method follow this rule:
// When there is a error, returns a message, otherwise returns false.
export class DeployArgumentParser {
  static validateTuple(
    tupleInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any
  ) {
    if (typeof argValueInJson !== typeof []) {
      return `The input value is not a valid array`;
    }

    if (tupleInnerDeployArgs.length !== argValueInJson.length) {
      return `length of tuple is not correct`;
    }

    for (let i = 0; i < tupleInnerDeployArgs.length; i++) {
      const validateSimpleType = DeployArgumentParser.validateSimpleType(
        tupleInnerDeployArgs[i].$,
        argValueInJson[i]
      );
      if (validateSimpleType !== false) {
        return `tuple[${i}] is not correct: ${validateSimpleType}`;
      }
    }
    return false;
  }

  static validateMap(
    mapInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any
  ) {
    if (typeof argValueInJson !== typeof []) {
      return `The input value is not a valid array`;
    }
    for (let i = 0; i < argValueInJson.length; i++) {
      const mapEntry = argValueInJson[i];
      if (mapEntry.length !== 2) {
        return `length of the MapEntry[${i}] is not 2`;
      }

      const validateKey = DeployArgumentParser.validateSimpleType(
        mapInnerDeployArgs[0].$,
        argValueInJson[i][0]
      );

      if (validateKey !== false) {
        return `the key of MapEntry[${i}] is not correct: ${validateKey}`;
      }

      const validateValue = DeployArgumentParser.validateSimpleType(
        mapInnerDeployArgs[1].$,
        argValueInJson[i][1]
      );

      if (validateValue !== false) {
        return `the value of MapEntry[${i}] is not correct: ${validateValue}`;
      }
    }
    return false;
  }

  static validateList(
    listInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any
  ) {
    if (typeof argValueInJson !== typeof []) {
      return `the input value is not a valid array`;
    }
    for (let i = 0; i < argValueInJson.length; i++) {
      const validateSimpleType = DeployArgumentParser.validateSimpleType(
        listInnerDeployArgs[0].$,
        argValueInJson[i]
      );

      if (validateSimpleType !== false) {
        return `list[${i}] is not correct: ${validateSimpleType}`;
      }
    }
    return false;
  }

  public static validateDeployArgument(deployArgument: DeployArgument) {
    const value = deployArgument.value.$;
    let valueInJson;
    try {
      valueInJson = JSON.parse(value);
    } catch (e) {
      return e.message;
    }

    switch (deployArgument.type.$) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 'Bytes':
      case 'Bytes (Fixed Length)':
        return DeployArgumentParser.validateSimpleType(
          deployArgument,
          valueInJson
        );
      case 'Tuple':
        return DeployArgumentParser.validateTuple(
          deployArgument.tupleInnerDeployArgs.$,
          valueInJson
        );
      case 'Map':
        return DeployArgumentParser.validateMap(
          deployArgument.mapInnerDeployArgs.$,
          valueInJson
        );
      case 'List':
        return DeployArgumentParser.validateList(
          deployArgument.listInnerDeployArgs.$,
          valueInJson
        );
      case 'FixedList':
        return DeployArgumentParser.validateList(
          deployArgument.listInnerDeployArgs.$,
          valueInJson
        );
    }
  }

  private static validateSimpleType(
    deployArgument: DeployArgument,
    argValueInJson: any
  ): string | false {
    switch (deployArgument.type.$) {
      case SimpleType.Unit:
      case 'Tuple':
      case 'Map':
      case 'List':
      case 'FixedList':
        return `don't support ${deployArgument.type.$}`;
      case SimpleType.U8:
      case SimpleType.U32:
      case SimpleType.U64:
      case SimpleType.I32:
      case SimpleType.I64:
      case SimpleType.U128:
      case SimpleType.U256:
      case SimpleType.U512:
        return DeployArgumentParser.validateBigInt(
          argValueInJson,
          deployArgument.type.$
        );
      case SimpleType.String:
        return DeployArgumentParser.validateString(argValueInJson);
      case SimpleType.Bool:
        return DeployArgumentParser.validateBoolean(argValueInJson);
      case SimpleType.Key:
      case SimpleType.URef:
        return DeployArgumentParser.validateBase16String(argValueInJson);
      case 'Bytes':
        return DeployArgumentParser.validateBase16String(argValueInJson);
      case 'Bytes (Fixed Length)':
        return DeployArgumentParser.validateBase16String(argValueInJson);
    }
    return false;
  }

  static validateBase16String(v: any): string | false {
    const valid = typeof v === typeof 's';
    if (!valid || !validator.isHexadecimal(v)) {
      return `${JSON.stringify(v)} is not a valid base16 encoded string`;
    }
    return false;
  }

  private static validateString(v: any): string | false {
    const valid = typeof v === typeof 's';
    if (!valid) {
      return `${JSON.stringify(v)} is not a valid string literal`;
    }
    return false;
  }

  private static validateBoolean(v: any): string | false {
    const valid = typeof v === 'boolean';
    if (!valid) {
      return `${v} is not a valid boolean literal`;
    }
    return false;
  }

  private static validateBigInt(v: any, type: SimpleType) {
    if (typeof v !== 'number') {
      return `${JSON.stringify(v)} is not a valid number literal`;
    }
    v = v as number;
    switch (type) {
      case SimpleType.U8:
      case SimpleType.U32:
      case SimpleType.U64:
      case SimpleType.I32:
      case SimpleType.I64:
      case SimpleType.U128:
      case SimpleType.U256:
      case SimpleType.U512:
        let limit: { min: JSBI; max: JSBI } = (NumberLimit as any)[type];
        const value = JSBI.BigInt(v);
        if (
          JSBI.lessThan(value, limit.min) ||
          JSBI.greaterThan(value, limit.max)
        ) {
          return `Value ${JSON.stringify(v)} is not a valid ${
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

  private static isSimpleType(t: SupportedType) {
    return (
      Object.values(SimpleType).includes(t) ||
      t === 'Bytes' ||
      t === 'Bytes (Fixed Length)'
    );
  }

  private static buildInnerSimpleArgs(
    firstType: UISimpleType,
    secondType: KeyType | null,
    argValueInJson: any,
    uRefAccessRight?: AccessRights
  ): CLTypedAndToBytes {
    let clValueInstance;
    switch (firstType) {
      case 'Bytes':
        clValueInstance = CLTypedAndToBytesHelper.bytes(
          decodeBase16(argValueInJson)
        );
        break;
      case 'Bytes (Fixed Length)':
        // fixme: is Fixed Length bytes still needed in node-rs?
        clValueInstance = CLTypedAndToBytesHelper.bytes(
          decodeBase16(argValueInJson)
        );
        break;
      case SimpleType.Bool:
        clValueInstance = CLTypedAndToBytesHelper.bool(argValueInJson);
        break;
      case SimpleType.I32:
        clValueInstance = CLTypedAndToBytesHelper.i32(argValueInJson);
        break;
      case SimpleType.I64:
        clValueInstance = CLTypedAndToBytesHelper.i64(argValueInJson);
        break;
      case SimpleType.U8:
        clValueInstance = CLTypedAndToBytesHelper.u8(argValueInJson);
        break;
      case SimpleType.U32:
        clValueInstance = CLTypedAndToBytesHelper.u32(argValueInJson);
        break;
      case SimpleType.U64:
        clValueInstance = CLTypedAndToBytesHelper.u64(argValueInJson);
        break;
      case SimpleType.U128:
        clValueInstance = CLTypedAndToBytesHelper.u128(argValueInJson);
        break;
      case SimpleType.U256:
        clValueInstance = CLTypedAndToBytesHelper.u256(argValueInJson);
        break;
      case SimpleType.U512:
        clValueInstance = CLTypedAndToBytesHelper.u512(argValueInJson);
        break;
      case SimpleType.Unit:
        clValueInstance = CLTypedAndToBytesHelper.unit();
        break;
      case SimpleType.String:
        clValueInstance = CLTypedAndToBytesHelper.string(argValueInJson);
        break;
      case SimpleType.Key:
      case SimpleType.URef:
        clValueInstance = DeployArgumentParser.buildKeyValue(
          firstType,
          secondType,
          argValueInJson,
          uRefAccessRight
        );
        break;
      case SimpleType.PublicKey:
        clValueInstance = CLTypedAndToBytesHelper.publicKey(
          decodeBase16(argValueInJson)
        );
        break;
    }
    return clValueInstance;
  }

  private static buildSimpleArgs(
    firstType: UISimpleType,
    secondType: KeyType | null,
    argValueInJson: any,
    uRefAccessRight?: AccessRights
  ): CLValue {
    let clValueInstance;
    switch (firstType) {
      case 'Bytes':
        clValueInstance = CLValue.fromBytes(decodeBase16(argValueInJson));
        break;
      case 'Bytes (Fixed Length)':
        // fixme: is Fixed Length bytes still needed in node-rs?
        clValueInstance = CLValue.fromBytes(decodeBase16(argValueInJson));
        break;
      case SimpleType.Bool:
        clValueInstance = CLValue.fromBool(argValueInJson);
        break;
      case SimpleType.I32:
        clValueInstance = CLValue.fromI32(argValueInJson);
        break;
      case SimpleType.I64:
        clValueInstance = CLValue.fromI64(argValueInJson);
        break;
      case SimpleType.U8:
        clValueInstance = CLValue.fromU8(argValueInJson);
        break;
      case SimpleType.U32:
        clValueInstance = CLValue.fromU32(argValueInJson);
        break;
      case SimpleType.U64:
        clValueInstance = CLValue.fromU64(argValueInJson);
        break;
      case SimpleType.U128:
        clValueInstance = CLValue.fromU128(argValueInJson);
        break;
      case SimpleType.U256:
        clValueInstance = CLValue.fromU256(argValueInJson);
        break;
      case SimpleType.U512:
        clValueInstance = CLValue.fromU512(argValueInJson);
        break;
      case SimpleType.Unit:
        clValueInstance = CLValue.fromUnit();
        break;
      case SimpleType.String:
        clValueInstance = CLValue.fromString(argValueInJson);
        break;
      case SimpleType.Key:
      case SimpleType.URef:
        clValueInstance = DeployArgumentParser.buildKeyOrUrefInstance(
          firstType,
          secondType,
          argValueInJson,
          uRefAccessRight
        );
        break;
      case SimpleType.PublicKey:
        clValueInstance = CLValue.fromPublicKey(decodeBase16(argValueInJson));
        break;
    }
    return clValueInstance;
  }

  public static buildArgument(arg: FormState<DeployArgument>): NamedArg {
    const argValueStr: string = arg.$.value.value;
    const type = arg.$.type.$;
    let clValueInstance: CLValue;
    const argValueStrInJson = JSON.parse(argValueStr);
    switch (type) {
      case 'Tuple':
        clValueInstance = DeployArgumentParser.buildTupleTypeArg(
          arg.$.tupleInnerDeployArgs.$,
          argValueStrInJson
        );
        break;
      case 'Map':
        clValueInstance = DeployArgumentParser.buildMapTypeArg(
          arg.$.mapInnerDeployArgs.$,
          argValueStrInJson
        );
        break;
      case 'List':
        clValueInstance = DeployArgumentParser.buildListTypeArg(
          arg.$.listInnerDeployArgs.$,
          argValueStrInJson,
          false
        );
        break;
      case 'FixedList':
        clValueInstance = this.buildListTypeArg(
          arg.$.listInnerDeployArgs.$,
          argValueStrInJson,
          true
        );
        break;
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 'Bytes':
      case 'Bytes (Fixed Length)':
        // Simple Type
        clValueInstance = DeployArgumentParser.buildSimpleArgs(
          type as UISimpleType,
          arg.$.secondType.$,
          argValueStrInJson,
          arg.$.URefAccessRight.$
        );
        break;
    }

    return new NamedArg(arg.$.name.value, clValueInstance!);
  }

  private static buildListTypeArg(
    listInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any,
    isFixedList: boolean
  ) {
    const firstType = listInnerDeployArgs[0].$.type.$;
    if (!DeployArgumentParser.isSimpleType(firstType)) {
      throw new Error("Don't support nest types");
    }
    const secondType = listInnerDeployArgs[0].$.secondType.$;
    const uRefAccessRight = listInnerDeployArgs[0].$.URefAccessRight.$;
    const argsList = argValueInJson.map((arg: any) => {
      return DeployArgumentParser.buildInnerSimpleArgs(
        firstType as SimpleType,
        secondType,
        arg,
        uRefAccessRight
      );
    });
    if (argsList.length > 0) {
      if (isFixedList) {
        return CLValue.fromFixedList(argsList);
      } else {
        return CLValue.fromList(argsList);
      }
    } else {
      throw new Error("Can't create empty list");
    }
  }

  private static buildMapTypeArg(
    mapInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any
  ) {
    const keyType = mapInnerDeployArgs[0].$.type.$;
    const valueType = mapInnerDeployArgs[1].$.type.$;
    if (
      !DeployArgumentParser.isSimpleType(keyType) ||
      !DeployArgumentParser.isSimpleType(valueType)
    ) {
      throw new Error("Don't support nest types in Map instance");
    }
    const keySecondType = mapInnerDeployArgs[0].$.secondType.$;
    const keyURefAccessRight = mapInnerDeployArgs[0].$.URefAccessRight.$;

    const valueSecondType = mapInnerDeployArgs[1].$.secondType.$;
    const valueURefAccessRight = mapInnerDeployArgs[1].$.URefAccessRight.$;
    const mapEntries: MapEntry[] = argValueInJson.map((arg: any) => {
      const key = DeployArgumentParser.buildInnerSimpleArgs(
        keyType as UISimpleType,
        keySecondType,
        arg[0],
        keyURefAccessRight
      );
      const value = DeployArgumentParser.buildInnerSimpleArgs(
        valueType as UISimpleType,
        valueSecondType,
        arg[1],
        valueURefAccessRight
      );
      return { key, value };
    });
    if (mapEntries.length > 0) {
      return CLValue.fromMap(mapEntries);
    } else {
      throw new Error("Can't create empty Map");
    }
  }

  private static buildTupleTypeArg(
    tupleInnerDeployArgs: FormDeployArgument[],
    argValueStr: any
  ) {
    const argsTupleList: CLTypedAndToBytes[] = [];
    tupleInnerDeployArgs.forEach((arg, i) => {
      const type = arg.$.type.$;
      if (!DeployArgumentParser.isSimpleType(type)) {
        throw new Error("Don't support nest types in Tuple instance");
      }
      const secondType = arg.$.secondType.$;
      const uRefAccessRight = arg.$.URefAccessRight.$;
      argsTupleList.push(
        DeployArgumentParser.buildInnerSimpleArgs(
          type as SimpleType,
          secondType,
          argValueStr[i],
          uRefAccessRight
        )
      );
    });
    if (argsTupleList.length === 1) {
      return CLValue.fromTuple1(argsTupleList[0]);
    } else if (argsTupleList.length === 2) {
      return CLValue.fromTuple2(argsTupleList[0], argsTupleList[1]);
    } else {
      return CLValue.fromTuple3(
        argsTupleList[0],
        argsTupleList[1],
        argsTupleList[2]
      );
    }
  }

  static buildKeyValue(
    firstType: number,
    secondType: KeyType | null,
    argValueStr: string,
    uRefAccessRight?: AccessRights
  ): CLTypedAndToBytes {
    if (firstType === SimpleType.Key) {
      let key: KeyValue;
      let keyType = secondType as KeyType;
      let valueInByteArray = decodeBase16(argValueStr);
      switch (keyType) {
        case KeyType.ADDRESS:
          key = KeyValue.fromAccount(new AccountHash(valueInByteArray));
          break;
        case KeyType.HASH:
          key = KeyValue.fromHash(valueInByteArray);
          break;
        case KeyType.UREF:
          const uRef = new URef(valueInByteArray, uRefAccessRight!);
          key = KeyValue.fromURef(uRef);
          break;
      }
      return key;
    } else {
      const uRef = new URef(decodeBase16(argValueStr), uRefAccessRight!);
      return uRef;
    }
  }

  static buildKeyOrUrefInstance(
    firstType: number,
    secondType: KeyType | null,
    argValueStr: string,
    uRefAccessRight?: AccessRights
  ): CLValue {
    if (firstType === SimpleType.Key) {
      let key: KeyValue;
      let keyType = secondType as KeyType;
      let valueInByteArray = decodeBase16(argValueStr);
      switch (keyType) {
        case KeyType.ADDRESS:
          key = KeyValue.fromAccount(new AccountHash(valueInByteArray));
          break;
        case KeyType.HASH:
          key = KeyValue.fromHash(valueInByteArray);
          break;
        case KeyType.UREF:
          const uRef = new URef(valueInByteArray, uRefAccessRight!);
          key = KeyValue.fromURef(uRef);
          break;
      }
      return CLValue.fromKey(key);
    } else {
      const uRef = new URef(decodeBase16(argValueStr), uRefAccessRight!);
      return CLValue.fromURef(uRef);
    }
  }
}

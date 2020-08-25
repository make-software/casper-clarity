import JSBI from 'jsbi';
import {
  CLType,
  CLValueInstance,
  Key
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import validator from 'validator';
import { Args, decodeBase16 } from 'casperlabs-sdk';
import {
  DeployArgument,
  FormDeployArgument,
  KeyType,
  SupportedType
} from '../containers/DeployContractsContainer';
import { FormState } from 'formstate';
import { Deploy } from 'casperlabs-grpc/io/casperlabs/casper/consensus/consensus_pb';

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
  static validateTuple(
    tupleInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any
  ) {
    if (typeof argValueInJson !== typeof []) {
      return `The input value is not a valid array`;
    }

    if (tupleInnerDeployArgs.length != argValueInJson.length) {
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
    for (let i = 0; i < argValueInJson.lenght; i++) {
      const mapEntry = argValueInJson[i];
      if (mapEntry['key'] === undefined) {
        return `map[${i}] doesn't have key`;
      }
      if (mapEntry['value'] === undefined) {
        return `map[${i}] doesn't have value`;
      }
      const validateKey = DeployArgumentParser.validateSimpleType(
        mapInnerDeployArgs[0].$,
        argValueInJson[i].key
      );

      if (validateKey !== false) {
        return `the key of map[${i}] is not correct: ${validateKey}`;
      }

      const validateValue = DeployArgumentParser.validateSimpleType(
        mapInnerDeployArgs[1].$,
        argValueInJson[i].value
      );

      if (validateValue !== false) {
        return `the value of map[${i}] is not correct: ${validateValue}`;
      }
    }
    return false;
  }

  static validateList(
    listInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any
  ) {
    if (typeof argValueInJson !== typeof []) {
      return `The input value is not a valid array`;
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
    const type = deployArgument.type.$;
    if (!DeployArgumentParser.isSimpleType(type)) {
      return `${argValueInJson} is not a simple type`;
    }
    switch (deployArgument.type.$) {
      case CLType.Simple.UNIT:
      case 'Tuple':
      case 'Map':
      case 'List':
      case 'FixedList':
        return `don't support ${deployArgument.type.$}`;
      case CLType.Simple.U8:
      case CLType.Simple.U32:
      case CLType.Simple.U64:
      case CLType.Simple.I32:
      case CLType.Simple.I64:
      case CLType.Simple.U128:
      case CLType.Simple.U256:
      case CLType.Simple.U512:
        return DeployArgumentParser.validateBigInt(
          argValueInJson,
          deployArgument.type.$
        );
      case CLType.Simple.STRING:
        return DeployArgumentParser.validateString(argValueInJson);
      case CLType.Simple.BOOL:
        return DeployArgumentParser.validateBoolean(argValueInJson);
      case CLType.Simple.KEY:
      case CLType.Simple.UREF:
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

  private static isSimpleType(t: SupportedType) {
    return Object.values(CLType.Simple).includes(t);
  }

  private static buildSimpleArgs(
    firstType: CLType.SimpleMap[keyof CLType.SimpleMap],
    secondType: KeyType | null,
    argValueInJson: any,
    uRefAccessRight?: Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap]
  ) {
    let clValueInstance;
    switch (firstType) {
      case CLType.Simple.BOOL:
        clValueInstance = Args.Instances.bool(argValueInJson);
        break;
      case CLType.Simple.I32:
        clValueInstance = Args.Instances.i32(argValueInJson);
        break;
      case CLType.Simple.I64:
        clValueInstance = Args.Instances.i64(argValueInJson);
        break;
      case CLType.Simple.U8:
        clValueInstance = Args.Instances.u8(argValueInJson);
        break;
      case CLType.Simple.U32:
        clValueInstance = Args.Instances.u32(argValueInJson);
        break;
      case CLType.Simple.U64:
        clValueInstance = Args.Instances.u64(argValueInJson);
        break;
      case CLType.Simple.U128:
        clValueInstance = Args.Instances.u128(argValueInJson);
        break;
      case CLType.Simple.U256:
        clValueInstance = Args.Instances.u256(argValueInJson);
        break;
      case CLType.Simple.U512:
        clValueInstance = Args.Instances.u512(argValueInJson);
        break;
      case CLType.Simple.UNIT:
        clValueInstance = Args.Instances.unit();
        break;
      case CLType.Simple.STRING:
        clValueInstance = Args.Instances.string(argValueInJson);
        break;
      case CLType.Simple.KEY:
      case CLType.Simple.UREF:
        clValueInstance = DeployArgumentParser.buildKeyOrUrefInstance(
          firstType,
          secondType,
          argValueInJson,
          uRefAccessRight
        );
        break;
    }
    return clValueInstance;
  }

  public static buildArgument(arg: FormState<DeployArgument>) {
    const argValueStr: string = arg.$.value.value;
    const type = arg.$.type.$;
    let clValueInstance: CLValueInstance;
    const argValueStrInJson = JSON.parse(argValueStr);
    if (DeployArgumentParser.isSimpleType(type)) {
      clValueInstance = DeployArgumentParser.buildSimpleArgs(
        type as CLType.SimpleMap[keyof CLType.SimpleMap],
        arg.$.secondType.$,
        argValueStrInJson,
        arg.$.URefAccessRight.$
      );
    } else {
      switch (type) {
        case 'Bytes':
          clValueInstance = Args.Instances.bytes(
            decodeBase16(argValueStrInJson)
          );
          break;
        case 'Bytes (Fixed Length)':
          clValueInstance = Args.Instances.bytesFixedLength(
            decodeBase16(argValueStrInJson)
          );
          break;
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
          // type from CLType.Simple
          throw new Error('Failed creating arguments');
      }
    }

    const deployArg = new Deploy.Arg();
    deployArg.setName(arg.$.name.value);
    deployArg.setValue(clValueInstance);
    return deployArg;
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
      return DeployArgumentParser.buildSimpleArgs(
        firstType as CLType.SimpleMap[keyof CLType.SimpleMap],
        secondType,
        arg,
        uRefAccessRight
      );
    });
    if (isFixedList) {
      return Args.Instances.fixedList(argsList);
    } else {
      return Args.Instances.list(argsList);
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
    const mapEntries = argValueInJson.map((arg: any) => {
      const key = DeployArgumentParser.buildSimpleArgs(
        keyType as CLType.SimpleMap[keyof CLType.SimpleMap],
        keySecondType,
        arg.key,
        keyURefAccessRight
      );
      const value = DeployArgumentParser.buildSimpleArgs(
        valueType as CLType.SimpleMap[keyof CLType.SimpleMap],
        valueSecondType,
        arg.value,
        valueURefAccessRight
      );
      return [key, value];
    });
    return Args.Instances.map(mapEntries);
  }

  private static buildTupleTypeArg(
    tupleInnerDeployArgs: FormDeployArgument[],
    argValueStr: any
  ) {
    const argsTupleList: CLValueInstance[] = [];
    tupleInnerDeployArgs.forEach((arg, i) => {
      const type = arg.$.type.$;
      if (!DeployArgumentParser.isSimpleType(type)) {
        throw new Error("Don't support nest types in Tuple instance");
      }
      const secondType = arg.$.secondType.$;
      const uRefAccessRight = arg.$.URefAccessRight.$;
      argsTupleList.push(
        DeployArgumentParser.buildSimpleArgs(
          type as CLType.SimpleMap[keyof CLType.SimpleMap],
          secondType,
          argValueStr[i],
          uRefAccessRight
        )
      );
    });
    if (argsTupleList.length === 1) {
      return Args.Instances.tuple1(argsTupleList[0]);
    } else if (argsTupleList.length === 2) {
      return Args.Instances.tuple2(argsTupleList[0], argsTupleList[1]);
    } else {
      return Args.Instances.tuple3(
        argsTupleList[0],
        argsTupleList[1],
        argsTupleList[2]
      );
    }
  }

  static buildKeyOrUrefInstance(
    firstType: number,
    secondType: KeyType | null,
    argValueStr: string,
    uRefAccessRight?: 1 | 4 | 7 | 6 | 5 | 0 | 2 | 3 | undefined
  ): CLValueInstance {
    const value = new CLValueInstance.Value();
    const clType = new CLType();
    if (firstType === CLType.Simple.KEY) {
      const key = new Key();
      let keyType = secondType as KeyType;
      let valueInByteArray = decodeBase16(argValueStr);
      switch (keyType) {
        case KeyType.ADDRESS:
          const address = new Key.Address();
          address.setAccount(valueInByteArray);
          key.setAddress(address);
          break;
        case KeyType.HASH:
          const hash = new Key.Hash();
          hash.setHash(valueInByteArray);
          key.setHash(hash);
          break;
        case KeyType.UREF:
          const uRef = new Key.URef();
          uRef.setUref(valueInByteArray);
          uRef.setAccessRights(uRefAccessRight!);
          key.setUref(uRef);
          break;
      }
      value.setKey(key);
      clType.setSimpleType(CLType.Simple.KEY);
    } else {
      const URef = new Key.URef();
      URef.setAccessRights(uRefAccessRight!);
      URef.setUref(decodeBase16(argValueStr));
      value.setUref(URef);
      clType.setSimpleType(CLType.Simple.UREF);
    }

    const clValueInstance = new CLValueInstance();
    clValueInstance.setClType(clType);
    clValueInstance.setValue(value);
    return clValueInstance;
  }
}

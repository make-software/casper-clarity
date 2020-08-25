import { action, observable } from 'mobx';

import ErrorContainer from './ErrorContainer';
import {
  Args,
  CasperService,
  decodeBase16,
  DeployUtil,
  encodeBase16,
  Signer
} from 'casperlabs-sdk';
import { FieldState, FormState } from 'formstate';
import {
  numberGreaterThan,
  validateBase16,
  validateInt,
  valueRequired
} from '../lib/FormsValidator';
import $ from 'jquery';
import { Deploy } from 'casperlabs-grpc/io/casperlabs/casper/consensus/consensus_pb';
import {
  CLType,
  CLValueInstance,
  Key
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import { decodeBase64 } from 'tweetnacl-ts';
import JSBI from 'jsbi';
import { publicKeyHashForEd25519 } from './AuthContainer';
import { DeployArgumentParser } from '../lib/DeployArgumentParser';

export type ComplexType =
  | 'Bytes'
  | 'Bytes (Fixed Length)'
  | 'Tuple'
  | 'Map'
  | 'List'
  | 'FixedList';

type SupportedType = CLType.SimpleMap[keyof CLType.SimpleMap] | ComplexType;

export const ComplexTypesString = [
  'Bytes',
  'Bytes (Fixed Length)',
  'Tuple',
  'Map',
  'List',
  'FixedList'
];

export enum KeyType {
  ADDRESS = 'Address',
  HASH = 'Hash',
  UREF = 'URef'
}

export type DeployArgument = {
  name: FieldState<string>;
  type: FieldState<SupportedType>;
  // if type == ArgumentType.Key then the type of secondType is KeyType
  // and if type == ArgumentType.BIG_INT, then the type of secondType is BitWidth
  // otherwise second equals to null
  secondType: FieldState<KeyType | null>;
  // List, the length of inner deploy arguments list is 1.
  listInnerDeployArgs: FormDeployArguments;
  // Tuple, the length of it is variant, could be 1, 2 and 3
  tupleInnerDeployArgs: FormDeployArguments;
  // Map, the length of it is fixed, 2 for key and value.
  mapInnerDeployArgs: FormDeployArguments;
  URefAccessRight: FieldState<
    Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap]
  >; // null if type != ArgumentType.KEY
  value: FieldState<string>;
};

export type FormDeployArgument = FormState<DeployArgument>;
type FormDeployArguments = FormState<FormDeployArgument[]>;

export type DeployConfiguration = {
  contractType: FieldState<DeployUtil.ContractType | null>;
  contractHash: FieldState<string>;
  contractName: FieldState<string>;
  entryPoint: FieldState<string>;
  paymentAmount: FieldState<number>;
  fromAddress: FieldState<string>;
};

export type FormDeployConfiguration = FormState<DeployConfiguration>;

interface RawDeployArguments {
  name: string;
  type: SupportedType;
  secondType: KeyType | null;
  innerDeployArgs: RawDeployArguments[];
  URefAccessRight: Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap];
  value: string;
}

interface UserInputPersistent {
  deployConfiguration: {
    contractType: DeployUtil.ContractType | null;
    paymentAmount: number;
    fromAddress: string;
  };
  deployArguments: RawDeployArguments[];
  editingDeployArguments: RawDeployArguments[];
  editing: boolean;
}

export class DeployContractsContainer {
  @observable deployConfiguration: FormDeployConfiguration = new FormState<
    DeployConfiguration
  >({
    contractType: new FieldState<DeployUtil.ContractType | null>(
      null
    ).validators(valueRequired),
    contractHash: new FieldState('').disableAutoValidation(),
    paymentAmount: new FieldState<number>(10000000).validators(
      numberGreaterThan(0),
      validateInt
    ),
    fromAddress: new FieldState<string>(''),
    contractName: new FieldState<string>(''),
    entryPoint: new FieldState<string>('call')
  })
    .compose()
    .validators(deployConfiguration => {
      if (deployConfiguration.contractType.$ === DeployUtil.ContractType.Hash) {
        let value = deployConfiguration.contractHash.value;
        let v =
          validateBase16(value) ||
          valueRequired(value) ||
          valueRequired(deployConfiguration.entryPoint.value);
        if (v !== false) {
          deployConfiguration.contractHash.setError(v);
        }
        return v;
      } else if (
        deployConfiguration.contractType.$ === DeployUtil.ContractType.WASM
      ) {
        // WASM
        if (!this.selectedFile) {
          const msg = 'Upload WASM file firstly';
          alert(msg);
          return msg;
        }
      } else if (
        deployConfiguration.contractType.$ === DeployUtil.ContractType.Name
      ) {
        let v =
          valueRequired(deployConfiguration.contractName.value) ||
          valueRequired(deployConfiguration.entryPoint.value);
        if (v !== false) {
          deployConfiguration.contractHash.setError(v);
        }
        return v;
      }
      return false;
    });
  @observable deployArguments: FormDeployArguments = new FormState<
    FormDeployArgument[]
  >([]);
  @observable editingDeployArguments: FormDeployArguments = new FormState<
    FormDeployArgument[]
  >([]);
  @observable selectedFile: File | null = null;
  @observable editing: boolean = false;
  @observable signDeployModal: boolean = false;
  // indicate whether we are waiting for signing from plugin
  @observable signing: boolean = false;
  // hash of deploy result
  @observable deployedHash: string | null = null;
  private selectedFileContent: null | ByteArray = null;
  private static PersistentKey = 'deploy-configuration';

  // id for accordion
  accordionId = 'deploy-table-accordion';

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperService
  ) {
    this.tryRestore();
  }

  @action.bound
  removeDeployArgument(deployArgument: FormDeployArgument) {
    let i = this.deployArguments.$.findIndex(f => f === deployArgument);
    this.deployArguments.$.splice(i, 1);
    this.saveToSessionStore();
  }

  @action.bound
  addNewEditingDeployArgument() {
    this.editing = true;
    this.editingDeployArguments.$.push(
      DeployContractsContainer.newDeployArgument()
    );
  }

  public static newDeployArgument(
    hasInnerDeployArgs: boolean = true,
    name: string = '',
    type: SupportedType = CLType.Simple.BOOL,
    secondType: KeyType | null = null,
    accessRight: Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap] = Key
      .URef.AccessRights.NONE,
    value: string = ''
  ) {
    const listInnerArgs = new FormState<FormDeployArgument[]>([]);
    const tupleInnerArgs = new FormState<FormDeployArgument[]>([]);
    const mapInnerArgs = new FormState<FormDeployArgument[]>([]);
    if (hasInnerDeployArgs) {
      listInnerArgs.$.push(DeployContractsContainer.newDeployArgument(false));
      tupleInnerArgs.$.push(DeployContractsContainer.newDeployArgument(false));
      mapInnerArgs.$.push(DeployContractsContainer.newDeployArgument(false));
      mapInnerArgs.$.push(DeployContractsContainer.newDeployArgument(false));
    }
    return new FormState({
      name: new FieldState<string>(name)
        .disableAutoValidation()
        .validators(...(hasInnerDeployArgs ? [valueRequired] : [])),
      type: new FieldState<SupportedType>(type),
      secondType: new FieldState<KeyType | null>(secondType),
      listInnerDeployArgs: listInnerArgs,
      tupleInnerDeployArgs: tupleInnerArgs,
      mapInnerDeployArgs: mapInnerArgs,
      URefAccessRight: new FieldState<
        Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap]
      >(accessRight),
      value: new FieldState<string>(value)
        .disableAutoValidation()
        .validators(...(hasInnerDeployArgs ? [valueRequired] : []))
    })
      .compose()
      .validators(
        ...(hasInnerDeployArgs
          ? [DeployContractsContainer.validateDeployArgument]
          : [])
      );
  }

  @action.bound
  handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      this.selectedFileContent = null;
      this.selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.selectedFile);
      reader.onload = _ => {
        this.selectedFileContent = new Uint8Array(reader.result as ArrayBuffer);
      };
    }
  }

  @action.bound
  async saveEditingDeployArguments() {
    const res = await this.editingDeployArguments.validate();
    console.log(this.editingDeployArguments.$.length);
    if (!res.hasError) {
      while (this.editingDeployArguments.$.length) {
        this.deployArguments.$.push(this.editingDeployArguments.$.shift()!);
      }
      this.editing = false;
    }
    // persist manually
    this.saveToSessionStore();
  }

  @action.bound
  cancelEditing() {
    this.editingDeployArguments.$.splice(
      0,
      this.editingDeployArguments.$.length
    );
    this.editing = false;
    this.saveToSessionStore();
  }

  @action.bound
  clearForm() {
    let msg = 'Do you want to clear the form?';
    if (window.confirm(msg)) {
      this.deployConfiguration.reset();
      this.editing = false;
      this.editingDeployArguments.reset();
      this.deployArguments.reset();
    }
  }

  @action.bound
  async openSignModal() {
    let v1 = await this.deployConfiguration.validate();
    let v2 = await this.deployArguments.validate();
    if (v1.hasError || v2.hasError) {
      return;
    } else {
      this.signDeployModal = true;
    }
  }

  @action.bound
  async onSubmit() {
    return this.errors.withCapture(this._onSubmit()).catch(() => {
      return false;
    });
  }

  @action.bound
  async _onSubmit() {
    this.deployedHash = null;
    if (!Signer.isConnected()) {
      throw new Error(
        'Please install the CasperLabs Sign Helper Plugin first!'
      );
    }

    const publicKeyBase64 = await Signer.getSelectedPublicKeyBase64();
    if (!publicKeyBase64) {
      throw new Error('Please create an account in the Plugin first!');
    }
    // Todo: (ECO-441) make Signer return publicKeyHash directly
    const publicKeyHash = publicKeyHashForEd25519(publicKeyBase64);
    let deploy = await this.makeDeploy(publicKeyHash);
    if (!deploy) {
      return false;
    }

    this.signing = true;
    let sigBase64;
    try {
      sigBase64 = await Signer.sign(
        encodeBase16(deploy!.getDeployHash_asU8()),
        publicKeyBase64
      );
      this.signing = false;
      let signedDeploy = DeployUtil.setSignature(
        deploy,
        decodeBase64(sigBase64),
        decodeBase64(publicKeyBase64)
      );
      await this.casperService.deploy(signedDeploy);
      ($(`#${this.accordionId}`) as any).collapse('hide');
      this.deployedHash = encodeBase16(signedDeploy.getDeployHash_asU8());
      return true;
    } catch (e) {
      this.signing = false;
      throw e;
    }
  }

  private async makeDeploy(publicKeyHash: Uint8Array): Promise<Deploy | null> {
    let deployConfigurationForm = await this.deployConfiguration.validate();
    let deployArguments = await this.deployArguments.validate();
    if (deployConfigurationForm.hasError || deployArguments.hasError) {
      return null;
    } else {
      const config = deployConfigurationForm.value;
      const args = deployArguments.value;
      let session: ByteArray | string;

      let argsProto = args.map((arg: FormState<DeployArgument>) => {
        return this.buildArgument(arg);
      });
      const paymentAmount = JSBI.BigInt(config.paymentAmount.value);

      if (config.contractType.value === DeployUtil.ContractType.WASM) {
        session = this.selectedFileContent!;
        return DeployUtil.makeDeploy(
          argsProto,
          DeployUtil.ContractType.WASM,
          session,
          null,
          paymentAmount,
          publicKeyHash
        );
      } else if (config.contractType.value === DeployUtil.ContractType.Hash) {
        session = decodeBase16(config.contractHash.value);
        const entryPoint = config.entryPoint.value;
        return DeployUtil.makeDeploy(
          argsProto,
          DeployUtil.ContractType.Hash,
          session,
          null,
          paymentAmount,
          publicKeyHash,
          [],
          entryPoint
        );
      } else if (config.contractType.value === DeployUtil.ContractType.Name) {
        session = config.contractName.value;
        const entryPoint = config.entryPoint.value;
        return DeployUtil.makeDeploy(
          argsProto,
          DeployUtil.ContractType.Name,
          session,
          null,
          paymentAmount,
          publicKeyHash,
          [],
          entryPoint
        );
      }
      return Promise.resolve(null);
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
        clValueInstance = DeployContractsContainer.buildKeyOrUrefInstance(
          firstType,
          secondType,
          argValueInJson,
          uRefAccessRight
        );
        break;
    }
    return clValueInstance;
  }

  private buildArgument(arg: FormState<DeployArgument>) {
    const argValueStr: string = arg.$.value.value;
    const type = arg.$.type.$;
    let clValueInstance: CLValueInstance;
    const argValueStrInJson = JSON.parse(argValueStr);
    if (DeployContractsContainer.isSimpleType(type)) {
      clValueInstance = DeployContractsContainer.buildSimpleArgs(
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
          clValueInstance = this.buildTupleTypeArg(
            arg.$.tupleInnerDeployArgs.$,
            argValueStrInJson
          );
          break;
        case 'Map':
          clValueInstance = this.buildMapTypeArg(
            arg.$.mapInnerDeployArgs.$,
            argValueStrInJson
          );
          break;
        case 'List':
          clValueInstance = this.buildListTypeArg(
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
          throw new Error('Failed creating arguments');
      }
    }

    const deployArg = new Deploy.Arg();
    deployArg.setName(arg.$.name.value);
    deployArg.setValue(clValueInstance);
    return deployArg;
  }

  private buildTupleTypeArg(
    tupleInnerDeployArgs: FormDeployArgument[],
    argValueStr: any
  ) {
    const argsTupleList: CLValueInstance[] = [];
    tupleInnerDeployArgs.forEach((arg, i) => {
      const type = arg.$.type.$;
      if (!DeployContractsContainer.isSimpleType(type)) {
        throw new Error("Don't support nest types in Tuple instance");
      }
      const secondType = arg.$.secondType.$;
      const uRefAccessRight = arg.$.URefAccessRight.$;
      argsTupleList.push(
        DeployContractsContainer.buildSimpleArgs(
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

  private static buildKeyOrUrefInstance(
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

  /**
   * Implement validator for DeployArgument which can be used in formstate library,
   * If a truthy string is returned it represents a validation error.
   * @param deployArgument
   */
  private static validateDeployArgument(
    deployArgument: DeployArgument
  ): string | false {
    const value = deployArgument.value.$;
    let valueInJson;
    try {
      valueInJson = JSON.parse(value);
    } catch (e) {
      return e.message;
    }
    switch (deployArgument.type.$) {
      case CLType.Simple.U8:
      case CLType.Simple.U32:
      case CLType.Simple.U64:
      case CLType.Simple.I32:
      case CLType.Simple.I64:
      case CLType.Simple.U128:
      case CLType.Simple.U256:
      case CLType.Simple.U512:
        return DeployArgumentParser.validateBigInt(
          valueInJson,
          deployArgument.type.$
        );
      case CLType.Simple.STRING:
        return DeployArgumentParser.validateString(valueInJson);
      case CLType.Simple.BOOL:
        return DeployArgumentParser.validateBoolean(valueInJson);
      case CLType.Simple.KEY:
      case CLType.Simple.UREF:
        return DeployArgumentParser.validateBase16String(valueInJson);
      case 'Bytes':
        return DeployArgumentParser.validateBase16String(valueInJson);
    }
    return false;
  }

  @action
  private tryRestore() {
    const preState = localStorage.getItem(
      DeployContractsContainer.PersistentKey
    );
    if (preState !== null) {
      const value = JSON.parse(preState) as UserInputPersistent;

      this.editing = value.editing;

      this.deployConfiguration.$.paymentAmount.onChange(
        value.deployConfiguration.paymentAmount
      );
      this.deployConfiguration.$.contractType.onChange(
        value.deployConfiguration.contractType
      );
      this.deployConfiguration.$.fromAddress.onChange(
        value.deployConfiguration.fromAddress
      );

      this.editingDeployArguments.reset();
      this.deployArguments.reset();

      value.editingDeployArguments?.forEach(arg => {
        const deployArgument = DeployContractsContainer.newDeployArgument(
          true,
          arg.name,
          arg.type,
          arg.secondType,
          arg.URefAccessRight,
          arg.value
        );
        this.editingDeployArguments.$.push(deployArgument);
      });

      value.deployArguments?.forEach(arg => {
        const deployArgument = DeployContractsContainer.newDeployArgument(
          true,
          arg.name,
          arg.type,
          arg.secondType,
          arg.URefAccessRight,
          arg.value
        );
        this.deployArguments.$.push(deployArgument);
      });
    }
  }

  public saveToSessionStore() {
    let deployConfiguration = this.deployConfiguration.$;
    let state: UserInputPersistent = {
      deployArguments: this.deployArguments.$.map(arg => {
        const value = arg.$;
        return {
          name: value.name.value,
          type: value.type.value,
          secondType: value.secondType.value,
          innerDeployArgs: value.tupleInnerDeployArgs.$.map(
            (a: FormState<DeployArgument>) => {
              return {
                name: a.$.name.value,
                type: a.$.type.value,
                secondType: a.$.secondType.value,
                innerDeployArgs: [] as RawDeployArguments[],
                URefAccessRight: a.$.URefAccessRight.value,
                value: a.$.value.value
              };
            }
          ),
          URefAccessRight: value.URefAccessRight.value,
          value: value.value.value
        };
      }),
      deployConfiguration: {
        contractType: deployConfiguration.contractType.value,
        paymentAmount: deployConfiguration.paymentAmount.value,
        fromAddress: deployConfiguration.fromAddress.value
      },
      editing: this.editing,
      editingDeployArguments: this.editingDeployArguments.$.map(arg => {
        const value = arg.$;
        return {
          name: value.name.value,
          type: value.type.value,
          secondType: value.secondType.value,
          innerDeployArgs: value.tupleInnerDeployArgs.$.map(a => {
            return {
              name: a.$.name.value,
              type: a.$.type.value,
              secondType: a.$.secondType.value,
              innerDeployArgs: [] as RawDeployArguments[],
              URefAccessRight: a.$.URefAccessRight.value,
              value: a.$.value.value
            };
          }),
          URefAccessRight: value.URefAccessRight.value,
          value: value.value.value
        };
      })
    };

    localStorage.setItem(
      DeployContractsContainer.PersistentKey,
      JSON.stringify(state)
    );
  }

  private buildListTypeArg(
    listInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any,
    isFixedList: boolean
  ) {
    const firstType = listInnerDeployArgs[0].$.type.$;
    if (!DeployContractsContainer.isSimpleType(firstType)) {
      throw new Error("Don't support nest types");
    }
    const secondType = listInnerDeployArgs[0].$.secondType.$;
    const uRefAccessRight = listInnerDeployArgs[0].$.URefAccessRight.$;
    const argsList = argValueInJson.map((arg: any) => {
      return DeployContractsContainer.buildSimpleArgs(
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

  private buildMapTypeArg(
    mapInnerDeployArgs: FormDeployArgument[],
    argValueInJson: any
  ) {
    const keyType = mapInnerDeployArgs[0].$.type.$;
    const valueType = mapInnerDeployArgs[1].$.type.$;
    if (
      !DeployContractsContainer.isSimpleType(keyType) ||
      !DeployContractsContainer.isSimpleType(valueType)
    ) {
      throw new Error("Don't support nest types in Map instance");
    }
    const keySecondType = mapInnerDeployArgs[0].$.secondType.$;
    const keyURefAccessRight = mapInnerDeployArgs[0].$.URefAccessRight.$;

    const valueSecondType = mapInnerDeployArgs[1].$.secondType.$;
    const valueURefAccessRight = mapInnerDeployArgs[1].$.URefAccessRight.$;
    const mapEntries = argValueInJson.map((arg: any) => {
      const key = DeployContractsContainer.buildSimpleArgs(
        keyType as CLType.SimpleMap[keyof CLType.SimpleMap],
        keySecondType,
        arg.key,
        keyURefAccessRight
      );
      const value = DeployContractsContainer.buildSimpleArgs(
        valueType as CLType.SimpleMap[keyof CLType.SimpleMap],
        valueSecondType,
        arg.value,
        valueURefAccessRight
      );
      return [key, value];
    });
    return Args.Instances.map(mapEntries);
  }
}

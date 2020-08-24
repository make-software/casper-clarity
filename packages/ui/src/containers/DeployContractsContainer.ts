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
import validator from 'validator';
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

export enum BitWidth {
  B_128 = 128,
  B_256 = 256,
  B_512 = 512
}

export type DeployArgument = {
  name: FieldState<string>;
  type: FieldState<SupportedType>;
  // if type == ArgumentType.Key then the type of secondType is KeyType
  // and if type == ArgumentType.BIG_INT, then the type of secondType is BitWidth
  // otherwise second equals to null
  secondType: FieldState<KeyType | BitWidth | null>;
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
  secondType: KeyType | BitWidth | null;
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
    secondType: KeyType | BitWidth | null = null,
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
    const formState = new FormState({
      name: new FieldState<string>(name)
        .disableAutoValidation()
        .validators(...(hasInnerDeployArgs ? [valueRequired] : [])),
      type: new FieldState<SupportedType>(type),
      secondType: new FieldState<KeyType | BitWidth | null>(secondType),
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
    return formState;
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
      let type: DeployUtil.ContractType;
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

  private buildArgument(arg: FormState<DeployArgument>) {
    const argValueStr: string = arg.$.value.value;
    const type = arg.$.type.$;
    let clValueInstance: CLValueInstance;
    const argValueStrInJson = JSON.parse(argValueStr);
    switch (type) {
      case 'Bytes':
        clValueInstance = Args.Instances.bytes(decodeBase16(argValueStrInJson));
        break;
      case 'Bytes (Fixed Length)':
        clValueInstance = Args.Instances.bytesFixedLength(
          decodeBase16(argValueStrInJson)
        );
        break;
      case 'Tuple':
        clValueInstance = this.buildTupleTypeArg(
          arg.$.tupleInnerDeployArgs,
          argValueStr
        );
        break;
      case 'Map':
        clValueInstance = this.buildTupleTypeArg(
          arg.$.tupleInnerDeployArgs,
          argValueStr
        );
        break;
      case 'List':
        clValueInstance = this.buildTupleTypeArg(
          arg.$.tupleInnerDeployArgs,
          argValueStr
        );
        break;
      case 'FixedList':
        clValueInstance = this.buildTupleTypeArg(
          arg.$.tupleInnerDeployArgs,
          argValueStr
        );
        break;
      case CLType.Simple.BOOL:
        clValueInstance = Args.Instances.bool(argValueStrInJson);
        break;
      case CLType.Simple.I32:
        clValueInstance = Args.Instances.i32(argValueStrInJson);
        break;
      case CLType.Simple.I64:
        clValueInstance = Args.Instances.i64(argValueStrInJson);
        break;
      case CLType.Simple.U8:
        clValueInstance = Args.Instances.u8(argValueStrInJson);
        break;
      case CLType.Simple.U32:
        clValueInstance = Args.Instances.u32(argValueStrInJson);
        break;
      case CLType.Simple.U64:
        clValueInstance = Args.Instances.u64(argValueStrInJson);
        break;
      case CLType.Simple.U128:
        clValueInstance = Args.Instances.u128(argValueStrInJson);
        break;
      case CLType.Simple.U256:
        clValueInstance = Args.Instances.u256(argValueStrInJson);
        break;
      case CLType.Simple.U512:
        clValueInstance = Args.Instances.u512(argValueStrInJson);
        break;
      case CLType.Simple.UNIT:
        clValueInstance = Args.Instances.unit();
        break;
      case CLType.Simple.STRING:
        clValueInstance = Args.Instances.string(argValueStrInJson);
        break;
      case CLType.Simple.KEY:
      case CLType.Simple.UREF:
        clValueInstance = this.buildKeyOrUrefInstance(type, argValueStr, arg);
        break;
    }

    const deployArg = new Deploy.Arg();
    deployArg.setName(arg.$.name.value);
    deployArg.setValue(clValueInstance);
    return deployArg;
  }

  private buildTupleTypeArg(
    tupleInnerDeployArgs: FormDeployArguments,
    argValueStr: string
  ) {
    let length = tupleInnerDeployArgs.$.length;

    const value = new CLValueInstance.Value();
    const type: CLType = new CLType();
    const tupleTypes = tupleInnerDeployArgs.$.map(a => {
      if (a.$.type.value in CLType.Simple) {
        const clType = new CLType();
        clType.setSimpleType(
          a.$.type.value as CLType.SimpleMap[keyof CLType.SimpleMap]
        );
        return clType;
      }
      throw new Error();
    });

    if (length === 1) {
      const tuple1Type = new CLType.Tuple1();
      tuple1Type.setType0(tupleTypes[0]);
      type.setTuple1Type(tuple1Type);
    } else if (length === 2) {
      const tuple2Type = new CLType.Tuple2();
      tuple2Type.setType0(tupleTypes[0]);
      tuple2Type.setType1(tupleTypes[1]);
      type.setTuple2Type(tuple2Type);
    } else if (length === 3) {
      const tuple3Type = new CLType.Tuple3();
      tuple3Type.setType0(tupleTypes[0]);
      tuple3Type.setType1(tupleTypes[1]);
      tuple3Type.setType2(tupleTypes[2]);
      type.setTuple3Type(tuple3Type);
    } else {
      throw new Error();
    }

    const clValueInstance = new CLValueInstance();
    clValueInstance.setClType(type);
    clValueInstance.setValue();
    return clValueInstance;
  }

  private buildBytesFixedLengthTypeArg(argValueStr: string): CLValueInstance {
    const innerType = new CLType();
    innerType.setSimpleType(CLType.Simple.U8);
    const fixedListType = new CLType.FixedList();
    fixedListType.setInner(innerType);
    const bytes = decodeBase16(argValueStr);
    fixedListType.setLen(bytes.length);

    const clType = new CLType();
    clType.setFixedListType(fixedListType);

    const value = new CLValueInstance.Value();
    value.setBytesValue(bytes);

    const clValueInstance = new CLValueInstance();
    clValueInstance.setClType(clType);
    clValueInstance.setValue(value);
    return clValueInstance;
  }

  private buildKeyOrUrefInstance(
    simpleType: number,
    argValueStr: string,
    arg: FormState<DeployArgument>
  ): CLValueInstance {
    const value = new CLValueInstance.Value();
    const clType = new CLType();
    if (simpleType === CLType.Simple.KEY) {
      const key = new Key();
      let keyType = arg.$.secondType.value as KeyType;
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
          uRef.setAccessRights(arg.$.URefAccessRight.value!);
          key.setUref(uRef);
          break;
      }
      value.setKey(key);
      clType.setSimpleType(CLType.Simple.KEY);
    } else {
      const URef = new Key.URef();
      URef.setAccessRights(arg.$.URefAccessRight.value!);
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
}

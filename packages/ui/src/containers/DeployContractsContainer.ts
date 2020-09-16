import { action, observable } from 'mobx';

import ErrorContainer from './ErrorContainer';
import {
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
  Key
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import { decodeBase64 } from 'tweetnacl-ts';
import JSBI from 'jsbi';
import { publicKeyHashForEd25519 } from './AuthContainer';
import { DeployArgumentParser } from '../lib/DeployArgumentParser';
import MetricsService from '../services/MetricsService';
import AuthService from '../services/AuthService';

export const BytesTypeStr = 'Bytes';
export const BytesFixedTypeStr = 'Bytes (Fixed Length)';

export type SimpleType =
  | 'Bytes'
  | 'Bytes (Fixed Length)'
  | CLType.SimpleMap[keyof CLType.SimpleMap];

export type ComplexType = 'Tuple' | 'Map' | 'List' | 'FixedList';

export type SupportedType = SimpleType | ComplexType;

export const ComplexTypesString = ['Tuple', 'Map', 'List', 'FixedList'];

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
  // List, the length of inner deploy arguments list is 1.
  listInnerDeployArgs: RawDeployArguments[];
  // Tuple, the length of it is variant, could be 1, 2 and 3
  tupleInnerDeployArgs: RawDeployArguments[];
  // Map, the length of it is fixed, 2 for key and value.
  mapInnerDeployArgs: RawDeployArguments[];
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
    private casperService: CasperService,
    private authService: AuthService
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
    value: string = '',
    secondType: KeyType | null = null,
    accessRight: Key.URef.AccessRightsMap[keyof Key.URef.AccessRightsMap] = Key
      .URef.AccessRights.NONE
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
          ? [DeployArgumentParser.validateDeployArgument]
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
      const jwtToken = await this.authService.getToken();
      MetricsService.metricCollect('deploy', jwtToken);
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
        return DeployArgumentParser.buildArgument(arg);
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

  @action
  private tryRestore() {
    const preState = localStorage.getItem(
      DeployContractsContainer.PersistentKey
    );
    let restoreDeployArgument = function(arg: RawDeployArguments) {
      let helper = function(
        innerDeployArg: DeployArgument,
        mapArg: RawDeployArguments
      ) {
        innerDeployArg.name.onChange(mapArg.name);
        innerDeployArg.type.onChange(mapArg.type);
        innerDeployArg.value.onChange(mapArg.value);
        innerDeployArg.secondType.onChange(mapArg.secondType);
        innerDeployArg.URefAccessRight.onChange(mapArg.URefAccessRight);
      };
      const deployArgument = DeployContractsContainer.newDeployArgument(
        true,
        arg.name,
        arg.type,
        arg.value,
        arg.secondType,
        arg.URefAccessRight
      );
      arg?.mapInnerDeployArgs?.forEach((mapArg, idx) => {
        const innerDeployArg = deployArgument.$.mapInnerDeployArgs.$[idx].$;
        helper(innerDeployArg, mapArg);
      });
      arg?.listInnerDeployArgs?.forEach((listArg, idx) => {
        helper(deployArgument.$.listInnerDeployArgs.$[idx].$, listArg);
      });

      // Unlike list or map, the length of tuple is variable.
      arg?.tupleInnerDeployArgs?.forEach((tupleArg, idx) => {
        if (idx === 0) {
          helper(deployArgument.$.tupleInnerDeployArgs.$[idx].$, tupleArg);
        } else {
          deployArgument.$.tupleInnerDeployArgs.$.push(
            DeployContractsContainer.newDeployArgument(
              false,
              tupleArg.name,
              tupleArg.type,
              tupleArg.value,
              tupleArg.secondType,
              tupleArg.URefAccessRight
            )
          );
        }
      });
      return deployArgument;
    };
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
        const deployArgument = restoreDeployArgument(arg);
        this.editingDeployArguments.$.push(deployArgument);
      });

      value.deployArguments?.forEach(arg => {
        const deployArgument = restoreDeployArgument(arg);
        this.deployArguments.$.push(deployArgument);
      });
    }
  }

  public saveToSessionStore() {
    let deployConfiguration = this.deployConfiguration.$;
    let helper = (a: FormState<DeployArgument>) => {
      return {
        name: a.$.name.value,
        type: a.$.type.value,
        secondType: a.$.secondType.value,
        // Don't support nested complex types
        listInnerDeployArgs: [] as RawDeployArguments[],
        tupleInnerDeployArgs: [] as RawDeployArguments[],
        mapInnerDeployArgs: [] as RawDeployArguments[],
        URefAccessRight: a.$.URefAccessRight.value,
        value: a.$.value.value
      };
    };
    let state: UserInputPersistent = {
      deployArguments: this.deployArguments.$.map(arg => {
        const value = arg.$;
        return {
          name: value.name.value,
          type: value.type.value,
          secondType: value.secondType.value,
          tupleInnerDeployArgs: value.tupleInnerDeployArgs.$.map(helper),
          listInnerDeployArgs: value.listInnerDeployArgs.$.map(helper),
          mapInnerDeployArgs: value.mapInnerDeployArgs.$.map(helper),
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
          tupleInnerDeployArgs: value.tupleInnerDeployArgs.$.map(helper),
          listInnerDeployArgs: value.listInnerDeployArgs.$.map(helper),
          mapInnerDeployArgs: value.mapInnerDeployArgs.$.map(helper),
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

import { observer } from 'mobx-react';
import { FileSelect, Form, NumberField, SelectField, TextField } from './Forms';
import {
  Button,
  Card,
  FailIcon,
  Icon,
  ListInline,
  Spinner,
  SuccessIcon,
  RefreshableComponent
} from './Utils';
import React from 'react';
import {
  BytesFixedTypeStr,
  BytesTypeStr,
  ComplexType,
  ComplexTypesString,
  DeployContractsContainer,
  FormDeployArgument,
  KeyType
} from '../containers/DeployContractsContainer';
import Modal from './Modal';
import {
  CLType,
  Key
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import Pages from './Pages';
import { Link } from 'react-router-dom';
import { DeployUtil, Signer } from 'casper-client-sdk';

interface Props {
  deployContractsContainer: DeployContractsContainer;
}

@observer
export class DeployContractsForm extends RefreshableComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.refreshIntervalMillis = 1000;
  }

  connectedToSigner: boolean;

  async refresh() {
    try {
      this.connectedToSigner = !!(await Signer?.isConnected());
    } catch (err) {
      console.error(err);
    }
  }

  private interval: number | null;

  componentDidMount(): void {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
    this.interval = window.setInterval(() => {
      this.props.deployContractsContainer.saveToSessionStore();
    }, 10 * 1000);
  }

  componentWillUnmount(): void {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
  }

  render() {
    // For some reason refresh() wasn't being called automatically
    this.refresh();
    const { deployContractsContainer } = this.props;
    let hint = this.connectedToSigner ? (
      <p>
        <SuccessIcon /> We will use CasperLabs Signer extension to sign the
        deploy
      </p>
    ) : (
      <p>
        <FailIcon />
        Please connect to the Signer first. If you don't have it installed you
        can get it&nbsp;
        <a
          href="https://chrome.google.com/webstore/detail/casperlabs-signer/djhndpllfiibmcdbnmaaahkhchcoijce"
          target="_blank"
        >
          here.
        </a>
      </p>
    );
    let modalAccountForm = (
      <Modal
        id="id-sign-modal"
        title="Sign Deploy"
        submitLabel="Sign & Deploy"
        onSubmit={deployContractsContainer.onSubmit}
        onClose={() => {
          deployContractsContainer.signDeployModal = false;
        }}
      >
        {deployContractsContainer.signing
          ? Spinner('Please open the plugin to sign the deploy')
          : hint}
      </Modal>
    );
    return (
      <div>
        <Card
          title="Deploy Smart Contracts"
          accordionId={deployContractsContainer.accordionId}
        >
          <Form>
            <SelectField
              id="id-contract-type"
              label="Type"
              value={
                deployContractsContainer.deployConfiguration.$.contractType.$
              }
              placeholder="Please Select the Type of Deploy"
              options={Object.keys(DeployUtil.ContractType).map(t => {
                return {
                  label: (DeployUtil.ContractType as any)[t],
                  value: t
                };
              })}
              onChange={(value: string) => {
                deployContractsContainer.deployConfiguration.$.contractType.onChange(
                  value as DeployUtil.ContractType
                );
              }}
            />
            {deployContractsContainer.deployConfiguration.$.contractType.$ ===
              DeployUtil.ContractType.WASM && (
              <FileSelect
                id="id-wasm-select"
                label={
                  deployContractsContainer.selectedFile?.name ||
                  'Select WASM File'
                }
                handleFileSelect={deployContractsContainer.handleFileSelect}
              />
            )}
            {deployContractsContainer.deployConfiguration.$.contractType.$ ===
              DeployUtil.ContractType.Hash && (
              <React.Fragment>
                <TextField
                  id="id-contract-hash"
                  label="Hash(Base16) of the Contract"
                  fieldState={
                    deployContractsContainer.deployConfiguration.$.contractHash
                  }
                />
                <TextField
                  id="id-contract-hash"
                  label="Entry point"
                  fieldState={
                    deployContractsContainer.deployConfiguration.$.entryPoint
                  }
                />
              </React.Fragment>
            )}
            {deployContractsContainer.deployConfiguration.$.contractType.$ ===
              DeployUtil.ContractType.Name && (
              <React.Fragment>
                <TextField
                  id="id-contract-hash"
                  label="Name of the Contract"
                  fieldState={
                    deployContractsContainer.deployConfiguration.$.contractName
                  }
                />
                <TextField
                  id="id-contract-hash"
                  label="Entry point"
                  fieldState={
                    deployContractsContainer.deployConfiguration.$.entryPoint
                  }
                />
              </React.Fragment>
            )}
            <NumberField
              id="id-payment-amount"
              label="Payment Amount"
              fieldState={
                deployContractsContainer.deployConfiguration.$.paymentAmount
              }
            />
            <TextField
              id="id-from-address"
              label="From (Optional)"
              fieldState={
                deployContractsContainer.deployConfiguration.$.fromAddress
              }
            />
          </Form>

          {deployContractsContainer.signDeployModal && modalAccountForm}

          <Card title="Setting Arguments" accordionId={'arguments-table'}>
            <ArgumentTable
              deployContractsContainer={deployContractsContainer}
            />
          </Card>

          <div className="mt-5">
            <ListInline>
              <Button
                size="lg"
                onClick={deployContractsContainer.openSignModal}
                title={'Sign'}
              />
              <Button
                size="lg"
                type="danger"
                onClick={deployContractsContainer.clearForm}
                title={'Clear'}
              />
            </ListInline>
          </div>
        </Card>
        {deployContractsContainer.deployedHash && (
          <Card title="Deployed Successfully">
            <Link to={Pages.deploy(deployContractsContainer.deployedHash!)}>
              {deployContractsContainer.deployedHash}
            </Link>
          </Card>
        )}
      </div>
    );
  }
}

const TupleArgumentCol = observer(
  (props: { infix: string; deployArguments: FormDeployArgument[] }) => {
    return (
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        {props.deployArguments.map((argument, index) => {
          return (
            <div
              style={{ alignItems: 'center', display: 'flex' }}
              className={'mb-2'}
            >
              <span className={'ml-3 mr-1'}>Tuple {index}: </span>
              <TypeSelectCol
                supportComplexType={false}
                infix={props.infix}
                deployArgument={argument}
              />
              <i
                className={
                  'fa fa-fw fa-' + (index === 0 ? 'null' : 'minus-circle')
                }
                style={{
                  color: 'red'
                }}
                onClick={() => {
                  props.deployArguments.splice(index, 1);
                }}
              />
            </div>
          );
        })}
        {props.deployArguments.length < 3 && (
          <button
            type="button"
            onClick={_ => {
              props.deployArguments.push(
                DeployContractsContainer.newDeployArgument(false)
              );
            }}
            className={`btn btn-xs btn-success mr-4`}
            style={{ width: '140px', alignSelf: 'flex-end' }}
          >
            <Icon name={'plus-circle'} />
            Add more
          </button>
        )}
      </div>
    );
  }
);

const MapArgumentCol = observer(
  (props: {
    infix: string;
    keyDeployArgument: FormDeployArgument;
    valueDeployArgument: FormDeployArgument;
  }) => {
    return (
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <div
          style={{ alignItems: 'center', display: 'flex' }}
          className={'mb-2'}
        >
          <span className={'ml-3 mr-2'} style={{ width: '3rem' }}>
            Key:
          </span>
          <TypeSelectCol
            supportComplexType={false}
            infix={props.infix}
            deployArgument={props.keyDeployArgument}
          />
        </div>
        <div
          style={{ alignItems: 'center', display: 'flex' }}
          className={'mb-2'}
        >
          <span className={'ml-3 mr-2'} style={{ width: '3rem' }}>
            Value:
          </span>
          <TypeSelectCol
            supportComplexType={false}
            infix={props.infix}
            deployArgument={props.valueDeployArgument}
          />
        </div>
      </div>
    );
  }
);

const ListArgumentCol = observer(
  (props: {
    infix: string;
    isFixedList: boolean;
    deployArgument: FormDeployArgument;
  }) => {
    return (
      <React.Fragment>
        <TypeSelectCol {...props} supportComplexType={false} />
      </React.Fragment>
    );
  }
);

const TypeSelectCol = observer(
  (props: {
    infix: string;
    supportComplexType: boolean;
    deployArgument: FormDeployArgument;
    onDelEvent?: (deployArgument: FormDeployArgument) => void;
  }) => {
    const firstTypeValue = props.deployArgument.$.type.value;
    const secondTypeValue = props.deployArgument.$.secondType.value;
    const tupleInnerArgs = props.deployArgument.$.tupleInnerDeployArgs.$;
    const listInnerArgs = props.deployArgument.$.listInnerDeployArgs.$;
    const mapInnerArgs = props.deployArgument.$.mapInnerDeployArgs.$;
    return (
      <React.Fragment>
        <div className="col pl-0 pr-1">
          <select
            className="form-control"
            value={props.deployArgument.$.type.value}
            onChange={e => {
              let v = e.target.value;
              if (
                ComplexTypesString.includes(v) ||
                v === BytesTypeStr ||
                v === BytesFixedTypeStr
              ) {
                props.deployArgument.$.type.onChange(v as ComplexType);
              } else {
                props.deployArgument.$.type.onChange(
                  parseInt(e.target.value) as any
                );
              }
            }}
          >
            {Object.keys(CLType.Simple)
              .filter(opt => (CLType.Simple as any)[opt] !== CLType.Simple.UNIT)
              .map(opt => (
                <option key={opt} value={(CLType.Simple as any)[opt]}>
                  {opt}
                </option>
              ))}
            <React.Fragment>
              <option key={BytesTypeStr} value={BytesTypeStr}>
                {BytesTypeStr}
              </option>
              <option key={BytesFixedTypeStr} value={BytesFixedTypeStr}>
                {BytesFixedTypeStr}
              </option>
            </React.Fragment>
            {props.supportComplexType &&
              ComplexTypesString.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
          </select>
        </div>
        {firstTypeValue === CLType.Simple.KEY && (
          <div className="col pl-0 pr-1">
            <select
              className="form-control"
              value={props.deployArgument.$.secondType.$?.toString()}
              onChange={e => {
                props.deployArgument.$.secondType.onChange(
                  e.target.value as KeyType
                );
              }}
            >
              {firstTypeValue === CLType.Simple.KEY &&
                Object.keys(KeyType).map(opt => (
                  <option key={opt} value={(KeyType as any)[opt]}>
                    {(KeyType as any)[opt]}
                  </option>
                ))}
            </select>
          </div>
        )}
        {((firstTypeValue === CLType.Simple.KEY &&
          secondTypeValue === KeyType.UREF) ||
          firstTypeValue === CLType.Simple.UREF) && (
          <div className="col pl-0 pr-0">
            <select
              className="form-control"
              value={props.deployArgument.$.URefAccessRight.$ as number}
              onChange={e => {
                props.deployArgument.$.URefAccessRight.onChange(
                  parseInt(e.target.value) as any
                );
              }}
            >
              {Object.keys(Key.URef.AccessRights).map(opt => (
                <option key={opt} value={(Key.URef.AccessRights as any)[opt]}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
        {firstTypeValue === 'List' && (
          <ListArgumentCol
            isFixedList={false}
            deployArgument={listInnerArgs[0]}
            infix={props.infix + '-Inner-'}
          />
        )}
        {firstTypeValue === 'FixedList' && (
          <ListArgumentCol
            isFixedList={true}
            deployArgument={props.deployArgument.$.listInnerDeployArgs.$[0]}
            infix={props.infix + '-Inner-'}
          />
        )}
        {firstTypeValue === 'Map' && (
          <MapArgumentCol
            keyDeployArgument={mapInnerArgs[0]}
            valueDeployArgument={mapInnerArgs[1]}
            infix={props.infix + '-Inner-'}
          />
        )}
        {firstTypeValue === 'Tuple' && (
          <TupleArgumentCol
            deployArguments={tupleInnerArgs}
            infix={props.infix + '-Inner-'}
          />
        )}
      </React.Fragment>
    );
  }
);

const ValueInputCol = observer(
  (props: { deployArgument: FormDeployArgument }) => {
    return (
      <td>
        <div>
          <input
            className={`
              form-control
              ${
                !props.deployArgument.$.value.hasBeenValidated
                  ? ''
                  : props.deployArgument.$.value.hasError ||
                    props.deployArgument.hasFormError
                  ? 'is-invalid'
                  : ''
              }
            `}
            type="text"
            value={props.deployArgument.$.value.value}
            onChange={e => {
              props.deployArgument.$.value.onChange(e.target.value);
            }}
            onBlur={() => {
              props.deployArgument.enableAutoValidationAndValidate();
              props.deployArgument.$.value.enableAutoValidationAndValidate();
            }}
          />
          {(props.deployArgument.$.value.hasError ||
            props.deployArgument.hasFormError) && (
            <div className="invalid-feedback">
              {props.deployArgument.$.value.error ||
                props.deployArgument.formError}
            </div>
          )}
        </div>
      </td>
    );
  }
);

const ArgumentRow = observer(
  (props: {
    infix: string;
    deployArgument: FormDeployArgument;
    onDelEvent?: (deployArgument: FormDeployArgument) => void;
  }) => {
    return (
      <tr>
        <td>
          <TextField
            id={`argument-${props.infix}-name`}
            fieldState={props.deployArgument.$.name}
          />
        </td>
        <td>
          <div className={'row'}>
            <TypeSelectCol supportComplexType={true} {...props} />
          </div>
        </td>
        <ValueInputCol deployArgument={props.deployArgument} />
        {props.onDelEvent && (
          <td style={{ borderTop: 'none' }}>
            <input
              type="button"
              className="btn btn-md btn-danger"
              value="Delete"
              onClick={() => {
                props.onDelEvent!(props.deployArgument);
              }}
            />
          </td>
        )}
      </tr>
    );
  }
);

const ArgumentTable = observer(
  (props: { deployContractsContainer: DeployContractsContainer }) => (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Name</th>
            <th style={{ width: '50%' }}>Type</th>
            <th style={{ width: '35%' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {!props.deployContractsContainer.editing &&
          props.deployContractsContainer.deployArguments.$.length === 0 ? (
            <tr>
              <td>No Arguments</td>
            </tr>
          ) : (
            props.deployContractsContainer.deployArguments.$.map(
              (deployArgument, idx) => (
                <ArgumentRow
                  key={idx}
                  deployArgument={deployArgument}
                  infix={`saved-${idx}`}
                  onDelEvent={
                    props.deployContractsContainer.removeDeployArgument
                  }
                />
              )
            )
          )}
          {props.deployContractsContainer.editing &&
            props.deployContractsContainer.editingDeployArguments.$.map(
              (deployArgument, idx) => (
                <ArgumentRow
                  key={idx}
                  infix={`editing-${idx}`}
                  deployArgument={deployArgument}
                />
              )
            )}
        </tbody>
      </table>
      <div className="mt-3">
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <Button
              onClick={
                props.deployContractsContainer.addNewEditingDeployArgument
              }
              title="Add"
              size="xs"
            />
          </li>
          {props.deployContractsContainer.editing && (
            <li className="list-inline-item float-right mr-5">
              <ListInline>
                <Button
                  onClick={props.deployContractsContainer.cancelEditing}
                  title="cancel"
                  size="xs"
                  type="secondary"
                />
                <Button
                  onClick={
                    props.deployContractsContainer.saveEditingDeployArguments
                  }
                  title="save"
                  size="xs"
                  type="success"
                />
              </ListInline>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
);

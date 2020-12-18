import React from 'react';
import { observer } from 'mobx-react';

import AuthContainer, {
  accountHashForEd25519,
  getAccountHash,
  ImportAccountFormData,
  NewAccountFormData
} from '../containers/AuthContainer';
import {
  Button,
  CSPR,
  IconButton,
  ListInline,
  RefreshableComponent
} from './Utils';
import Modal from './Modal';

import { FileSelect, Form, SelectField, TextArea, TextField } from './Forms';
import { ObservableValue } from '../lib/ObservableValueMap';
import DataTable from './DataTable';
import { Keys, PublicKey } from 'casper-client-sdk';
import { decodeBase64 } from 'tweetnacl-ts';

interface Props {
  auth: AuthContainer;
}

@observer
export default class Accounts extends RefreshableComponent<Props, {}> {
  async refresh(force?: boolean) {
    await this.props.auth.refreshAccounts();
    await this.props.auth.refreshBalances(force);
  }

  render() {
    const accountForm = this.props.auth.accountForm;

    let modalAccountForm;
    if (accountForm instanceof NewAccountFormData) {
      // Help IDE infer that the type of accountForm is NewAccountFormData
      let newAccountForm = accountForm;
      modalAccountForm = (
        <Modal
          id="new-account"
          title="Create Account Key"
          submitLabel="Save"
          onSubmit={() => this.props.auth.createAccount()}
          onClose={() => {
            this.props.auth.accountForm = null;
          }}
          error={newAccountForm.error}
        >
          <Form>
            <TextField
              id="id-account-name"
              label="Name"
              fieldState={newAccountForm.name}
              placeholder="Human readable alias"
            />
            <TextField
              id="id-account-hash-base16"
              label="Account Hash"
              fieldState={accountHashForEd25519(
                newAccountForm.publicKeyBase64.value
              )}
              readonly={true}
            />
            <TextArea disabled={true} label={'Public Key'}>
              {newAccountForm.getKeys.exportPublicKeyInPem()}
            </TextArea>
            <TextArea disabled={true} label={'Private Key'}>
              {newAccountForm.getKeys.exportPrivateKeyInPem()}
            </TextArea>
          </Form>
        </Modal>
      );
    } else if (accountForm instanceof ImportAccountFormData) {
      // Help IDE infer that the type of accountForm is ImportAccountFormData
      let importAccountForm = accountForm;
      modalAccountForm = (
        <Modal
          id="import-account"
          title="Import Account Public Key"
          submitLabel="Save"
          onSubmit={() => this.props.auth.importAccount()}
          onClose={() => {
            this.props.auth.accountForm = null;
          }}
          error={importAccountForm.error}
        >
          <Form>
            <FileSelect
              id="id-file-select"
              label={importAccountForm.fileName || 'Choose Public Key File'}
              handleFileSelect={e => {
                importAccountForm.handleFileSelect(e);
              }}
            />
            <SelectField
              id="id-signature-algorithm"
              label="Signature Algorithm"
              value={importAccountForm.algo.value}
              options={[
                { label: 'Ed25519', value: Keys.SignatureAlgorithm.Ed25519 },
                { label: 'Secp256K1', value: Keys.SignatureAlgorithm.Secp256K1 }
              ]}
              onChange={x => importAccountForm.algo.onChange(x)}
            />
            <TextField
              id="id-account-name"
              label="Name"
              fieldState={importAccountForm.name}
              placeholder="Human readable alias"
            />
            <TextField
              id="id-account-hash-base16"
              label="Account Hash"
              fieldState={
                importAccountForm.publicKeyBase64.value &&
                PublicKey.from(
                  decodeBase64(importAccountForm.publicKeyBase64.value),
                  importAccountForm.algo.value as Keys.SignatureAlgorithm
                ).toAccountHex()
              }
              readonly={true}
            />
            <TextField
              id="id-public-key-base64"
              label="Public Key (Base64)"
              fieldState={importAccountForm.publicKeyBase64}
              readonly={true}
            />
          </Form>
        </Modal>
      );
    }
    return (
      <div>
        <DataTable
          title="Accounts"
          refresh={() => this.refresh(true)}
          rows={this.props.auth.accounts}
          headers={['Name', 'Account Hash', 'Balance', '']}
          renderRow={(account: UserAccount) => {
            let accountHash = getAccountHash(account);
            const balance = this.props.auth.balances.get(accountHash);
            return (
              <tr key={account.name}>
                <td>{account.name}</td>
                <td>{accountHash}</td>
                <td>
                  <Balance balance={balance} />
                </td>
                <td className="text-center">
                  <IconButton
                    onClick={() => this.props.auth.deleteAccount(account.name)}
                    title="Delete"
                    icon="trash-alt"
                  />
                </td>
              </tr>
            );
          }}
        />
        {modalAccountForm}
        <ListInline>
          <span
            className="d-inline-block"
            tabIndex={0}
            data-toggle="tooltip"
            title="Click this to create Ed25519 Key Pair. Be sure to save the Public and Private Key files on local disk."
          >
            <Button
              title="Create Account Key"
              onClick={() => this.props.auth.configureNewAccount()}
            />
          </span>
          <Button
            onClick={() => this.props.auth.configureImportAccount()}
            title="Import Account Key"
          />
        </ListInline>
      </div>
    );
  }
}

// Need an observer component to subscribe just to this account balance.
const Balance = observer(
  (props: { balance: ObservableValue<AccountBalance> }) => {
    const value = props.balance.value;
    if (value == null) return null;

    const balance =
      value.balance === undefined ? 'n/a' : CSPR({ motes: value.balance });
    return (
      <div
        className="text-right"
        title={`As of block ${value.blockHashBase16}`}
      >
        {balance}
      </div>
    );
  }
);

import React from 'react';
import { observer } from 'mobx-react';
import { Form, SelectField, TextField } from './Forms';
import AuthContainer, { getAccountHash } from '../containers/AuthContainer';
import { FaucetContainer, FaucetRequest } from '../containers/FaucetContainer';
import { RefreshableComponent, Button, Icon, Card, FailIcon } from './Utils';
import DataTable from './DataTable';

interface Props {
  auth: AuthContainer;
  faucet: FaucetContainer;
}

@observer
class Faucet extends RefreshableComponent<Props, {}> {
  refresh() {
    this.props.auth.refreshAccounts();
    this.props.faucet.refreshFaucetRequestStatus();
  }

  render() {
    const { auth, faucet } = this.props;
    return (
      <div>
        <FaucetForm auth={auth} requestTokens={x => faucet.requestTokens(x)} />
        <StatusTable
          requests={faucet.faucetRequests}
          onRefresh={() => faucet.refreshFaucetRequestStatus()}
        />
      </div>
    );
  }
}

const FaucetForm = observer(
  (props: {
    auth: AuthContainer;
    requestTokens: (account: UserAccount) => void;
  }) => {
    const { auth, requestTokens } = props;

    return (
      <Card
        title="Faucet"
        footerMessage="Select an account and request tokens for it from the Faucet.
        Currently, a given account can only request tokens once. It can take
        some time for your request to be processed; the status of your request
        will be updated when tokens are available and you can use your
        account."
      >
        <Form>
          <SelectField
            id="id-account-name"
            label="Account"
            placeholder="Select account"
            value={(auth.selectedAccount && auth.selectedAccount.name) || null}
            options={(auth.accounts || []).map(x => ({
              label: x.name,
              value: x.name
            }))}
            onChange={x => auth.selectAccountByName(x)}
          />
          <TextField
            id="id-account-hash"
            label="Account Hash"
            fieldState={
              (auth.selectedAccount && getAccountHash(auth.selectedAccount)) ||
              ''
            }
            readonly={true}
          />
        </Form>
        <Button
          title="Request tokens"
          disabled={auth.selectedAccount == null}
          onClick={() => requestTokens(auth.selectedAccount!)}
        />
      </Card>
    );
  }
);

const StatusTable = observer(
  (props: {
    requests: FaucetRequest[];
    onRefresh: () => void;
    lastRefresh?: Date;
  }) => (
    <DataTable
      title="Recent Faucet Requests"
      refresh={() => props.onRefresh()}
      rows={props.requests}
      headers={['Timestamp', 'Account', 'Deploy Hash', 'Status']}
      renderRow={(request: FaucetRequest, idx) => {
        return (
          <tr key={idx}>
            <td>{request.timestamp.toLocaleString()}</td>
            <td>{request.account.name}</td>
            <td>{request.deployHashBase16}</td>
            <StatusCell request={request} />
          </tr>
        );
      }}
      footerMessage={<span>Wait until the deploy is included in a block.</span>}
    />
  )
);

const StatusCell = observer((props: { request: FaucetRequest }) => {
  const info = props.request.deployInfo;
  const iconAndMessage: () => [any, string | undefined] = () => {
    if (info) {
      const attempts = info.execution_results;
      const success = attempts.find(x => x.result.error_message === null);
      const failure = attempts.find(x => x.result.error_message !== null);
      if (success)
        return [
          <Icon name="check-circle" color="green" />,
          `Successfully included in block ${success.block_hash}`
        ];
      if (failure) {
        const errm = failure.result.error_message;
        const hint =
          errm === 'Exit code: 1'
            ? '. It looks like you already funded this account!'
            : errm === 'Exit code: 2'
            ? '. It looks like the faucet ran out of funds!'
            : '';
        return [
          <FailIcon />,
          `Failed in block ${failure.block_hash}: ${errm + hint}`
        ];
      }
    }
    return [<Icon name="clock" />, 'Pending...'];
  };
  const [icon, message] = iconAndMessage();
  return (
    <td className="text-center" title={message}>
      {icon}
    </td>
  );
});

export default Faucet;

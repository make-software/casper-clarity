import React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { DeployContainer } from '../containers/DeployContainer';
import DataTable from './DataTable';
import Pages from './Pages';
import {
  RefreshableComponent,
  shortHash,
  FailIcon,
  SuccessIcon,
  CSPR
} from './Utils';
import ObservableValueMap from '../lib/ObservableValueMap';
import { Balance } from './BlockDetails';
import { JsonDeploy, JsonExecutionResult } from 'casperlabs-sdk';

// URL parameter
type Params = {
  deployHashBase16: string;
};

interface Props extends RouteComponentProps<Params> {
  deploy: DeployContainer;
}

@observer
class _DeployDetails extends RefreshableComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.props.deploy.init(this.deployHashBase16);
  }

  get deployHashBase16() {
    return this.props.match.params.deployHashBase16;
  }

  get container() {
    return this.props.deploy;
  }

  async refresh() {
    await this.container.loadDeploy();
    await this.container.loadBalances();
  }

  componentDidUpdate() {
    // Container and component stays the same during naviagation.
    if (this.deployHashBase16 !== this.container.deployHashBase16) {
      this.container.init(this.deployHashBase16);
      this.refresh();
    }
  }

  render() {
    return (
      <div>
        <DeployTable
          deployHashBase16={this.deployHashBase16}
          deploy={this.container.deploy}
        />
        <ResultsTable
          deployHashBase16={this.deployHashBase16}
          jsonExecutionResult={this.container.jsonExecutionResults!}
          deploy={this.container.deploy}
          balances={this.container.balances}
          refresh={() => this.refresh()}
        />
      </div>
    );
  }
}

// Inject the router parameters so we can extract the ID from the URL.
export const DeployDetails = withRouter(_DeployDetails);

const DeployTable = observer(
  (props: { deployHashBase16: string; deploy: JsonDeploy | null }) => {
    const attrs = props.deploy && deployAttrs(props.deploy);
    return (
      <DataTable
        title={`Deploy ${props.deployHashBase16}`}
        headers={[]}
        rows={attrs}
        renderRow={(attr, i) => (
          <tr key={i}>
            <th>{attr[0]}</th>
            <td>{attr[1]}</td>
          </tr>
        )}
      />
    );
  }
);

const ResultsTable = observer(
  (props: {
    deployHashBase16: string;
    deploy: JsonDeploy | null;
    jsonExecutionResult: JsonExecutionResult[];
    balances: ObservableValueMap<string, number>;
    refresh: () => void;
  }) => {
    return (
      <DataTable
        title={`Results for deploy ${props.deployHashBase16}`}
        headers={[
          'Block Hash',
          'Finality',
          'Cost',
          'Remaining Balance',
          'Result',
          'Message'
        ]}
        rows={props.jsonExecutionResult}
        renderRow={(proc, i) => {
          const id = proc.block_hash;
          return (
            <tr key={i}>
              <td>
                <Link to={Pages.block(id)}>{shortHash(id)}</Link>
              </td>
              {/*fixme <td> <FinalityIcon block={proc} /> </td>*/}
              <td>
                <SuccessIcon />
              </td>
              <td className="text-right">
                <CSPR motes={proc.result.cost} />
              </td>
              <td className="text-right">
                <Balance balance={props.balances.get(id)} />
              </td>
              <td className="text-center">
                {proc.result.error_message ? <FailIcon /> : <SuccessIcon />}
              </td>
              <td>{proc.result.error_message}</td>
            </tr>
          );
        }}
        refresh={() => props.refresh()}
      />
    );
  }
);

const deployAttrs: (deploy: JsonDeploy) => Array<[string, any]> = (
  deploy: JsonDeploy
) => {
  const id = deploy.hash;
  const header = deploy.header;
  return [
    ['Deploy Hash', id],
    ['Account Hash', header.account],
    ['Timestamp', new Date(header.timestamp).toISOString()],
    ['Gas Price', <CSPR motes={header.gas_price} />]
  ];
};

export default DeployDetails;

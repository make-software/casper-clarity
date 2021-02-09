import React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { BlockContainer } from '../containers/BlockContainer';
import DataTable from './DataTable';
import Pages from './Pages';
import { RefreshableComponent, SuccessIcon, FailIcon, CSPR } from './Utils';
import { shortHash } from './Utils';
import ObservableValueMap, { ObservableValue } from '../lib/ObservableValueMap';
import { BlockResult, DeployResult, JsonBlock } from 'casper-client-sdk';
import { BigNumber } from '@ethersproject/bignumber';

// https://www.pluralsight.com/guides/react-router-typescript

// URL parameter
type Params = {
  blockHashBase16: string;
};

interface Props extends RouteComponentProps<Params> {
  block: BlockContainer;
}

@observer
class _BlockDetails extends RefreshableComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.props.block.init(this.blockHashBase16);
  }

  get blockHashBase16() {
    return this.props.match.params.blockHashBase16;
  }

  get container() {
    return this.props.block;
  }

  async refresh() {
    await this.container.loadBlock();
    await this.container.loadDeploys();
    await this.container.loadBalances();
  }

  componentDidUpdate() {
    // Container and component stays the same during navigation.
    if (this.blockHashBase16 !== this.container.blockHashBase16) {
      this.container.init(this.blockHashBase16);
      this.refresh();
    }
  }

  render() {
    return (
      <div>
        <BlockTable
          blockHashBase16={this.blockHashBase16}
          block={this.container.block}
          refresh={() => this.container.loadBlock()}
        />
        <DeploysTable
          blockHashBase16={this.blockHashBase16}
          deploys={this.container.deploys}
          balances={this.container.balances}
        />
      </div>
    );
  }
}

// Inject the router parameters so we can extract the ID from the URL.
export const BlockDetails = withRouter(_BlockDetails);

const BlockTable = observer(
  (props: {
    blockHashBase16: string;
    block: BlockResult | null;
    refresh: () => void;
  }) => {
    const attrs = props.block && blockAttrs(props.block);
    return (
      <DataTable
        title={`Block ${props.blockHashBase16}`}
        headers={[]}
        rows={attrs}
        renderRow={(attr, i) => (
          <tr key={i}>
            <th>{attr[0]}</th>
            <td>{attr[1]}</td>
          </tr>
        )}
        refresh={() => props.refresh()}
      />
    );
  }
);

const DeploysTable = observer(
  (props: {
    blockHashBase16: string;
    deploys: DeployResult[] | null;
    balances: ObservableValueMap<string, number>;
  }) => {
    return (
      <DataTable
        title={`Deploys in block ${props.blockHashBase16}`}
        headers={[
          'Deploy Hash',
          'Account',
          'Gas Price',
          'State',
          'Status',
          'Error Message'
        ]}
        rows={props.deploys}
        renderRow={(deploy: DeployResult, i) => {
          const id = deploy.deployHash;
          const accountId = deploy.account;
          return (
            <tr key={i}>
              <td>
                <Link to={Pages.deploy(id)}>{shortHash(id)}</Link>
              </td>
              <td>{shortHash(accountId)}</td>
              <td className="text-right">
                <CSPR motes={BigNumber.from(deploy.cost)} />
              </td>
              <td className="text-right">
                <span>{deploy.state}</span>
              </td>
              <td className="text-center">
                {deploy.errorMessage ? <FailIcon /> : <SuccessIcon />}
              </td>
              <td>{deploy.errorMessage}</td>
            </tr>
          );
        }}
      />
    );
  }
);

const blockAttrs: (block: BlockResult) => Array<[string, any]> = (
  block: BlockResult
) => {
  const parent = block.parentHash;
  return [
    ['Height', block.height],
    ['Era ID', block.eraId],
    ['Block Hash', block.blockHash],
    ['Parent Hash', <Link to={parent}>{parent}</Link>],
    ['Timestamp', block.timestamp],
    ['State root hash', block.state],
    ['Proposer', block.proposer]
  ];
};

export const BlockLink = (props: { blockHashBase16: string }) => {
  return (
    <Link to={Pages.block(props.blockHashBase16)}>{props.blockHashBase16}</Link>
  );
};

// Need to observe the balance to react to when it's available.
export const Balance = observer(
  (props: { balance: ObservableValue<number> }) => {
    const value = props.balance.value;
    if (value == null) return null;
    return <CSPR motes={BigNumber.from(value)} />;
  }
);

export const BlockType = (props: { block: JsonBlock }) => {
  // let typ = props.header.getMessageType();
  //
  // let lbl =
  //   typ === Block.MessageType.BLOCK
  //     ? 'Block'
  // : typ === Block.MessageType.BALLOT
  // ? 'Ballot'
  // : 'n/a';
  let lbl = 'Block';
  return <span>{lbl}</span>;
};
// fixme
export const FinalityIcon = (props: { block: JsonBlock }) => {
  return <SuccessIcon />;
  // if (
  //   props.block.getSummary()?.getHeader()!.getMessageType() ===
  //   Block.MessageType.BALLOT
  // )
  //   return null;
  //
  // let finality = props.block.getStatus()!.getFinality();
  // if (finality === BlockInfo.Status.Finality.FINALIZED) {
  //   return <SuccessIcon />;
  // } else if (finality === BlockInfo.Status.Finality.ORPHANED)
  //   return <FailIcon />;
  // else {
  //   return <Icon name="clock" />;
  // }
};

export default BlockDetails;

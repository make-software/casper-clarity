import React from 'react';
import { observer } from 'mobx-react';
import DagContainer, { DagStep } from '../containers/DagContainer';
import { IconButton, ListInline, shortHash } from './Utils';
import DataTable from './DataTable';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Pages from './Pages';
import Timestamp from './TimeStamp';
import { BlockType } from './BlockDetails';
import * as H from 'history';
import { JsonBlock } from 'casperlabs-sdk';

export interface Props extends RouteComponentProps<{}> {
  dag: DagContainer;
  page: string | null;
  limit: string | null;
}

@observer
class _BlockList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.props.dag.refreshWithDepthAndMaxRank(props.page, props.limit);
  }

  async refresh() {
    await this.props.dag.refreshBlockDagAndSetupSubscriber();
  }

  componentWillUnmount() {
    // release websocket if necessary
    this.props.dag.toggleableSubscriber.unsubscribeAndFree();
  }

  // when receive new props of depth and maxRank, we need parse them and set related state variables.
  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.page === nextProps.page &&
      this.props.limit === nextProps.limit
    ) {
      return;
    }
    this.props.dag.refreshWithDepthAndMaxRank(nextProps.page, nextProps.limit);
  }

  render() {
    const { dag } = this.props;
    return (
      <DataTable
        title={
          dag.maxRank === 0
            ? 'Latest Blocks'
            : `Blocks from rank ${dag.minRank} to ${dag.maxRank}`
        }
        refresh={() => this.refresh()}
        subscribeToggleStore={dag.toggleableSubscriber.subscribeToggleStore}
        filterToggleStore={dag.hideBallotsToggleStore}
        filterTtl="Only show blocks"
        filterLbl="Hide Ballots"
        headers={['Block Hash', 'height', 'Timestamp', 'Validator', 'Type']}
        rows={dag.blocks}
        renderRow={(block: JsonBlock) => {
          const header = block.header;
          const id = block.hash;
          return (
            <tr key={id}>
              <td>
                <Link to={Pages.block(id)}>{id}</Link>
              </td>
              <td>{header.height}</td>
              <td>
                <Timestamp timestamp={header.timestamp} />
              </td>
              <td>{shortHash(header.proposer)}</td>
              <td>
                <BlockType block={block} />
              </td>
              {/*fixme*/}
              {/*<td>*/}
              {/*  <Link*/}
              {/*    to={Pages.block(encodeBase16(header.getKeyBlockHash_asU8()))}*/}
              {/*  >*/}
              {/*    {shortHash(header.getKeyBlockHash_asU8())}*/}
              {/*  </Link>*/}
              {/*</td>*/}
            </tr>
          );
        }}
        filterRow={(block: JsonBlock) => {
          // fixme
          // let msgType = block.getSummary()?.getHeader()?.getMessageType();
          // return msgType === Block.MessageType.BLOCK;
          return true;
        }}
        footerMessage={
          <DagStepButtons
            step={dag.step}
            history={this.props.history}
            urlWithRankAndDepth={Pages.blocksWithMaxRankAndDepth}
          />
        }
      />
    );
  }
}

const BlockList = withRouter(_BlockList);
export default BlockList;

export const DagStepButtons = (props: {
  step: DagStep;
  history: H.History;
  urlWithRankAndDepth: (maxRank: number, depth: number) => string;
}) => {
  const updateUrlQuery = (stepFunc: () => void) => {
    stepFunc();
    props.history.push(
      props.urlWithRankAndDepth(props.step.maxRank, props.step.depth)
    );
  };
  return (
    <ListInline>
      <IconButton
        title="First"
        onClick={() => updateUrlQuery(props.step.first)}
        icon="fast-backward"
      />
      <IconButton
        title="Previous"
        onClick={() => updateUrlQuery(props.step.prev)}
        icon="step-backward"
      />
      <IconButton
        title="Next"
        onClick={() => updateUrlQuery(props.step.next)}
        icon="step-forward"
      />
      <IconButton
        title="Last"
        onClick={() => updateUrlQuery(props.step.last)}
        icon="fast-forward"
      />
    </ListInline>
  );
};

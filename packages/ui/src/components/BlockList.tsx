import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ReactPaginate from 'react-paginate';
import DagContainer, { DagStep } from '../containers/DagContainer';
import { IconButton, ListInline, shortHash } from './Utils';
import DataTable from './DataTable';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Pages from './Pages';
import Timestamp from './TimeStamp';
import { BlockType } from './BlockDetails';
import * as H from 'history';
import { BlocksResult, BlockResult } from 'casperlabs-sdk';

export interface Props extends RouteComponentProps<{}> {
  dag: DagContainer;
  page: string | null;
  limit: string | null;
}

@observer
class _BlockList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.props.dag.refreshWithPageNumberAndCount(props.page, props.limit);
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
    this.props.dag.refreshWithPageNumberAndCount(
      nextProps.page,
      nextProps.limit
    );
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
        headers={[
          'Block Hash',
          'parentHeash',
          'Timestamp',
          'eraId',
          'Proposer',
          'State',
          'Height'
        ]}
        rows={dag.eventStoreBlocks?.data}
        renderRow={(block: BlockResult) => {
          const id = block.blockHash;
          return (
            <tr key={id}>
              <td>
                <Link to={Pages.block(id)}>{id}</Link>
              </td>
              <td>{block.parentHash}</td>
              <td>{block.timestamp}</td>
              <td>{block.eraId}</td>
              <td>{block.proposer}</td>
              <td>{block.state}</td>
              <td>{block.height}</td>
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
        filterRow={(block: BlockResult) => {
          // fixme
          // let msgType = block.getSummary()?.getHeader()?.getMessageType();
          // return msgType === Block.MessageType.BLOCK;
          return true;
        }}
        footerMessage={
          <div id="react-paginate">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={dag.eventStoreBlocks && dag.eventStoreBlocks.pageCount ? dag.eventStoreBlocks.pageCount : 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={props =>
                this.props.history.push(
                  Pages.blocksWithPageAndLimit(props.selected, dag.step.limit)
                )
              }
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
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

export const DagPageButtons = (props: {
  step: DagStep;
  history: H.History;
  urlWithPageNumberAndCount: (page: number, limit: number) => string;
  pageCount: number | undefined;
}) => {
  const itemRendered = [];
  if (props.pageCount && props.pageCount > 0)
    for (let i = 1; i <= props.pageCount; i++) {
      itemRendered.push(
        <button
          onClick={() =>
            props.history.push(
              props.urlWithPageNumberAndCount(i, props.step.limit)
            )
          }
          title={i.toString()}
          className="link icon-button"
        >
          {i}
        </button>
      );
    }
  return <ListInline>{itemRendered}</ListInline>;
};

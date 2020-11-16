import React from 'react';
import { observer } from 'mobx-react';
import { LinkButton, ListInline, shortHash } from './Utils';
import { BlockDAG } from './BlockDAG';
import DataTable from './DataTable';
import { DagStepButtons, Props } from './BlockList';
import { Link, withRouter } from 'react-router-dom';
import Pages from './Pages';
import { BondedValidatorsTable } from './BondedValidatorsTable';
import { ToggleButton } from './ToggleButton';
import { FinalityIcon } from './BlockDetails';
import { JsonBlock } from 'casper-client-sdk';

/** Show the tips of the DAG. */
@observer
class _Explorer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.props.dag.refreshWithDepthAndMaxRank(props.page, props.limit);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      this.props.page === nextProps.page &&
      this.props.limit === nextProps.limit
    ) {
      return;
    }
    this.props.dag.refreshWithDepthAndMaxRank(nextProps.page, nextProps.limit);
  }

  async refresh() {
    await this.props.dag.refreshBlockDagAndSetupSubscriber();
  }

  componentWillUnmount() {
    // release websocket if necessary
    this.props.dag.toggleableSubscriber.unsubscribeAndFree();
  }

  render() {
    const { dag } = this.props;
    return (
      <div>
        <div className="row">
          <div className={`col-sm-12 col-lg-${dag.selectedBlock ? 8 : 12}`}>
            <BlockDAG
              title={
                dag.isLatestDag
                  ? 'Latest Block DAG'
                  : `Block DAG from rank ${dag.minRank} to ${dag.maxRank}`
              }
              blocks={dag.blocks}
              refresh={() => this.refresh()}
              subscribeToggleStore={
                dag.toggleableSubscriber.subscribeToggleStore
              }
              hideBallotsToggleStore={dag.hideBallotsToggleStore}
              hideBlockHashToggleStore={dag.hideBlockHashToggleStore}
              footerMessage={
                <ListInline>
                  <DagStepButtons
                    step={dag.step}
                    history={this.props.history}
                    urlWithRankAndDepth={Pages.explorerWithMaxRankAndDepth}
                  />
                  {dag.hasBlocks && (
                    <span>
                      Select a block to see its details. Press Ctrl before
                      zooming to enable horizontal only zoom mode.
                    </span>
                  )}
                  {dag.selectedBlock && (
                    <ToggleButton
                      title={'Show bonded validators'}
                      toggleStore={dag.validatorsListToggleStore}
                      size="sm"
                    />
                  )}
                </ListInline>
              }
              onSelected={block => {
                let current = dag.selectedBlock;
                if (current && current.hash === block.hash) {
                  dag.selectedBlock = null;
                } else {
                  dag.selectedBlock = block;
                }
              }}
              selected={dag.selectedBlock ? dag.selectedBlock : undefined}
              depth={dag.depth}
              onDepthChange={d => {
                dag.depth = d;
                this.props.history.push(
                  Pages.explorerWithMaxRankAndDepth(dag.maxRank, dag.depth)
                );
              }}
              width="100%"
              height="600"
            />
          </div>
          {dag.selectedBlock && dag.blocks != null && (
            <div className="col-sm-12 col-lg-4">
              <BlockDetails
                block={dag.selectedBlock}
                blocks={dag.blocks}
                onSelect={blockHashBase16 => {
                  dag.selectByBlockHashBase16(blockHashBase16);
                }}
              />
            </div>
          )}
          {dag.selectedBlock && dag.validatorsListToggleStore.isPressed && (
            <div className="col-sm-12">
              <BondedValidatorsTable
                block={dag.selectedBlock}
                lastFinalizedBlock={dag.lastFinalizedBlock}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const Explorer = withRouter(_Explorer);
export default Explorer;

class BlockDetails extends React.Component<
  {
    block: JsonBlock;
    blocks: JsonBlock[];
    onSelect: (blockHash: string) => void;
  },
  {}
> {
  ref: HTMLElement | null = null;

  render() {
    let { block } = this.props;
    let header = block.header;
    let id = block.hash;
    let validatorId = header.proposer;
    let attrs: Array<[string, any]> = [
      ['Block Hash', <Link to={Pages.block(id)}>{shortHash(id)}</Link>],
      // fixme
      // [
      //   'Key Block Hash',
      //   <Link to={Pages.block(encodeBase16(header.getKeyBlockHash_asU8()))}>
      //     {shortHash(header.)}
      //   </Link>
      // ],
      ['height', header.height],
      ['Era ID', header.era_id],
      // fixme
      // ['Type', <BlockType header={header} />],
      // ['Role', <BlockRole header={header} />],
      ['Timestamp', new Date(header.timestamp).toISOString()],
      ['Deploy Count', header.deploy_hashes.length],
      ['Validator', shortHash(validatorId)],
      // fixme
      // ['Validator Block Number', header.getValidatorBlockSeqNum()],
      // [
      //   'Validator Stake',
      //   (() => {
      //     let validatorBond = header
      //       .getState()!
      //       .getBondsList()
      //       .find(
      //         x =>
      //           encodeBase16(x.getValidatorPublicKeyHash_asU8()) === validatorId
      //       );
      //     Genesis doesn't have a validator.
      // return (
      //   (validatorBond &&
      //     validatorBond.getStake() &&
      //     Number(validatorBond.getStake()!.getValue()).toLocaleString()) ||
      //   null
      // );
      // })()
      // ],
      ['Finality', <FinalityIcon block={block} />],
      [
        'Parents',
        <ul>
          {
            <li key={0}>
              <BlockLink
                id={block.header.parent_hash}
                onClick={this.props.onSelect}
              />
            </li>
          }
        </ul>
      ],
      [
        'Children',
        <ul>
          {this.props.blocks
            .filter(b => b.header.parent_hash === id)
            .map((b, idx) => (
              <li key={idx}>
                <BlockLink id={b.hash} onClick={this.props.onSelect} />
              </li>
            ))}
        </ul>
      ]
    ];
    return (
      <div
        ref={x => {
          this.ref = x;
        }}
      >
        <DataTable
          title={`Block ${shortHash(id)}`}
          headers={[]}
          rows={attrs}
          renderRow={(attr, i) => (
            <tr key={i}>
              <th>{attr[0]}</th>
              <td>{attr[1]}</td>
            </tr>
          )}
          footerMessage="Click the links to select the parents and children."
        />
      </div>
    );
  }
}

const BlockLink = (props: {
  id: string;
  onClick: (blockHashBase16: string) => void;
}) => {
  return (
    <LinkButton
      title={shortHash(props.id)}
      onClick={() => props.onClick(props.id)}
    />
  );
};

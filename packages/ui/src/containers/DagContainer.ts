import { action, IObservableArray, observable, reaction } from 'mobx';

import ErrorContainer from './ErrorContainer';
import { ToggleStore } from '../components/ToggleButton';
import { ToggleableSubscriber } from './ToggleableSubscriber';
import {
  CasperServiceByJsonRPC,
  EventService,
  JsonBlock,
  BlocksResult
} from 'casper-client-sdk';

const DEFAULT_DEPTH = 100;

export class DagStep {
  constructor(private container: DagContainer) {}

  private step = (f: () => number) => () => {
    this.maxRank = f();
    this.container.selectedBlock = null;
  };

  get maxRank() {
    return this.container.maxRank;
  }

  get depth() {
    return this.container.depth;
  }

  get page() {
    return this.container.page;
  }

  get limit() {
    return this.container.count;
  }

  set maxRank(rank: number) {
    this.container.maxRank = rank;
  }

  set page(_page: number) {
    this.container.page = _page;
  }

  set limit(_limit: number) {
    this.container.count = _limit;
  }

  private get currentMaxRank() {
    let blockRank =
      this.container.hasBlocks && this.container.blocks![0].header.height;
    return this.maxRank === 0 && blockRank ? blockRank : this.maxRank;
  }

  first = this.step(() => this.depth - 1);

  prev = this.step(() =>
    this.maxRank === 0 && this.currentMaxRank <= this.depth
      ? 0
      : this.currentMaxRank > this.depth
      ? this.currentMaxRank - this.depth
      : this.currentMaxRank
  );

  next = this.step(() => this.currentMaxRank + this.depth);

  last = this.step(() => 0);
}

export class DagContainer {
  @observable blocks: IObservableArray<JsonBlock> | null = null;
  @observable eventStoreBlocks: BlocksResult | null = null;
  @observable selectedBlock: JsonBlock | null = null;
  @observable depth = 10;
  @observable maxRank = 0;
  @observable page: number = 0;
  @observable count: number = 10;
  @observable validatorsListToggleStore: ToggleStore = new ToggleStore(false);
  @observable lastFinalizedBlock: JsonBlock | undefined = undefined;
  @observable hideBallotsToggleStore: ToggleStore = new ToggleStore(false);
  @observable hideBlockHashToggleStore: ToggleStore = new ToggleStore(false);
  toggleableSubscriber: ToggleableSubscriber;

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC,
    private eventService: EventService
  ) {
    this.toggleableSubscriber = new ToggleableSubscriber(
      this.casperService,
      e => this.subscriberHandler(e),
      () => this.isLatestDag,
      () => this.refreshBlockDag()
    );

    // react to the change of maxRank, depth, page and count, so that outer components only need to set DAG's props
    // DAG manage the refresh by itself.
    reaction(
      () => {
        return [this.maxRank, this.depth, this.page, this.count];
      },
      () => {
        this.refreshBlockDagAndSetupSubscriber();
      }
    );
  }

  refreshWithDepthAndMaxRank(
    maxRankStr: string | null,
    depthStr: string | null
  ) {
    let maxRank = parseInt(maxRankStr || '') || 0;
    let depth = parseInt(depthStr || '') || DEFAULT_DEPTH;
    this.updateMaxRankAndDepth(maxRank, depth);
  }

  refreshWithPageNumberAndCount(
    pageStr: string | null,
    countStr: string | null
  ) {
    let page = parseInt(pageStr || '') || 1;
    let count = parseInt(countStr || '') || 10;
    this.updateWithPageNumberAndCount(page, count);
  }

  @action
  updateMaxRankAndDepth(rank: number, depth: number) {
    this.maxRank = rank;
    this.depth = depth;
  }

  @action
  updateWithPageNumberAndCount(page: number, count: number) {
    this.page = page;
    this.count = count;
  }

  get minRank() {
    return Math.max(0, this.maxRank - this.depth + 1);
  }

  get hasBlocks() {
    return this.blocks ? this.blocks.length > 0 : false;
  }

  get isLatestDag() {
    return this.maxRank === 0;
  }

  async selectByBlockHashBase16(blockHashBase16: string) {
    let selectedBlock = this.blocks!.find(x => x.hash === blockHashBase16);
    if (selectedBlock) {
      this.selectedBlock = selectedBlock;
    } else {
      await this.errors.capture(
        this.casperService.getBlockInfo(blockHashBase16).then(block => {
          this.selectedBlock = block.block;
          let contained = this.blocks!.find(x => x.hash === blockHashBase16);
          if (!contained) {
            this.blocks!.push(block.block!);
          }
        })
      );
    }
  }

  step = new DagStep(this);

  // fixme
  @action.bound
  private subscriberHandler(event: Event) {}

  async refreshBlockDagAndSetupSubscriber() {
    await this.refreshBlockDag();
    this.toggleableSubscriber.setUpSubscriber();
  }

  private async refreshBlockDag() {
    await this.errors.capture(
      this.eventService
        .getBlocks(this.page, this.count)
        .then((blocks: BlocksResult): any => {
          this.eventStoreBlocks = blocks;
        })
    );
  }
}

export default DagContainer;

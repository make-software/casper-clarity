import ErrorContainer from './ErrorContainer';
import { CasperServiceByJsonRPC, JsonBlock } from 'casper-client-sdk';
import { action, computed, observable } from 'mobx';
import { ToggleableSubscriber } from './ToggleableSubscriber';

// Last N ranks to construct latest messages of validators
type ValidatorIdBase64 = string;

export interface ValidatorInfo {
  id: ValidatorIdBase64;
  latestBlockHash: string;
  height: number;
  timestamp: number;
}

export class ValidatorsContainer {
  @observable latestFinalizedBlock: JsonBlock | null = null;
  // collect ValidatorInfo for each bonded validator
  @observable validatorInfoMaps: Map<
    ValidatorIdBase64,
    ValidatorInfo
  > = new Map();
  toggleableSubscriber: ToggleableSubscriber;

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC
  ) {
    this.toggleableSubscriber = new ToggleableSubscriber(
      this.casperService,
      e => {
        this.subscriberHandler(e);
      },
      () => true,
      () => this.refresh()
    );
  }

  @action.bound
  async refresh() {
    // fixme
    // this.latestFinalizedBlock = await this.casperService.getLastFinalizedBlockInfo();
    this.getValidatorInfos();
  }

  @computed
  get validatorInfos() {
    return Array.from(this.validatorInfoMaps.values()).filter(info =>
      this.bondedValidators.has(info.id)
    );
  }

  /*
   * return validators bonded in the LFB
   */
  @computed
  get bondedValidators() {
    if (!this.latestFinalizedBlock) {
      return new Set<ValidatorIdBase64>();
    } else {
      // fixme, provide bonded validators information
      return new Set();
    }
  }

  // insert or update accMap when giving a list of blockInfo
  @action.bound
  private async upsert(blockInfos: JsonBlock[]) {
    blockInfos.forEach(b => {
      const header = b.header;
      let validatorId = header.proposer;
      let item = this.validatorInfoMaps.get(validatorId);
      if (!item || item.height < header.height) {
        this.validatorInfoMaps.set(validatorId, {
          id: validatorId,
          latestBlockHash: b.hash,
          height: header.height,
          timestamp: header.timestamp
        });
      }
    });
  }

  @action.bound
  private async getValidatorInfos() {
    // fixme
    // let latestRankNMsgs = await this.casperService.getBlockInfos(
    //   computeN(this.bondedValidators.size),
    //   0
    // );
    let latestRankNMsgs: JsonBlock[] = [];

    this.upsert(latestRankNMsgs);

    await this.getValidationInfoByJustifications();
  }

  /**
   * for every validator that still doesn't have any info, use the justifications in the LFB,
   * get the block info for those (there will be multiple, in current setting 3,
   * one for each era up to the key block), use the latest by rank
   */
  private async getValidationInfoByJustifications() {
    // fixme
    this.upsert([]);
  }

  private subscriberHandler(e: Event) {
    // fixme
    // if (e.hasBlockAdded()) {
    //   let block = e.getBlockAdded()?.getBlock();
    //   if (block) {
    //     this.upsert([block]);
    //   }
    // } else if (e.hasNewFinalizedBlock()) {
    //   this.errors.capture(
    //     this.casperService
    //       .getBlockInfo(e.getNewFinalizedBlock()!.getBlockHash())
    //       .then(LFB => {
    //         this.latestFinalizedBlock = LFB;
    //         let bondedValidators = this.bondedValidators;
    //         let forceRequestByJustification = false;
    //         bondedValidators.forEach(vId => {
    //           if (!this.validatorInfoMaps.has(vId)) {
    //             forceRequestByJustification = true;
    //           }
    //         });
    //         if (forceRequestByJustification) {
    //           this.getValidationInfoByJustifications();
    //         }
    //       })
    //   );
    // }
  }
}

export default ValidatorsContainer;

import { action, observable, reaction } from 'mobx';
import { ToggleStore } from '../components/ToggleButton';
import { Subscription } from 'rxjs';
import { Event } from 'casperlabs-grpc/io/casperlabs/casper/consensus/info_pb';
import { CasperServiceByJsonRPC } from 'casper-client-sdk';

enum SubscribeState {
  UN_INIT,
  ON,
  OFF
}

export class ToggleableSubscriber {
  @observable subscribeToggleStore: ToggleStore = new ToggleStore(true);
  @observable eventsSubscriber: Subscription | null = null;

  /**
   * Construct a toggleable subscriber which will subscribe to CasperService.subscribeEvents.
   * @param casperService
   * @param eventHandler: a handler function for each received event
   * @param additionalEnable: subscriber will only enable when both additionalEnable and subscribeToggleStore are true
   * @param forceRefresh: a force refresh when toggle button switch from OFF to ON, so that it is deal with the latest state
   */
  constructor(
    private casperService: CasperServiceByJsonRPC,
    private eventHandler: (event: Event) => void,
    private additionalEnable: () => boolean,
    private forceRefresh: () => void
  ) {
    // so that change of subscribeToggleStore can trigger `setUpSubscriber`
    reaction(
      () => this.subscribeToggleStore.isPressed && this.additionalEnable(),
      () => {
        this.setUpSubscriber();
      },
      {
        fireImmediately: false,
        delay: 100
      }
    );
  }

  unsubscribe() {
    if (this.subscriberState === SubscribeState.ON) {
      this.eventsSubscriber!.unsubscribe();
    }
  }

  unsubscribeAndFree() {
    if (this.subscriberState === SubscribeState.ON) {
      this.eventsSubscriber!.unsubscribe();
      // free eventsSubscriber before unmount component
      // so that when user re-visit the page from other page,
      // it won't call this.forceRefresh
      this.eventsSubscriber = null;
    }
  }

  private get subscriberState(): SubscribeState {
    if (!this.eventsSubscriber) {
      return SubscribeState.UN_INIT;
    } else if (!this.eventsSubscriber.closed) {
      return SubscribeState.ON;
    } else {
      return SubscribeState.OFF;
    }
  }

  @action
  setUpSubscriber() {
    let subscribeToggleEnabled =
      this.subscribeToggleStore.isPressed && this.additionalEnable();
    if (subscribeToggleEnabled) {
      // enable subscriber
      const subscriberState = this.subscriberState;
      if (subscriberState === SubscribeState.ON) {
        // when clicking refresh button, we can reused the web socket.
        return;
      } else {
        if (subscriberState === SubscribeState.OFF) {
          // Refresh when switching from OFF to ON
          this.forceRefresh();
        }

        // fixme
        // let obs = this.casperService.subscribeEvents(this.subscribeTopics);

        // this.eventsSubscriber = obs.subscribe({
        //   next: e => {
        //     this.eventHandler(e);
        //   }
        // });
      }
    } else {
      // disable subscriber
      this.unsubscribe();
    }
  }
}

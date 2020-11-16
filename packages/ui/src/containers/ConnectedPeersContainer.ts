import ErrorContainer from './ErrorContainer';
import { observable } from 'mobx';
import { CasperServiceByJsonRPC } from 'casper-client-sdk';

export class ConnectedPeersContainer {
  @observable peers: Array<{ nodeId: string; address: string }> | null = null;

  constructor(
    private errors: ErrorContainer,
    private casperService: CasperServiceByJsonRPC
  ) {}

  async refreshPeers() {
    let peers = await this.casperService.getPeers();
    this.peers = Object.keys(peers.peers).map(nodeId => {
      return {
        nodeId: nodeId,
        address: peers.peers[nodeId]
      };
    });
  }
}

export default ConnectedPeersContainer;

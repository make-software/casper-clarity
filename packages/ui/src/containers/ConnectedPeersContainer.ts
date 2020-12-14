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
    this.peers = peers.peers.map(peer => {
      return {
        nodeId: peer.node_id,
        address: peer.address
      };
    });
  }
}

export default ConnectedPeersContainer;

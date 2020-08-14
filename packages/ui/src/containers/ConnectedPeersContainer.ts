import ErrorContainer from './ErrorContainer';
import { DiagnosticsService } from 'casperlabs-sdk';
import { observable } from 'mobx';
import { Node } from 'casperlabs-grpc/io/casperlabs/comm/discovery/node_pb';

export class ConnectedPeersContainer {
  @observable peers: Array<Node> | null = null;

  constructor(
    private errors: ErrorContainer,
    private diagnosticsService: DiagnosticsService
  ) {}

  async refreshPeers() {
    let peers = await this.diagnosticsService.listPeers();
    this.peers = peers.getPeersList();
  }
}

export default ConnectedPeersContainer;

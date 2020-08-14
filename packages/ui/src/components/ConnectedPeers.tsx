import React from 'react';
import { observer } from 'mobx-react';
import { RefreshableComponent } from './Utils';
import DataTable from './DataTable';
import ConnectedPeersContainer from '../containers/ConnectedPeersContainer';
import { Node } from 'casperlabs-grpc/io/casperlabs/comm/discovery/node_pb';

interface Props {
  connectedPeersContainer: ConnectedPeersContainer;
}

@observer
export default class ConnectedPeers extends RefreshableComponent<Props, {}> {
  async refresh() {
    await this.props.connectedPeersContainer.refreshPeers();
  }

  render() {
    const { connectedPeersContainer } = this.props;
    return (
      <DataTable
        title="Connected Peers"
        refresh={() => this.refresh()}
        headers={['Host', 'Protocol Port', 'Chain Id', 'Version']}
        rows={connectedPeersContainer.peers}
        renderRow={(node: Node) => {
          return (
            <tr key={node.getId_asB64()}>
              <td>{node.getHost()}</td>
              <td>{node.getProtocolPort()} </td>
              <td>{node.getChainId_asB64()}</td>
              <td>{node.getNodeVersion()}</td>
            </tr>
          );
        }}
      />
    );
  }
}

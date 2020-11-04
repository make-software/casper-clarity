import React from 'react';
import { observer } from 'mobx-react';
import { RefreshableComponent } from './Utils';
import DataTable from './DataTable';
import ConnectedPeersContainer from '../containers/ConnectedPeersContainer';

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
        headers={['Node ID', 'Address']}
        rows={connectedPeersContainer.peers}
        renderRow={node => {
          return (
            <tr key={node.nodeId}>
              <td>{node.nodeId}</td>
              <td>{node.address} </td>
            </tr>
          );
        }}
      />
    );
  }
}

import React from 'react';
import { observer } from 'mobx-react';

import { Button, RefreshableComponent } from './Utils';
import { Signer } from 'casper-client-sdk';
import AuthContainer from '../containers/AuthContainer';

@observer
class ConnectButton extends RefreshableComponent<{ auth: AuthContainer }, {}> {
  constructor(props: any) {
    super(props);
    this.refreshIntervalMillis = 1000;
  }

  failedToConnect: Boolean = false;

  async refresh() {
    try {
      this.props.auth.connectedToSigner = !!(await Signer?.isConnected());
    } catch (err) {
      if (!this.failedToConnect) {
        console.error(err);
        this.failedToConnect = true;
      }
    }
  }

  renderDisconnected() {
    return (
      <Button
        onClick={() => {
          try {
            Signer.sendConnectionRequest();
          } catch (err) {
            alert(
              'Please install the CasperLabs Signer from the Chrome Store:\nhttps://chrome.google.com/webstore/detail/casperlabs-signer/djhndpllfiibmcdbnmaaahkhchcoijce'
            );
            console.error(err);
          }
        }}
        title={'Connect to Signer'}
        disabled={false}
        type={'primary'}
        size={'sm'}
      />
    );
  }

  renderConnected() {
    return (
      <Button
        onClick={() => {
          alert('Already connected to Signer');
        }}
        title={'Connected to Signer'}
        disabled={true}
        type={'primary'}
        size={'sm'}
      />
    );
  }

  render() {
    return this.props.auth.connectedToSigner
      ? this.renderConnected()
      : this.renderDisconnected();
  }
}

export default ConnectButton;

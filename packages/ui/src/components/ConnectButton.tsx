import React from 'react';
import { observer } from 'mobx-react';

import { Button } from './Utils';
import { Signer } from 'casperlabs-sdk';
import AuthContainer from '../containers/AuthContainer';

@observer
class ConnectButton extends React.Component<{ auth: AuthContainer }, {}> {
  constructor(props: any) {
    super(props);
  }

  renderDisconnected() {
    return (
      <Button
        onClick={() => {
          Signer.sendConnectionRequest();
        }}
        title={'Not Connected'}
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
        title={'Connected'}
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

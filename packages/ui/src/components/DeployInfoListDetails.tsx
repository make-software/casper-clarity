import React from 'react';
import { observer } from 'mobx-react';
import { RefreshableComponent } from './Utils';
import DataTable from './DataTable';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DeployInfoListContainer } from '../containers/DeployInfoListContainer';
import { AccountDeploy } from 'casperlabs-sdk';

// URL parameter
type Params = {
  accountPublicKeyBase16: string;
};

interface Props extends RouteComponentProps<Params> {
  deployInfoList: DeployInfoListContainer;
  pageToken: string | null;
}

@observer
class _DeployInfoListDetails extends RefreshableComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.props.deployInfoList.init(this.accountPublicKeyBase16);
  }

  get accountPublicKeyBase16() {
    return this.props.match.params.accountPublicKeyBase16;
  }

  async refresh() {
    await this.props.deployInfoList.fetchData();
  }

  render() {
    const { deployInfoList } = this.props;
    console.log();
    return (
      <DataTable
        title={`Latest Deploys for account ${this.accountPublicKeyBase16}`}
        refresh={() => this.refresh()}
        headers={[
          'Deploy Hash',
          'Account',
          'State',
          'Cost',
          'Error Message',
          'Block Hash'
        ]}
        rows={deployInfoList.deployInfosList.data}
        renderRow={(deployInfo: AccountDeploy) => {
          return (
            <tr key={deployInfo.deployHash}>
              <td>{deployInfo.deployHash}</td>
              <td>{deployInfo.account}</td>
              <td>{deployInfo.state}</td>
              <td className="text-center">{deployInfo.cost}</td>
              <td>{deployInfo.errorMessage}</td>
              <td>{deployInfo.blockHash}</td>
            </tr>
          );
        }}
      />
    );
  }
}

export const DeployInfoListDetails = withRouter(_DeployInfoListDetails);
export default DeployInfoListDetails;

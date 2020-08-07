import React from 'react';
import { observer } from 'mobx-react';
import { FailIcon, Icon, IconButton, ListInline, RefreshableComponent, SuccessIcon } from './Utils';
import DataTable from './DataTable';
import { DeployInfo } from 'casperlabs-grpc/io/casperlabs/casper/consensus/info_pb';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Pages from './Pages';
import { decodeBase16, encodeBase16 } from 'casperlabs-sdk';
import { DeployInfoListContainer } from '../containers/DeployInfoListContainer';
import Timestamp from './TimeStamp';

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
    this.props.deployInfoList.init(
      decodeBase16(this.accountPublicKeyBase16),
      this.props.pageToken
    );
  }

  get accountPublicKeyBase16() {
    return this.props.match.params.accountPublicKeyBase16;
  }

  async refresh() {
    await this.props.deployInfoList.fetchData();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.pageToken === nextProps.pageToken) {
      return;
    }
    this.props.deployInfoList.fetchPage(nextProps.pageToken);
  }

  render() {
    const { deployInfoList } = this.props;
    return (
      <DataTable
        title={`Latest Deploys for account ${this.accountPublicKeyBase16}`}
        refresh={() => this.refresh()}
        headers={['Deploy Hash', 'Timestamp', 'Result']}
        rows={deployInfoList.deployInfosList}
        renderRow={(deployInfo: DeployInfo) => {
          const id = encodeBase16(deployInfo.getDeploy()!.getDeployHash_asU8());
          let prs = deployInfo.getProcessingResultsList();
          let status;
          if (prs.length === 0) {
            status = 0; // pending
          } else if (prs[0].getIsError()) {
            status = 1; // fail
          } else {
            status = 2; // success
          }
          return (
            <tr key={id}>
              <td>
                <Link to={Pages.deploy(id)}>{id}</Link>
              </td>
              <td>
                <Timestamp
                  timestamp={deployInfo
                    .getDeploy()!
                    .getHeader()!
                    .getTimestamp()}
                />
              </td>
              <td className="text-center">
                {status === 0 ? (
                  <Icon name="clock" />
                ) : status === 1 ? (
                  <FailIcon/>
                ) : (
                  <SuccessIcon/>
                )}
              </td>
            </tr>
          );
        }}
        footerMessage={
          <ListInline>
            <IconButton
              title="Previous"
              onClick={() => {
                if (this.props.deployInfoList.prevPageToken) {
                  let url = Pages.deploysOfAccount(
                    this.accountPublicKeyBase16,
                    this.props.deployInfoList.prevPageToken
                  );
                  this.props.history.push(url);
                }
              }}
              icon="step-backward"
            />
            <IconButton
              title="Next"
              onClick={() => {
                if (this.props.deployInfoList.nextPageToken) {
                  let url = Pages.deploysOfAccount(
                    this.accountPublicKeyBase16,
                    this.props.deployInfoList.nextPageToken
                  );
                  this.props.history.push(url);
                }
              }}
              icon="step-forward"
            />
          </ListInline>
        }
      />
    );
  }
}

export const DeployInfoListDetails = withRouter(_DeployInfoListDetails);
export default DeployInfoListDetails;

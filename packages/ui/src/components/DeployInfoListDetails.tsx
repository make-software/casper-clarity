import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { AccountDeploy } from 'casperlabs-sdk';
import ReactPaginate from 'react-paginate';
import { RefreshableComponent } from './Utils';
import DataTable from './DataTable';
import { DeployInfoListContainer } from '../containers/DeployInfoListContainer';
import Pages from './Pages';

// URL parameter
type Params = {
  accountPublicKeyBase16: string;
};

interface Props extends RouteComponentProps<Params> {
  deployInfoList: DeployInfoListContainer;
  pageToken: string | null;
  page: string | null;
  limit: string | null;
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

  async componentWillReceiveProps(nextProps: Props) {
    const { page, limit } = this.props;
    if (page === nextProps.page && limit === nextProps.limit) {
      return;
    }
    this.props.deployInfoList.pageNumber = page ? parseInt(page) : 1;
    this.props.deployInfoList.pageSize = limit ? parseInt(limit) : 10;
    await this.refresh();
  }

  render() {
    const { deployInfoList } = this.props;
    return (
      <DataTable
        title={`Latest Deploys for account ${this.accountPublicKeyBase16}`}
        refresh={() => this.refresh()}
        headers={[
          'Deploy Hash',
          'State',
          'Cost',
          'Error Message',
          'Block Hash'
        ]}
        rows={deployInfoList.deployInfosList.data}
        renderRow={(deployInfo: AccountDeploy) => {
          return (
            <tr key={deployInfo.deployHash}>
              <td>
                <Link to={Pages.deploy(deployInfo.deployHash)}>
                  {deployInfo.deployHash}
                </Link>
              </td>
              <td>{deployInfo.state}</td>
              <td className="text-center">{deployInfo.cost}</td>
              <td>{deployInfo.errorMessage}</td>
              <td>
                <Link to={Pages.block(deployInfo.blockHash)}>
                  {deployInfo.blockHash}
                </Link>
              </td>
            </tr>
          );
        }}
        footerMessage={
          <div id="react-paginate">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={deployInfoList.deployInfosList.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={props =>
                this.props.history.push(
                  deployInfoList.deployInfosList.pages[props.selected].url
                )
              }
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        }
      />
    );
  }
}

export const DeployInfoListDetails = withRouter(_DeployInfoListDetails);
export default DeployInfoListDetails;

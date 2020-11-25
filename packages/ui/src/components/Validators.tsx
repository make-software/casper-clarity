import React from 'react';
import { observer } from 'mobx-react';
import { RefreshableComponent, Loading, CSPR } from './Utils';
import DataTable from './DataTable';
import ValidatorsContainer from '../containers/ValidatorsContainer';

interface Props {
  validatorsContainer: ValidatorsContainer;
}

const navElement = (
  isActive: boolean,
  navName: string,
  tabName: string,
  title: string
) => {
  return (
    <li className="nav-item" key={navName}>
      <a
        className={`validator-tab-nav-element nav-link ${
          isActive ? 'active' : ''
        }`}
        id={navName}
        data-toggle="tab"
        data-target={`#${tabName}`}
        role="tab"
        href="#"
      >
        {title}
      </a>
    </li>
  );
};

const navContent = (isActive: boolean, tabName: string, dataTable: any) => {
  return (
    <div
      key={tabName}
      className={`tab-pane ${isActive ? 'show active' : ''}`}
      id={tabName}
      role="tabpanel"
    >
      {dataTable}
    </div>
  );
};

@observer
export default class Validators extends RefreshableComponent<Props, {}> {
  async refresh() {
    this.props.validatorsContainer.refresh();
  }

  render() {
    // If data is not there, display loader.
    let data = this.props.validatorsContainer.validatorsInfo;
    if (!data) {
      return <Loading />;
    }

    // Contaners for tabs.
    let navs = [];
    let tables = [];

    // For each era build navigation element and data table.
    for (const [index, eraId] of Object.keys(data.era_validators).entries()) {
      let eraName = `Era ${eraId} ${index == 0 ? '(current)' : ''}`;
      let tabName = `validator-tab-${eraId}`;
      let navName = `${tabName}-nav`;
      let isActive = index == 0;

      // Build era navigation element.
      navs.push(navElement(isActive, navName, tabName, eraName));

      // Prepare era rows.
      let rows = Object.keys(data.era_validators[eraId]).map(validatorId => {
        return {
          validatorId: validatorId,
          stake: data?.era_validators[eraId][validatorId]
        };
      });

      // Build era data table.
      tables.push(
        navContent(
          isActive,
          tabName,
          <DataTable
            title={eraName}
            headers={['Validator ID', 'Stake']}
            rows={rows}
            renderRow={(validatorInfo, idx) => {
              let key = `${eraId}-${validatorInfo.validatorId}`;
              return (
                <tr key={key}>
                  <td>{validatorInfo.validatorId}</td>
                  <td>
                    <CSPR motes={validatorInfo.stake} />
                  </td>
                </tr>
              );
            }}
            noHeader={true}
          />
        )
      );
    }

    // Prepare bids navigation element.
    navs.push(
      navElement(false, 'validators-bids-nav', 'validators-bids-tab', 'Bids')
    );

    // Prepare bids rows.
    let rows = Object.keys(data.bids).map(validatorId => {
      return {
        validatorId: validatorId,
        delegation_rate: data?.bids[validatorId].delegation_rate,
        stake: data?.bids[validatorId].staked_amount
      };
    });

    // Build bids data table.
    tables.push(
      navContent(
        false,
        'validators-bids-tab',
        <DataTable
          title="Bids"
          headers={['Validator ID', 'Delegation Rate', 'Stake']}
          rows={rows}
          renderRow={(bidInfo, idx) => {
            let key = `bids-${bidInfo.validatorId}`;
            return (
              <tr key={key}>
                <td>{bidInfo.validatorId}</td>
                <td>{bidInfo.delegation_rate}</td>
                <td>
                  <CSPR motes={bidInfo.stake} />
                </td>
              </tr>
            );
          }}
          noHeader={true}
        />
      )
    );

    return (
      <div id="validators-tab">
        <div className="container-fluid p-3 mt-3">
          <h4>Validators</h4>
        </div>
        <div className="container-fluid">
          <ul
            className="nav nav-pills mb-3 validator-tab-nav-list"
            id="validator-tabs"
            role="tablist"
          >
            {navs}
          </ul>
        </div>
        <div className="container-fluid">
          <div className="tab-content" id="validator-tabsContent">
            {tables}
          </div>
        </div>
      </div>
    );
  }
}

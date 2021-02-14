import React from 'react';
import { observer } from 'mobx-react';
import {RefreshableComponent, Loading, CSPR, motesToMegaCspr} from './Utils';
import DataTable from './DataTable';
import ValidatorsContainer from '../containers/ValidatorsContainer';
import { BigNumber } from '@ethersproject/bignumber';

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
            return <Loading/>;
        }

        const totalStakedAmount = data.bids.reduce(
            (acc, val) => acc.add(BigNumber.from(val.bid.staked_amount)),
            BigNumber.from(0)
        );

        // Contaners for tabs.
        let navs = [];
        let tables = [];

        // Prepare bids navigation element.
        navs.push(
            navElement(true, 'validators-bids-nav', 'validators-bids-tab', 'Bids')
        );


        // Prepare bids rows.
        let rows = data.bids
            .map(bid => {
                let stake = bid.bid.staked_amount;
                return {
                    validatorId: bid.public_key,
                    delegation_rate: bid.bid.delegation_rate,
                    stakeStr: stake,
                    stakeNum: BigNumber.from(stake),
                    reward: bid.bid.reward,
                    stakePerc: (motesToMegaCspr(stake) / motesToMegaCspr(totalStakedAmount)) * 100
                };
            })
            .sort((a, b) => compareBigNumbers(a.stakeNum, b.stakeNum));

        // Build bids data table.
        tables.push(
            navContent(
                true,
                'validators-bids-tab',
                <DataTable
                    title="Bids"
                    headers={['Validator ID', 'Slot', 'Delegation Rate', 'Stake']}
                    rows={rows}
                    renderRow={(bidInfo, index) => {
                        let key = `bids-${bidInfo.validatorId}`;
                        return (
                            <tr key={key}>
                                <td>{bidInfo.validatorId}</td>
                                <td>{index! + 1}</td>
                                <td>{bidInfo.delegation_rate}</td>
                                <td>
                                    <CSPR motes={bidInfo.stakeNum}/>
                                    <span className="stakePerc">
                                        ({bidInfo.stakePerc.toFixed(2)}%)
                                    </span>
                                </td>
                            </tr>
                        );
                    }}
                    noHeader={true}
                />
            )
        );

        // For each era build navigation element and data table.
        // for (const [index, eraId] of Object.keys(data.era_validators).entries()) {
        for (const [index, era] of data.era_validators.entries()) {
            let eraName = `Era ${era.era_id} ${index == 0 ? '(current)' : ''}`;
            let tabName = `validator-tab-${era.era_id}`;
            let navName = `${tabName}-nav`;

            // Build era navigation element.
            navs.push(navElement(false, navName, tabName, eraName));

            let totalValidatorWeight = era.validator_weights.reduce(
                (acc, val) => acc.add(val.weight),
                BigNumber.from(0)
            );

            // Prepare era rows.
            let rows = era.validator_weights
                .map(validator_weight => {
                    let stake = validator_weight.weight;
                    return {
                        validatorId: validator_weight.public_key,
                        stakeStr: stake,
                        stakeNum: BigNumber.from(stake),
                        stakePerc: (motesToMegaCspr(stake)  / motesToMegaCspr(totalValidatorWeight)) * 100
                    };
                })
                .sort((a, b) => compareBigNumbers(a.stakeNum, b.stakeNum));

            // Build era data table.
            tables.push(
                navContent(
                    false,
                    tabName,
                    <DataTable
                        title={eraName}
                        headers={['Validator ID', 'Slot', 'Stake']}
                        rows={rows}
                        renderRow={(validatorInfo, index) => {
                            let key = `${era.era_id}-${validatorInfo.validatorId}`;
                            return (
                                <tr key={key}>
                                    <td>{validatorInfo.validatorId}</td>
                                    <td>{index! + 1}</td>
                                    <td>
                                        <CSPR motes={validatorInfo.stakeNum}/>
                                        <span className="stakePerc">
                                            ({validatorInfo.stakePerc.toFixed(2)}%)
                                        </span>
                                    </td>
                                </tr>
                            );
                        }}
                        noHeader={true}
                    />
                )
            );
        }

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

function compareBigNumbers(a: BigNumber, b: BigNumber): number {
  if (a.eq(b)) {
    return 0;
  } else {
    return a.lt(b) ? 1 : -1;
  }
}

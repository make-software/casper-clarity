import React from 'react';
import { observer } from 'mobx-react';
import {
  RefreshableComponent,
  Loading,
  CSPR,
  divBigNumbersWithPrecision
  // shortHash
  // IconButton
} from './Utils';
import DataTable from './DataTable';
import ValidatorsContainer from '../containers/ValidatorsContainer';
import { BigNumber } from '@ethersproject/bignumber';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Delegators } from 'casper-client-sdk';

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
        href="/#"
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

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    // If data is not there, display loader.
    let data = this.props.validatorsContainer.validatorsInfo?.auction_state;

    if (!data) {
      return <Loading />;
    }

    const totalStakedAmount = data.bids.reduce(
      (acc, val) => acc.add(BigNumber.from(val.bid.staked_amount)),
      BigNumber.from(0)
    );

    const delegations = data.bids.flatMap((value, index) => {
      return value.bid.delegators;
    });

    const totalDelegatedAmount = delegations.reduce(
      (acc, val) => acc.add(BigNumber.from(val.staked_amount)),
      BigNumber.from(0)
    );

    const totalWeight = totalStakedAmount.add(totalDelegatedAmount);

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
        let stakeNum = BigNumber.from(stake);
        let validatorTotalDelegatedStake = BigNumber.from(0);
        if (bid.bid.delegators.length > 0) {
          validatorTotalDelegatedStake = bid.bid.delegators.reduce(
            (acc, val) => acc.add(BigNumber.from(val.staked_amount)),
            BigNumber.from(0)
          );
        }
        let totalValidatorWeight = validatorTotalDelegatedStake.add(stakeNum);

        return {
          validatorId: bid.public_key,
          delegation_rate: bid.bid.delegation_rate,
          stakeStr: stake,
          stakeNum: stakeNum,
          delegators: bid.bid.delegators,
          delegatorCount: bid.bid.delegators.length,
          delegatedStake: validatorTotalDelegatedStake,
          delegatedStakePerc: totalValidatorWeight.eq(0)
            ? 0
            : divBigNumbersWithPrecision(
                validatorTotalDelegatedStake,
                totalValidatorWeight,
                4
              ) * 100,
          selfStakePerc: totalValidatorWeight.eq(0)
            ? 100
            : divBigNumbersWithPrecision(stakeNum, totalValidatorWeight, 4) *
              100,
          totalValidatorWeight: totalValidatorWeight,
          reward: bid.bid.reward,
          stakePerc:
            divBigNumbersWithPrecision(stakeNum, totalStakedAmount, 4) * 100,
          totalPerc:
            divBigNumbersWithPrecision(totalValidatorWeight, totalWeight, 4) *
            100
        };
      })
      .sort((a, b) =>
        compareBigNumbers(a.totalValidatorWeight, b.totalValidatorWeight)
      );

    // Build bids data table.
    tables.push(
      navContent(
        true,
        'validators-bids-tab',
        <DataTable
          title="Bids"
          headers={[
            'Slot',
            'Validator ID',
            'Fee',
            'Delegators',
            'Weight',
            'Network %',
            'Self %'
          ]}
          // version with 3 columns for Delegated Stake, Self Stake, Total Stake
          // headers={['Slot', 'Validator ID', 'Fee', 'Delegators','Delegated Stake', 'Self Staked (Self %)', 'Total Weight']}
          rows={rows}
          renderRow={(bidInfo, index) => {
            let key = `bids-${bidInfo.validatorId}`;

            function showDelegators() {
              $('#' + key + ' .delegators').toggle();
            }

            return (
              <tr
                className={'clickable'}
                id={key}
                key={key}
                onClick={showDelegators}
              >
                <td>{index! + 1}</td>
                <td>
                  <div className={'monospace'}>
                    {bidInfo.validatorId}&nbsp;&nbsp;
                  </div>
                  <div className={'stakePerc monospace delegators'}>
                    self staked
                  </div>
                  {bidInfo.delegators.map((value: Delegators) => (
                    <div className={'stakePerc monospace delegators'}>
                      {value.public_key}
                    </div>
                  ))}
                </td>
                <td className={'rightAligned'}>{bidInfo.delegation_rate} %</td>
                <td className={'rightAligned'}>{bidInfo.delegatorCount}</td>
                <td className={'rightAligned monospace'}>
                  <CSPR motes={bidInfo.totalValidatorWeight} />
                  <div className={'stakePerc delegators'}>
                    <CSPR motes={BigNumber.from(bidInfo.stakeNum)} />
                  </div>
                  {bidInfo.delegators.map((value: Delegators) => (
                    <div className={'stakePerc delegators'}>
                      <CSPR motes={BigNumber.from(value.staked_amount)} />
                    </div>
                  ))}
                </td>
                <td className={'rightAligned'}>
                  <span className="stakePerc">
                    {bidInfo.totalPerc.toFixed(2)}%
                  </span>
                </td>
                <td className={'rightAligned'}>
                  <span className="stakePerc">
                    {bidInfo.selfStakePerc.toFixed(2)}%
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
      let eraName = `Era ${era.era_id} ${index === 0 ? '(current)' : ''}`;
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
          let stakeNum = BigNumber.from(stake);
          return {
            validatorId: validator_weight.public_key,
            stakeStr: stake,
            stakeNum,
            stakePerc:
              divBigNumbersWithPrecision(stakeNum, totalValidatorWeight, 4) *
              100
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
            headers={['Validator ID', 'Slot', 'Stake', 'Network %']}
            rows={rows}
            renderRow={(validatorInfo, index) => {
              let key = `${era.era_id}-${validatorInfo.validatorId}`;
              return (
                <tr key={key}>
                  <td className={'monospace'}>{validatorInfo.validatorId}</td>
                  <td>{index! + 1}</td>
                  <td className={'monospace rightAligned'}>
                    <CSPR motes={validatorInfo.stakeNum} />
                  </td>
                  <td className={'rightAligned'}>
                    <span className="stakePerc">
                      {validatorInfo.stakePerc.toFixed(2)}%
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

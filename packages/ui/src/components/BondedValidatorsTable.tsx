import React from 'react';
import { observer } from 'mobx-react';
import DataTable from './DataTable';
import { encodeBase16, JsonBlock } from 'casper-client-sdk';
import { Icon } from './Utils';

export const BondedValidatorsTable = observer(
  (props: { block: JsonBlock; lastFinalizedBlock: JsonBlock | undefined }) => {
    // let finalizedBondedValidators = new Set();

    // Since js doesn't support taking tuple as the key of map/set, we need encode it.
    // The char `_` is not used in Base64, so it is safe to use it as separator.
    // let key = (b: Bond) =>
    //   `${b.getValidatorPublicKeyHash_asB64()}_${b.getStake()}`;
    //
    // if (props.lastFinalizedBlock) {
    //   let finalizedBonds = props.lastFinalizedBlock
    //     .getSummary()!
    //     .getHeader()!
    //     .getState()!
    //     .getBondsList();
    //   finalizedBondedValidators = new Set(
    //     finalizedBonds.map(bond => key(bond))
    //   );
    // }
    // fixme
    // let bondsList = props.block
    //   .getSummary()!
    //   .getHeader()!
    //   .getState()!
    //   .getBondsList();
    let bondsList: any[] = [];
    return (
      <DataTable
        title={`Bonded Validators List (${bondsList.length})`}
        headers={['Validator', 'Stake', 'Finalized']}
        rows={bondsList}
        renderRow={(bond, i) => {
          return (
            <tr key={i}>
              <td className="text-left">
                {encodeBase16(bond.getValidatorPublicKeyHash_asU8())}
              </td>
              <td className="text-right">
                {Number(bond.getStake()!.getValue()).toLocaleString()}
              </td>
              <td className="text-center">
                {/*{finalizedBondedValidators.has(key(bond)) ? (*/}
                <Icon name="check-circle" color="green" />
                {/*) : (*/}
                {/*  <Icon name="clock" />*/}
                {/*)}*/}
              </td>
            </tr>
          );
        }}
      />
    );
  }
);

import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Form, SelectField, TextField } from '../../../components/Forms';
import AuthContainer from '../../../containers/AuthContainer';
import {
  Button,
  Card,
  CLX,
  Icon,
  ListInline,
  Loading,
  RefreshableComponent
} from '../../../components/Utils';
import VestingChart from './VestingChart';
import moment from 'moment';
import { VestingContainer, VestingDetail } from '../container/VestingContainer';
import Modal from '../../../components/Modal';
import { encodeBase16 } from 'casperlabs-sdk';

interface Props {
  auth: AuthContainer;
  vesting: VestingContainer;
}

@observer
class Vesting extends RefreshableComponent<Props, {}> {
  refresh() {
    this.props.auth.refreshAccounts();
  }

  render() {
    const { vesting } = this.props;
    return (
      <div>
        <VestingHashesManageForm vestingContainer={this.props.vesting} />
        {vesting.selectedVestingHash && !vesting.vestingDetails && (
          <div className="col-12">
            <Loading />
          </div>
        )}
        {vesting.selectedVestingHash && vesting.vestingDetails && (
          <div>
            <Card title="Vesting Schedule">
              <div className="col-8 container">
                <VestingChart vestingDetail={vesting.vestingDetails} />
              </div>
            </Card>
            <VestingDetails
              hash={vesting.selectedVestingHash!.hashBase16}
              vestingDetail={vesting.vestingDetails}
              refresh={() =>
                vesting.init(vesting.selectedVestingHash!.hashBase16)
              }
            />
          </div>
        )}
      </div>
    );
  }
}

/**
 * The ui component to manage hashes of Vesting Contract,
 * including selecting, adding and removing hashes.
 */
const VestingHashesManageForm = observer(
  (props: { vestingContainer: VestingContainer }) => {
    const { vestingContainer } = props;

    // The modal for importing new hash, showed once users click the `Add New` button.
    const modalImporting = vestingContainer.isFormOpen && (
      <Modal
        id="addNewVestingHash"
        title="Add new hash of vesting contract"
        submitLabel="Save"
        onSubmit={() => vestingContainer.save()}
        onClose={() => {
          vestingContainer.closeImportVestingHashForm();
        }}
        error={vestingContainer.error}
      >
        <Form>
          <TextField
            id="id-import-vesting-hash-base16"
            label="Hash of vesting contract (Base16)"
            fieldState={vestingContainer.importVestingForm!.hashBase16}
          />
          <TextField
            id="id-import-vesting-hash-name"
            label="Name"
            fieldState={vestingContainer.importVestingForm!.name}
            placeholder="Human readable alias"
          />
        </Form>
      </Modal>
    );

    return (
      <Card title="Vesting Contracts">
        <Form>
          <SelectField
            id="id-vesting-name"
            label="Name"
            placeholder="Select hash of the vesting contract"
            value={
              (vestingContainer.selectedVestingHash &&
                vestingContainer.selectedVestingHash.name) ||
              null
            }
            options={vestingContainer.options}
            onChange={x => {
              let oldSelected = vestingContainer.selectedVestingHash;
              vestingContainer.selectVestingHashByName(x);

              // Check whether user select another vesting contract
              if (
                oldSelected !== vestingContainer.selectedVestingHash &&
                vestingContainer.selectedVestingHash
              ) {
                vestingContainer.init(
                  vestingContainer.selectedVestingHash.hashBase16
                );
              }
            }}
          />
          <TextField
            id="id-vesting-hash-base16"
            label="Hash of vesting contract (Base16)"
            fieldState={vestingContainer.selectedVestingHash?.hashBase16 || ''}
            readonly={true}
          />
        </Form>
        {modalImporting}
        <ListInline>
          <Button
            title="Add New"
            onClick={() => vestingContainer.configureImportVestingHash()}
          />
          <Button
            title="Remove"
            type="danger"
            onClick={() => {
              if (vestingContainer.selectedVestingHash?.hashBase16) {
                vestingContainer.deleteVestingHash(
                  vestingContainer.selectedVestingHash!.hashBase16
                );
              }
            }}
            disabled={vestingContainer.selectedVestingHash === null}
          />
        </ListInline>
      </Card>
    );
  }
);

const TableRow = (props: { title: string; children: ReactNode }) => {
  return (
    <tr>
      <th role="row">{props.title}</th>
      <td>{props.children}</td>
    </tr>
  );
};

/**
 * Get a string represent how long the duration is.
 * @param duration : milliseconds
 */
function duration(duration: number) {
  const d = moment.duration(duration);
  if (d.days() > 1) {
    let days = d.asDays();
    return `${days.toLocaleString()} day${days > 1 ? 's' : ''}`;
  } else {
    let hours = d.asHours();
    return `${hours.toLocaleString()} hour${hours > 1 ? 's' : ''}`;
  }
}

/**
 * The table to show the information of the selected vesting contract.
 */
const VestingDetails = observer(
  (props: {
    vestingDetail: VestingDetail;
    hash: string;
    refresh: () => void;
  }) => {
    const vestingDetail = props.vestingDetail;
    return (
      <Card title="Vesting Details" refresh={() => props.refresh()}>
        <table className="table table-bordered">
          <tbody>
            <TableRow title="Hash of the Vesting Contract">
              {props.hash}
            </TableRow>
            <TableRow title="Current Time">{moment().format()}</TableRow>
            <TableRow title="Cliff Timestamp">
              {moment(vestingDetail.cliffTimestamp).fromNow()}
            </TableRow>
            <TableRow title="Cliff Amount">
              <CLX amount={vestingDetail.cliffAmount} />
            </TableRow>
            <TableRow title="Drip Duration">
              {duration(vestingDetail.dripDuration)}
            </TableRow>
            <TableRow title="Drip Amount">
              <CLX amount={vestingDetail.dripAmount} />
            </TableRow>
            <TableRow title="Total Amount">
              <CLX amount={vestingDetail.totalAmount} />
            </TableRow>
            <TableRow title="Released Amount">
              <CLX amount={vestingDetail.releasedAmount} />
            </TableRow>
            <TableRow title="Admin Release Duration">
              <span className="mr-3">
                {duration(vestingDetail.adminReleaseDuration)}
              </span>
              {vestingDetail.isReleasable && (
                <Icon
                  name="check-circle"
                  color="green"
                  title="Available to release"
                />
              )}
            </TableRow>
            <TableRow title="Paused State">
              {vestingDetail.isPaused ? 'Paused' : 'Not Paused'}
            </TableRow>
            {vestingDetail.isPaused && (
              <TableRow title="Last Time Paused">
                {moment(vestingDetail.lastPauseTimestamp).fromNow()}
              </TableRow>
            )}
            <TableRow title="On Pause Duration">
              {duration(vestingDetail.onPauseDuration)}
            </TableRow>
            <TableRow title="Admin Account">
              {encodeBase16(vestingDetail.adminAccount)}
            </TableRow>
            <TableRow title="Recipient Account">
              {encodeBase16(vestingDetail.recipientAccount)}
            </TableRow>
            <TableRow title="Available Amount">
              <CLX amount={vestingDetail.available_amount} />
            </TableRow>
          </tbody>
        </table>
      </Card>
    );
  }
);

export default Vesting;

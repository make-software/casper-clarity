-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE Transfers
    DROP KEY transfers_source_purse,
    DROP KEY transfers_target_purse,
    ADD KEY transfers_transfer_id(transferId);

ALTER TABLE `Transfers` MODIFY `transferId` BIGINT unsigned;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

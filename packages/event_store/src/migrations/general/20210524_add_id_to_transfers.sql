-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Transfers` ADD `transferId` BIGINT AFTER `blockHash`;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Transfers` ADD `blockHash` VARCHAR(64) NOT NULL AFTER `deployHash`;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

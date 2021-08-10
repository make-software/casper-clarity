-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `GenesisAccountTransfers` ADD `description` MEDIUMTEXT NOT NULL AFTER `isReviewed`;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

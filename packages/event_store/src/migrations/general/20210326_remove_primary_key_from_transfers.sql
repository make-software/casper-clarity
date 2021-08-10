-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Transfers` DROP PRIMARY KEY;
ALTER TABLE `Transfers` DROP COLUMN `id`;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

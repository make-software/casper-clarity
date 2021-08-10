-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Deploys` DROP COLUMN `blockHeight`;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
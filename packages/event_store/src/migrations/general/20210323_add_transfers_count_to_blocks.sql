-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Blocks` ADD `transferCount` INT AFTER `deployCount`;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

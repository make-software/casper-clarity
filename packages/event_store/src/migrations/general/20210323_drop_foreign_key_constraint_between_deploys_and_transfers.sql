-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

-- +migrate StatementBegin
-- # @see https://mistholding.atlassian.net/browse/BLOX-42
ALTER TABLE `Transfers` DROP FOREIGN KEY `transfers_ibfk_1`

-- +migrate StatementEnd
-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back


-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `RawEvents` MODIFY `jsonBody` MEDIUMTEXT NOT NULL;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
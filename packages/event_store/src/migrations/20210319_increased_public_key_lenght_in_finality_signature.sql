-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `FinalitySignatures` MODIFY `publicKey` VARCHAR(66) NOT NULL;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Bids` MODIFY `validatorPublicKey` varchar(68) DEFAULT NULL;
ALTER TABLE `EraValidators` MODIFY `publicKeyHex` varchar(68);
ALTER TABLE `FinalitySignatures` MODIFY `publicKey` varchar(68) DEFAULT NULL;
ALTER TABLE `Withdrawals` MODIFY `validatorPublicKey` varchar(68) DEFAULT NULL;
ALTER TABLE `Withdrawals` MODIFY `unbonderPublicKey` varchar(68) DEFAULT NULL;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

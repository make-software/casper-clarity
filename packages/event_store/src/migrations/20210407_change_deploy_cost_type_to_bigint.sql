-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Deploys` MODIFY `cost` bigint(11) DEFAULT NULL;
ALTER TABLE `EventIds` MODIFY `id` bigint(11) NOT NULL;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

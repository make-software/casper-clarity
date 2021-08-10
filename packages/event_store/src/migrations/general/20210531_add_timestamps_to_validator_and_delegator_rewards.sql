-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `DelegatorRewards` ADD `timestamp` DATETIME NOT NULL AFTER `amount`;
ALTER TABLE `ValidatorRewards` ADD `timestamp` DATETIME NOT NULL AFTER `amount`;

ALTER TABLE `DelegatorRewards` MODIFY `amount` BIGINT NOT NULL;
ALTER TABLE `ValidatorRewards` MODIFY `amount` BIGINT NOT NULL;

UPDATE DelegatorRewards dr
    JOIN Eras e ON dr.eraId = e.id
SET dr.timestamp = e.endTimestamp;

UPDATE ValidatorRewards dr
    JOIN Eras e ON dr.eraId = e.id
SET dr.timestamp = e.endTimestamp;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back


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

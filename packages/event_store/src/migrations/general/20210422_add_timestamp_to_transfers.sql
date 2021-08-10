-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

ALTER TABLE `Transfers` ADD `timestamp` datetime NOT NULL AFTER `amount`;

UPDATE Transfers t
    JOIN Deploys d ON d.deployHash = t.deployHash
SET t.timestamp = d.timestamp;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

ALTER TABLE `Transfers` ADD `timestamp` datetime NOT NULL AFTER `amount`;

UPDATE Transfers t
    JOIN Deploys d ON d.deployHash = t.deployHash
SET t.timestamp = d.timestamp;

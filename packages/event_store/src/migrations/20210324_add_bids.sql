-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `Bids` (
    `key` varchar(74) NOT NULL,
    `deployHash` varchar(64) NOT NULL,
    `validatorPublicKey` varchar(67) DEFAULT NULL,
    `bondingPurse` varchar(74) DEFAULT NULL,
    `stakedAmount` bigint(20) DEFAULT NULL,
    `delegationRate` int(11) DEFAULT NULL,
    `inactive` tinyint(1) DEFAULT NULL,
    `vestingSchedule` json DEFAULT NULL,
    `delegators` json DEFAULT NULL,
    `timestamp` datetime DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`deployHash`,`key`),
    KEY `bids_validator_public_key` (`validatorPublicKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

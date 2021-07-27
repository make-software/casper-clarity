-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `Eras` (
    `id` int(11) NOT NULL,
    `endBlockHeight` int(11) DEFAULT NULL,
    `endTimestamp` datetime DEFAULT NULL,
    `protocolVersion` varchar(15) DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `EraValidators` (
     `eraId` int(11) NOT NULL,
     `publicKeyHex` varchar(66) NOT NULL,
     `weight` bigint(20) DEFAULT NULL,
     `rewards` bigint(20) DEFAULT NULL,
     `hasEquivocation` tinyint(1) DEFAULT NULL,
     `wasActive` tinyint(1) DEFAULT NULL,
     `createdAt` datetime NOT NULL,
     `updatedAt` datetime NOT NULL,
     PRIMARY KEY (`eraId`,`publicKeyHex`),
     KEY `publicKeyHexIdx` (`publicKeyHex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `GenesisAccounts` (
  `publicKey` varchar(68) NOT NULL,
  `accountHash` varchar(64) NOT NULL,
  `type` varchar(9) NOT NULL,
  `balance` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`publicKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `GenesisAccountTransfers` (
  `transferId` bigint(20) DEFAULT NULL,
  `deployHash` varchar(64) NOT NULL,
  `transferHash` varchar(255) NOT NULL,
  `blockHash` varchar(64) NOT NULL,
  `fromAccount` varchar(64) DEFAULT NULL,
  `toAccount` varchar(64) DEFAULT NULL,
  `sourcePurse` varchar(255) DEFAULT NULL,
  `targetPurse` varchar(255) DEFAULT NULL,
  `amount` bigint(20) NOT NULL,
  `isInternal` tinyint(4) NOT NULL DEFAULT 0,
  `isIgnored` tinyint(4) NOT NULL DEFAULT 0,
  `isReviewed` tinyint(4) NOT NULL DEFAULT 0,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`deployHash`,`transferHash`),
  KEY `search_idx` (`fromAccount`,`isInternal`,`isIgnored`,`toAccount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back

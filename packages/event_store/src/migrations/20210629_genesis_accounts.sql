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
  `blockHash` varchar(64) DEFAULT NULL,
  `fromAccount` varchar(64) DEFAULT NULL,
  `toAccount` varchar(64) DEFAULT NULL,
  `sourcePurse` varchar(255) DEFAULT NULL,
  `targetPurse` varchar(255) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `isInternal` tinyint(4) DEFAULT 0,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`deployHash`,`transferHash`),
  KEY `genesis_account_transfers_from_account_is_internal_to_account` (`fromAccount`,`isInternal`,`toAccount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
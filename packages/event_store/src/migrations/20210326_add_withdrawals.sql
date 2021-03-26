CREATE TABLE `Withdrawals` (
    `key` varchar(74) NOT NULL,
    `deployHash` varchar(64) NOT NULL,
    `validatorPublicKey` varchar(67) DEFAULT NULL,
    `unbonderPublicKey` varchar(67) DEFAULT NULL,
    `bondingPurse` varchar(74) DEFAULT NULL,
    `amount` bigint(20) DEFAULT NULL,
    `eraOfCreation` int(11) NOT NULL,
    `timestamp` datetime DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    KEY `withdrawals_validator_public_key` (`validatorPublicKey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
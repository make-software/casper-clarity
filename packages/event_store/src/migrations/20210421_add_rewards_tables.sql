CREATE TABLE `ValidatorRewards` (
    `publicKey` varchar(68) NOT NULL,
    `eraId` int(11) NOT NULL,
    `amount` bigint(20) DEFAULT NULL,
    PRIMARY KEY (`publicKey`,`eraId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `DelegatorRewards` (
    `publicKey` varchar(68) NOT NULL,
    `validatorPublicKey` varchar(68) NOT NULL,
    `eraId` int(11) NOT NULL,
    `amount` bigint(20) DEFAULT NULL,
    PRIMARY KEY (`publicKey`,`validatorPublicKey`,`eraId`),
    KEY `delegator_rewards_validator_public_key` (`validatorPublicKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

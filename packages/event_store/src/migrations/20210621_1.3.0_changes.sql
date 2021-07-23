CREATE TABLE `StreamPaths` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `path` varchar(32) DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `stream_path_path` (`path`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO StreamPaths (path, createdAt, updatedAt) VALUES ('events', now(), now());

RENAME TABLE EventIds TO EventIdsPreMultipleStreams;

CREATE TABLE `EventIds` (
  `sourceNodeId` int(11) NOT NULL,
  `apiVersionId` int(11) NOT NULL,
  `eventStreamId` int(11) NOT NULL,
  `id` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sourceNodeId`,`apiVersionId`,`eventStreamId`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `RawDeployAceptedEvents` (
  `sourceNodeId` tinyint(4) DEFAULT NULL,
  `apiVersionId` mediumint(9) DEFAULT NULL,
  `deployHash` varchar(64) NOT NULL,
  `jsonBody` mediumtext,
  `created` datetime NOT NULL,
  PRIMARY KEY (`deployHash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `RawDeployProcessedEvents` (
  `sourceNodeId` tinyint(4) DEFAULT NULL,
  `apiVersionId` mediumint(9) DEFAULT NULL,
  `deployHash` varchar(64) NOT NULL,
  `jsonBody` mediumtext,
  `created` datetime NOT NULL,
  PRIMARY KEY (`deployHash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `RawFinalitySignatureEvents` (
  `sourceNodeId` tinyint(4) DEFAULT NULL,
  `apiVersionId` mediumint(9) DEFAULT NULL,
  `signature` varchar(130) NOT NULL,
  `jsonBody` mediumtext,
  `created` datetime NOT NULL,
  PRIMARY KEY (`signature`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `RawBlockAddedEvents` (
  `sourceNodeId` tinyint(4) DEFAULT NULL,
  `apiVersionId` mediumint(9) DEFAULT NULL,
  `blockHeight` int(11) NOT NULL,
  `jsonBody` mediumtext,
  `created` datetime NOT NULL,
  PRIMARY KEY (`blockHeight`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `RawStepEvents` (
  `sourceNodeId` tinyint(4) DEFAULT NULL,
  `apiVersionId` mediumint(9) DEFAULT NULL,
  `eraId` int(11) NOT NULL,
  `jsonBody` mediumtext,
  `created` datetime NOT NULL,
  PRIMARY KEY (`eraId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `RawUnrecognizedEvents` (
  `sourceNodeId` tinyint(4) DEFAULT NULL,
  `apiVersionId` mediumint(9) DEFAULT NULL,
  `eventType` varchar(32) NOT NULL,
  `jsonBody` mediumtext,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

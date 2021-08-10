-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `SourceNodes` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `address` varchar(15) DEFAULT NULL,
   `createdAt` datetime NOT NULL,
   `updatedAt` datetime NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `source_nodes_address` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `SourceNodes` (`id`, `address`, `createdAt`, `updatedAt`)
VALUES
    (1, 'xxx.xxx.xxx.xxx', '2021-02-26 10:37:55', '2021-02-26 10:37:55');

RENAME TABLE EventIds TO EventIds_20210226;

CREATE TABLE `EventIds` (
    `sourceNodeId` int(11) NOT NULL,
    `id` int(11) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`sourceNodeId`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO EventIds (sourceNodeId, id, createdAt, updatedAt)
SELECT 1, id, createdAt, updatedAt
FROM EventIds_20210226;

CREATE TABLE `ApiVersions` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `version` varchar(32) DEFAULT NULL,
   `createdAt` datetime NOT NULL,
   `updatedAt` datetime NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `api_versions_version` (`version`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `ApiVersions` (`id`, `version`, `createdAt`, `updatedAt`)
VALUES
    (1, '1.0.0', '2021-02-26 11:10:09', '2021-02-26 11:10:09');

ALTER TABLE `RawEvents` ADD `sourceNodeId` int(11) NOT NULL AFTER `eventHash`;
ALTER TABLE `RawEvents` ADD `apiVersionId` int(11) NOT NULL AFTER `sourceNodeId`;
UPDATE RawEvents SET sourceNodeId = 1, apiVersionId=1;

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back
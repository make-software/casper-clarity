CREATE TABLE `StreamPaths` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `path` varchar(32) DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `stream_path_path` (`path`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO EventStreams (path, createdAt, updatedAt) VALUES ('events', now(), now());

ALTER TABLE EventIds ADD `eventStreamId` tinyint NOT NULL AFTER `apiVersionId`;
UPDATE EventIds SET eventStreamId = 1;

ALTER TABLE EventIds DROP PRIMARY KEY;
ALTER TABLE EventIds ADD PRIMARY KEY(sourceNodeId, apiVersionId, eventStreamId, id);

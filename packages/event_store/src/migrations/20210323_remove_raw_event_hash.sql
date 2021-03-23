RENAME TABLE RawEvents TO RawEvents_20210323;

CREATE TABLE `RawEvents` (
   `sourceNodeId` tinyint(11) DEFAULT NULL,
   `apiVersionId` int(11) DEFAULT NULL,
   `eventType` varchar(32) NOT NULL,
   `primaryEntityHash` varchar(130) NOT NULL,
   `jsonBody` text,
   `createdAt` datetime NOT NULL,
   `updatedAt` datetime NOT NULL,
   PRIMARY KEY (`eventType`, `primaryEntityHash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT IGNORE INTO RawEvents(sourceNodeId, apiVersionId, eventType, primaryEntityHash, jsonBody, createdAt, updatedAt)
SELECT sourceNodeId, apiVersionId, eventType, primaryEntityHash, jsonBody, createdAt, updatedAt from RawEvents_20210323;
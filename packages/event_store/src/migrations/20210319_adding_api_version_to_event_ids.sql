ALTER TABLE `EventIds` MODIFY `sourceNodeId` tinyint NOT NULL;
ALTER TABLE `EventIds` ADD `apiVersionId` smallint NOT NULL AFTER `sourceNodeId`;

UPDATE EventIds SET apiVersionId = 1;

ALTER TABLE EventIds
    DROP PRIMARY KEY,
    ADD PRIMARY KEY (sourceNodeId, apiVersionId, id);

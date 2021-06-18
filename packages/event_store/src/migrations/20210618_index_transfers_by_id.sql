ALTER TABLE Transfers
    DROP KEY transfers_source_purse,
    DROP KEY transfers_target_purse,
    ADD KEY transfers_transfer_id(transferId);

ALTER TABLE `Transfers` MODIFY `transferId` BIGINT unsigned;
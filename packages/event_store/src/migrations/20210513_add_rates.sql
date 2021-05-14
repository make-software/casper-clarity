CREATE TABLE `rates` (
    `rate_source_id` tinyint unsigned NOT NULL,
    `currency_id` tinyint unsigned NOT NULL,
    `rate` float NOT NULL,
    `created` datetime NOT NULL,
    KEY `currency_timeline_idx` (`currency_id`, `created`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
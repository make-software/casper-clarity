-- +migrate Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE `TokenReleaseSchedule` (
  `date` datetime NOT NULL,
  `amount` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOAD DATA LOCAL INFILE '~/token_release_schedule.csv'
INTO TABLE TokenReleaseSchedule
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
(@date, amount)
SET
    date = STR_TO_DATE(@date, '%m/%d/%Y');

-- +migrate Down
-- SQL section 'Down' is executed when this migration is rolled back    
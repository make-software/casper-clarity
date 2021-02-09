# Changelog

All notable changes to casper-client-sdk.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.18]

### Added

- Partial support for the Contract object under StoredValue.

### Fixed

- Deploy's body hash derivation.

## [1.0.17]

### Added

- Added `DeployUtils.addArgToDeploy(deploy: Deploy, name: string, value: CLValue)` to be able to modify Deploy's session arguments. It creates a new deploy instance. Can not be used on signed deploys.

### Changed

- Default `gasPrice` changed from `10` to `1`.
- Casper balances checks return `BigNumber` now.

## [1.0.15]

### Added

- Started using CHANGELOG.md.

### Changed

- Changed CLValue's `value` to `value()` and `remainder` to `remainder()`.

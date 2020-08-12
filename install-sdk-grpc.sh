#!/usr/bin/env sh

set -e

dir=$(dirname $0)

# Whenever we call `npm install` on the `ui` or the `server` it seems to cause the `sdk` to get the latest
# version of `casperlabs-grpc` from npm, which can be stale. It reverts any previous local bindings.
# Don't want to make it permanently bound against the local grpc module since it's a package to be published.

cd $dir/sdk && rm -rf node_modules/casperlabs-grpc && npm install --no-save ../grpc && cd -

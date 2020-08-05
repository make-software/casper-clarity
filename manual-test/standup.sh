#!/usr/bin/env bash

export CL_VERSION=latest
export AUTH_MOCK_ENABLED=true

# Stand up highway network
cd ../../hack/docker || exit 1
make up-all || exit 1

# Sleep until network starts.
while ! docker logs node-0 | grep "Executing action=StartRound(" ; do echo "Waiting for network startup.  Sleeping..."; sleep 10; done

echo "Network ready."

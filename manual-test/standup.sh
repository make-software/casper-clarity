#!/usr/bin/env bash

TAG=${CL_VERSION:-"latest"}
docker pull casperlabs/execution-engine:"$TAG"
docker pull casperlabs/node:"$TAG"
docker pull casperlabs/key-generator:"$TAG"

export CL_VERSION="$TAG"
export AUTH_MOCK_ENABLED=true

# Stand up highway network
cd ../../CasperLabs/hack/docker || exit
make up-all || exit 1

# Sleep until network starts.
while ! docker logs node-0 | grep "Executing action=StartRound(" ; do echo "Waiting for network startup.  Sleeping..."; sleep 10; done

echo "Network ready."

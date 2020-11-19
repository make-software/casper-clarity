SHELL := bash

DOCKER_TAG ?= latest

# Don't delete intermediary files we touch under .make,
# which are markers for things we have done.
# https://stackoverflow.com/questions/5426934/why-this-makefile-removes-my-goal
.SECONDARY:

docker-build-all: \
	docker-build/explorer \

## Build local docker image to casperlabs/explorer:latest
docker-build/explorer: .make/docker-build/explorer

build-contracts: \
	contracts/faucet_stored.wasm

build-explorer: .make/npm/explorer

contracts/faucet_stored.wasm:
	./docker-buildenv.sh "cd smart-contract && make all"

# install all package
.make/npm/bootstrap:
	./docker-buildenv.sh "yarn"
	mkdir -p $(dir $@) && touch $@

.make/npm/explorer: \
	.make/npm/bootstrap \
	# CI=false so on Drone it won't fail on warnings (currently about href).
	./docker-buildenv.sh "\
		  cd packages/sdk && yarn run build && cd - && \
		  cd packages/ui && yarn run build && cd - && \
		  cd packages/server && yarn run build && cd - \
		"
	mkdir -p $(dir $@) && touch $@

.make/docker-build/explorer: \
		Dockerfile \
		build-explorer \
		build-contracts
	docker build -t casperlabs/explorer:$(DOCKER_TAG) .
	mkdir -p $(dir $@) && touch $@

clean:
	./docker-buildenv.sh "\
		lerna clean -y && \
		rm -rf node_modules && \
		lerna run clean && \
		rm -rf .make \
	"

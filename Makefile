SHELL := bash

DOCKER_TAG ?= latest

# Don't delete intermediary files we touch under .make,
# which are markers for things we have done.
# https://stackoverflow.com/questions/5426934/why-this-makefile-removes-my-goal
.SECONDARY:

docker-build-all: \
	docker-build/explorer \
	docker-build/grpcwebproxy

## Build local docker image to casperlabs/explorer:latest
docker-build/explorer: .make/docker-build/explorer
docker-build/grpcwebproxy: .make/docker-build/grpcwebproxy

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
	.make/protoc/explorer \
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

# Generate UI client code from Protobuf.
# Installed via `npm install ts-protoc-gen --no-bin-links --save-dev`
.make/protoc/explorer: \
		.make/npm/bootstrap \
		$(PROTO_SRC)
	$(eval DIR_IN = ./protobuf)
	$(eval DIR_OUT = ./packages/grpc)
	rm -rf $(DIR_OUT)/google
	rm -rf $(DIR_OUT)/io
	# First the pure data packages, so it doesn't create empty _pb_service.d.ts files.
	# Then the service we'll invoke.
	./docker-buildenv.sh "\
		protoc \
				-I=$(DIR_IN) \
			--plugin=protoc-gen-ts=./node_modules/ts-protoc-gen/bin/protoc-gen-ts \
			--js_out=import_style=commonjs,binary:$(DIR_OUT) \
			--ts_out=service=false:$(DIR_OUT) \
			$(DIR_IN)/google/protobuf/empty.proto \
			$(DIR_IN)/io/casperlabs/casper/consensus/consensus.proto \
			$(DIR_IN)/io/casperlabs/casper/consensus/info.proto \
			$(DIR_IN)/io/casperlabs/casper/consensus/state.proto \
			$(DIR_IN)/io/casperlabs/comm/discovery/node.proto ; \
		protoc \
				-I=$(DIR_IN) \
			--plugin=protoc-gen-ts=./node_modules/ts-protoc-gen/bin/protoc-gen-ts \
			--js_out=import_style=commonjs,binary:$(DIR_OUT) \
			--ts_out=service=true:$(DIR_OUT) \
			$(DIR_IN)/io/casperlabs/node/api/casper.proto \
			$(DIR_IN)/io/casperlabs/node/api/diagnostics.proto ; \
		"
	# Annotations were only required for the REST gateway. Remove them from Typescript.
	for f in $(DIR_OUT)/io/casperlabs/node/api/casper_pb* ; do \
		sed -n '/google_api_annotations_pb/!p' $$f > $$f.tmp ; \
		mv $$f.tmp $$f ; \
	done
	mkdir -p $(dir $@) && touch $@

.make/docker-build/grpcwebproxy: grpcwebproxy/Dockerfile
	cd grpcwebproxy && docker build -t casperlabs/grpcwebproxy:$(DOCKER_TAG) .
	mkdir -p $(dir $@) && touch $@


clean:
	./docker-buildenv.sh "\
		lerna clean -y && \
		rm -rf node_modules && \
		lerna run clean && \
		rm -rf .make \
	"

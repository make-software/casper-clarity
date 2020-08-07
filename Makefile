SHELL := bash

# Don't delete intermediary files we touch under .make,
# which are markers for things we have done.
# https://stackoverflow.com/questions/5426934/why-this-makefile-removes-my-goal
.SECONDARY:

## Build local docker image to casperlabs/explorer:latest
docker-build/clarity: .make/docker-build/clarity

build-contracts: \
	contracts/faucet_stored.wasm

build-clarity: .make/npm/clarity

contracts/faucet_stored.wasm:
	cd smart-contract && make all && cd -

# install all package and establish the dependencies of packages
.make/npm/bootstrap:
	./docker-buildenv.sh "yarn run bootstrap"
	mkdir -p $(dir $@) && touch $@

.make/npm/clarity: \
	.make/npm/bootstrap \
	.make/protoc/clarity \
	build-contracts \
	# CI=false so on Drone it won't fail on warnings (currently about href).
	./docker-buildenv.sh "yarn run build"
	mkdir -p $(dir $@) && touch $@

.make/docker-build/clarity: \
		Dockerfile \
		build-clarity
	docker build -t casperlabs/clarity:latest .
	mkdir -p $(dir $@) && touch $@

# Generate UI client code from Protobuf.
# Installed via `npm install ts-protoc-gen --no-bin-links --save-dev`
.make/protoc/clarity: \
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

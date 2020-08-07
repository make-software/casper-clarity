.make/install/protoc:
	if [ -z "$$(which protoc)" ]; then \
		curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.6.1/protoc-3.6.1-linux-x86_64.zip ; \
		unzip protoc-3.6.1-linux-x86n_64.zip -d protoc ; \
		mv protoc/bin/* /usr/local/bin/ ; \
		mv protoc/include/* /usr/local/include/ ; \
		chmod +x /usr/local/bin/protoc ; \
		rm -rf protoc* ; \
	fi
	mkdir -p $(dir $@) && touch $

# Generate UI client code from Protobuf.
# Installed via `npm install ts-protoc-gen --no-bin-links --save-dev`
.make/protoc/explorer: \
		./node_modules/ts-protoc-gen/bin/protoc-gen-ts \
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

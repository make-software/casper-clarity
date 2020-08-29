RUST_TOOLCHAIN := $(shell cat rust-toolchain)

prepare:
	rustup toolchain install --no-self-update $(RUST_TOOLCHAIN)
	rustup target add --toolchain $(RUST_TOOLCHAIN) wasm32-unknown-unknown

build-contracts:
	cargo build --release -p faucet-stored --target wasm32-unknown-unknown

clean:
	cargo clean

copy-wasm-file-to-clarity:
	mkdir -p ../contracts
	cp target/wasm32-unknown-unknown/release/faucet_stored.wasm ../contracts

all: \
	build-contracts \
	copy-wasm-file-to-clarity


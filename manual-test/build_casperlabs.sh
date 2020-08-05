#!/usr/bin/env bash

# build docker images to use
cd ../.. || exit 1
make docker-build-all

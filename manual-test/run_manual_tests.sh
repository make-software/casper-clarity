#!/usr/bin/env bash

# We are buffering output and suppressing all but tests if they exit cleanly.

output_and_exit() {
  echo "$output"
  exit 1
}

echo "Running CasperLabs builds..."
output=$(./build_casperlabs.sh 2>&1) || output_and_exit

echo "Standing up network..."
output=$(./standup.sh 2>&1) || output_and_exit

echo "Running Tests..."
pipenv sync
pipenv run pytest tests

echo "Tearing down..."
output=$(./teardown.sh 2>&1) || output_and_exit

echo "Complete"

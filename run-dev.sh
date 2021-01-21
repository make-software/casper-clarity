# Build Clarity
yarn install &&         # Install Clarity dependencies
yarn build &            # Build Clarity packages
build_pid=$!
wait $build_pid

# Start NCTL network
nctl-compile &&         # Compile node and prep NCTL
nctl-assets-setup &&    # Create assets for local network
nctl-start &&           # Start local 5 node network
echo "\n[NCTL] Network is live...\n"
sleep 5
# Start Event Store
cd packages/event_store &&
rm developement_sqlite.db &&
sleep 2
npm run --silent start-web-server & web_server_pid=$!
echo "\n[WEB SERVER] Starting up...\n"
sleep 2
npm run --silent start-event-handler & event_handler_pid=$!
echo "\n[EVENT HANDLER] Starting up...\n"
sleep 2

# Set process trap
trap onexit Int
function onexit() {
    kill -9 $web_server_pid
    kill -9 $event_handler_pid
    nctl-assets-teardown
}

# Start Clarity
cd ../.. &&
yarn dev 

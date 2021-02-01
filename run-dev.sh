## Work in Progress

# Build Clarity
yarn install &> /dev/null &         # Install Clarity dependencies
install_pid=$!
echo "[YARN] Installing dependencies..."
wait $install_pid
yarn build &> /dev/null &            # Build Clarity packages
build_pid=$!
echo "[YARN] Building packages..."
wait $build_pid

# Start NCTL network
nctl-compile &> /dev/null &&         # Compile node and prep NCTL
nctl-assets-setup &> /dev/null &&    # Create assets for local network
nctl-start &> /dev/null &
nctl_pid=$!                          # Start local 5 node network
echo "[NCTL] Network is live..."
wait $nctl_pid

# Start Event Store
cd packages/event_store &&
rm developement_sqlite.db &&
sleep 2
npm run start-web-server &> /dev/null &
web_server_pid=$!
echo "[WEB SERVER] Starting up..."
sleep 2
npm run start-event-handler &> /dev/null &
event_handler_pid=$!
echo "[EVENT HANDLER] Starting up..."
sleep 2

# Set process trap
trap onexit Int
function onexit() {
    kill -9 $web_server_pid
    kill -9 $event_handler_pid
    nctl-assets-teardown
}

# Start Clarity
cd ../..
echo "[YARN] Starting Clarity..."
sleep 20
yarn dev &> /dev/null 

# Manual Testing

This directory holds tests of the Clarity into the network with `CasperLabs/hack/docker` and assumes that `clarity` repo is at the same directory level as the CasperLabs repo.

 - Run `./build_casperlabs.sh` to build docker images.
 - Run `./standup.sh` to bring up 3 node network.
 - Run python tests.
 - Run `./teardown.sh` to bring down network when finished.

The `run_manual_tests.sh` will run all steps and silently buffer everything except
the pytest run, unless there is an error.  This allows a run and forget if tests take 
a longer time.

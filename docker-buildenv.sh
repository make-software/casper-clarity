#!/usr/bin/env sh

set -e

# Run a piece of script in the buildenv image but make sure the artifacts produced
# are owned by the host user rather than root.

CMD=$1
USERID=$(id -u)

if [ ! -z "${DRONE_BRANCH}" ]; then
	sh -c "$CMD"
else
	docker run --rm \
		-v ${PWD}:/CasperLabs \
		--entrypoint sh \
		casperlabs/buildenv:latest \
		-c "\
			set -ex ; \
			useradd -u ${USERID} -m builder ; \
			cp -r /root/. /home/builder/ ; \
			chown -R builder /home/builder ; \
			su -s /bin/bash -c '\
				export HOME=/home/builder ; \
				export PATH=/home/builder/.cargo/bin:\$PATH ; \
				cd /CasperLabs ; \
				${CMD}' builder"
fi

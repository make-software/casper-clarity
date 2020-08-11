import string
import random

SELENIUM_COMMAND_EXECUTOR_URL = "http://localhost:4444/wd/hub"
CLARITY_URL = "https://nginx:8443/"

import os
from pathlib import Path

THIS_DIRECTORY = Path(os.path.dirname(os.path.realpath(__file__)))
CASPERLABS_ROOT_DIRECTORY = THIS_DIRECTORY.parent.parent.parent / "CasperLabs"

HACK_DOCKER_DIRECTORY = CASPERLABS_ROOT_DIRECTORY / "hack" / "docker"
KEYS_DIRECTORY = HACK_DOCKER_DIRECTORY / "keys"
FAUCET_HASH_PATH = KEYS_DIRECTORY / "faucet-account" / "account-id-hex"


def random_string(length: int) -> str:
    return "".join(random.choice(string.ascii_lowercase) for _ in range(length))

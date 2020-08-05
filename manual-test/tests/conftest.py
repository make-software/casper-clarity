from typing import Any

import pytest
from dataclasses import dataclass

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

from .common import SELENIUM_COMMAND_EXECUTOR_URL, CLARITY_URL, FAUCET_HASH_PATH


@dataclass
class ClarityConfig:
    url: str
    selenium_driver: Any


@pytest.fixture("session")
def clarity_config():
    command_executor = SELENIUM_COMMAND_EXECUTOR_URL
    chrome_options = Options()
    prefs = {"profile.default_content_setting_values.automatic_downloads": 1}
    chrome_options.add_experimental_option("prefs", prefs)
    selenium_driver = webdriver.Remote(command_executor=command_executor,
                                       desired_capabilities=DesiredCapabilities.CHROME,
                                       options=chrome_options)
    selenium_driver.implicitly_wait(30)
    config = ClarityConfig(CLARITY_URL, selenium_driver)

    # Make sure Clarity is up before letting other test run.
    selenium_driver.get(config.url)
    assert selenium_driver.title == "CasperLabs Clarity - Home"

    return config


@pytest.fixture("session")
def faucet_public_key_hash():
    with open(FAUCET_HASH_PATH, "rb") as f:
        faucet_hash = f.read().strip()
    return faucet_hash.decode("utf-8")

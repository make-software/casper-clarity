import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.wait import WebDriverWait

from .common import random_string

REQUEST_TOKEN_WAIT = 500


def test_create_account_key(clarity_config, faucet_public_key_hash):
    """
    Feature file: clarity.feature
    Scenario: User can create/delete account key and request tokens
    """
    clarity_host = clarity_config.url
    driver = clarity_config.selenium_driver
    driver.get(clarity_host)
    driver.set_window_size(1280, 800)

    # We are using Mock Auth0 Service
    sign_in_button = driver.find_element(By.LINK_TEXT, "Sign In")
    sign_in_button.click()

    # create account key
    account_name = create_account(driver)
    another_account_name = create_account(driver)

    request_token(driver, account_name)

    # There should be 2 deploys sent by faucet account, one for init stored version contract
    # The other is calling stored version faucet to do the real faucet
    trs = find_deploys(driver, faucet_public_key_hash)
    assert (
            len(trs) == 2
    )

    # There should be 3 deploys, 2 for previous faucet.
    request_token(driver, another_account_name)
    trs = find_deploys(driver, faucet_public_key_hash)
    assert (
            len(trs) == 3
    )

    remove_account(driver, account_name)
    remove_account(driver, another_account_name)


def remove_account(driver, account_name):
    """
    Remove account by account_name
    :param driver:
    :param account_name: the account name to remove
    :return:
    """
    driver.find_element(By.LINK_TEXT, "Account Keys").click()
    # Remove the created account
    remove_button = driver.find_element(
        By.XPATH, f"//td[contains(., '{account_name}')]/ancestor::tr/td/button"
    )
    remove_button.click()
    driver.switch_to.alert.accept()
    # Verify we have deleted the account
    assert (
            len(driver.find_elements(By.XPATH, f"//td[contains(., '{account_name}')]")) == 0
    )


def find_deploys(driver, public_key):
    """
    Get deploys item for public_key
    :param driver:
    :param public_key:
    :return:
    """
    driver.find_element(By.LINK_TEXT, "Deploys").click()
    driver.find_element(By.CSS_SELECTOR, ".controller-button").click()
    driver.find_element(By.CSS_SELECTOR, "input.form-control").send_keys(public_key)
    driver.find_element(By.CSS_SELECTOR, ".btn").click()
    return driver.find_elements(By.CSS_SELECTOR, "tbody>tr")


def request_token(driver, account_name):
    """
    Request token for the account specified by account_name
    :param driver:
    :param account_name:
    :return:
    """
    driver.find_element(By.LINK_TEXT, "Faucet").click()
    select = Select(driver.find_element(By.ID, "id-account-name"))
    select.select_by_visible_text(account_name)
    driver.find_element(By.XPATH, "//button[contains(., 'Request tokens')]").click()
    time.sleep(2)
    WebDriverWait(driver, REQUEST_TOKEN_WAIT).until_not(
        lambda d: d.find_element(By.CSS_SELECTOR, "table tr:first-child td:last-child")
        .get_attribute("title")
        .startswith("Pending")
    )
    title = driver.find_element(
        By.CSS_SELECTOR, "table tr:first-child td:last-child"
    ).get_attribute("title")
    assert title.startswith("Successfully")

    # Verify the balance of created account to be exactly 10,000,000
    driver.find_element(By.LINK_TEXT, "Account Keys").click()
    xpath_correct_balance = f"//td[contains(., '{account_name}')]/ancestor::tr/td[contains(.,'1,000,000,000')]"
    assert len(driver.find_elements(By.XPATH, xpath_correct_balance)) == 1


def create_account(driver):
    """
    helper method to create account
    :param driver:
    :return: name of the created account
    """
    driver.find_element(By.LINK_TEXT, "Account Keys").click()
    driver.find_element(By.XPATH, "//button[contains(., 'Create Account Key')]").click()
    account_name = random_string(5)
    # waiting for showing the modal of the form where to create account keys.
    time.sleep(2)
    account_name_input = driver.find_element(By.ID, "id-account-name")
    account_name_input.click()
    account_name_input.send_keys(account_name)
    driver.find_element(By.XPATH, "//button[contains(., 'Save')]").click()
    # waiting for downloading the keypairs
    time.sleep(2)
    assert (
        len(driver.find_elements(By.XPATH, f"//td[contains(., '{account_name}')]")) == 1
    )
    return account_name

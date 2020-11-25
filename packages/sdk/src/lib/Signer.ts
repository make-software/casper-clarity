/**
 * Provide methods to communicate with [CasperLabs Signer Extension](https://github.com/CasperLabs/signer).
 * Works only on browser.
 *
 * @packageDocumentation
 */

/**
 * Check whether CasperLabs Signer extension is connected
 */
export const isConnected: () => Promise<boolean | undefined> = async () => {
  const response = await window.casperlabsHelper!.isConnected();
  return response;
};

/**
 * Attempt connection to Signer
 */
export const sendConnectionRequest: () => void = () => {
  return window.casperlabsHelper!.requestConnection();
};

/**
 * Return base64 encoded public key of user current selected account.
 *
 * @throws Error if haven't connected to CasperLabs Signer browser extension.
 */
export const getSelectedPublicKeyBase64: () => Promise<
  string | undefined
> = () => {
  throwIfNotConnected();
  return window.casperlabsHelper!.getSelectedPublicKeyBase64();
};

/**
 * send base16 encoded message to plugin to sign
 *
 * @param messageBase16 the base16 encoded message that plugin received to sign
 * @param publicKeyBase64 the base64 encoded public key used to sign the deploy, if set, we will check whether it is the same as the active key for signing the message, otherwise, we won't check.
 *
 * @throws Error if haven't connected to CasperLabs Signer browser extension.
 * @throws Error if publicKeyBase64 is not the same as the key that Signer used to sign the message
 */
export const sign: (
  messageBase16: string,
  publicKeyBase64?: string
) => Promise<string> = (messageBase16: string, publicKeyBase64?: string) => {
  throwIfNotConnected();
  return window.casperlabsHelper!.sign(messageBase16, publicKeyBase64);
};

const throwIfNotConnected = () => {
  if (!isConnected()) {
    throw new Error(
      'No CasperLabs Signer browser plugin detected or it is not ready'
    );
  }
};

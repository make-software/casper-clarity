interface CasperLabsHelper {
  /**
   * Returns connection status from Signer
   */
  isConnected: () => Promise<boolean | undefined>;
  /**
   * Attempt connection to Signer
   */
  requestConnection: () => void;
  /**
   * send base16 encoded message to plugin to sign
   *
   * @param messageBase16 the base16 encoded message that plugin received to sign
   * @param publicKeyBase64 the base64 encoded public key used to sign the deploy, if set, we will check whether it is the same as the active key for signing the message, otherwise, we won't check.
   */
  sign: (messageBase16: string, publicKeyBase64?: string) => Promise<string>;
  // returns base64 encoded public key of user current selected account.
  getSelectedPublicKeyBase64: () => Promise<string | undefined>;
}

interface Window {
  casperlabsHelper?: CasperLabsHelper;
}

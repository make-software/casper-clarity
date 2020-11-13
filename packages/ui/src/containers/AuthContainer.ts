import { computed, observable } from 'mobx';
import { saveAs } from 'file-saver';
import ErrorContainer from './ErrorContainer';
import { CleanableFormData } from './FormData';
import AuthService from '../services/AuthService';
import {
  decodeBase64,
  encodeBase16,
  encodeBase64,
  Keys,
  CasperServiceByJsonRPC,
  BalanceServiceByJsonRPC
} from 'casperlabs-sdk';
import ObservableValueMap from '../lib/ObservableValueMap';
import { FieldState } from 'formstate';
import { AsymmetricKey } from 'casperlabs-sdk/dist/lib/Keys';

// https://www.npmjs.com/package/tweetnacl-ts#signatures
// https://tweetnacl.js.org/#/sign

type AccountB64 = string;

export const publicKeyHashForEd25519 = (publicKeyBase64: string) => {
  return Keys.Ed25519.publicKeyHash(decodeBase64(publicKeyBase64));
};

export const getPublicKeyHash = (account: UserAccount) => {
  if (!account.sigAlgorithm || account.sigAlgorithm === 'ed25519') {
    return publicKeyHashForEd25519(account.publicKeyBase64);
  }
  throw new Error(`Clarity currently don't support ${account.sigAlgorithm}`);
};

export const getPublicKeyHashBase16 = (account: UserAccount) => {
  return encodeBase16(getPublicKeyHash(account));
};

export const getPublicKeyHashBase64 = (account: UserAccount) => {
  return encodeBase64(getPublicKeyHash(account));
};

export class AuthContainer {
  @observable user: User | null = null;
  @observable accounts: UserAccount[] | null = null;
  @observable private contracts: Contracts | null = null;

  // An account we are creating or importing, while we're configuring it.
  @observable accountForm:
    | NewAccountFormData
    | ImportAccountFormData
    | null = null;
  @observable selectedAccount: UserAccount | null = null;

  // Balance for each account hash.
  @observable balances = new ObservableValueMap<AccountB64, AccountBalance>();

  // How often to query balances. Lots of state queries to get one.
  balanceTtl = 5 * 60 * 1000;

  constructor(
    private errors: ErrorContainer,
    private authService: AuthService,
    private casperService: CasperServiceByJsonRPC,
    private balanceService: BalanceServiceByJsonRPC
  ) {
    this.init();
  }

  private async init() {
    if (window.location.search.includes('code=')) {
      const { appState } = await this.authService.handleRedirectCallback();
      const url =
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname;
      window.history.replaceState({}, document.title, url);
    }

    this.fetchUser();
  }

  async login() {
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      await this.authService.login();
    }
    this.fetchUser();
  }

  async logout() {
    this.user = null;
    this.accounts = null;
    this.contracts = null;
    this.balances.clear();
    sessionStorage.clear();
    this.authService.logout();
  }

  private async fetchUser() {
    const isAuthenticated = await this.authService.isAuthenticated();
    this.user = isAuthenticated ? await this.authService.getUser() : null;
    this.refreshAccounts();
  }

  async refreshAccounts() {
    if (this.user != null) {
      const meta: UserMetadata = await this.authService.getUserMetadata(
        this.user.sub
      );
      this.accounts = meta.accounts || [];
      this.contracts = meta.contracts || { vestingContracts: [] };
    }
  }

  async refreshBalances(force?: boolean) {
    const now = new Date();
    let latestBlockHash: string | null = null;

    for (let account of this.accounts || []) {
      const publicKeyHashBase64 = getPublicKeyHashBase64(account);
      const balance = this.balances.get(publicKeyHashBase64);

      const needsUpdate =
        force ||
        balance.value == null ||
        now.getTime() - balance.value.checkedAt.getTime() > this.balanceTtl;

      if (needsUpdate) {
        if (latestBlockHash == null) {
          const latestBlock = await this.casperService.getLatestBlockInfo();
          latestBlockHash = latestBlock.block?.hash
            ? latestBlock.block.hash
            : null;
        }

        if (latestBlockHash !== null) {
          const latestAccountBalance = await this.balanceService.getAccountBalance(
            latestBlockHash,
            encodeBase16(getPublicKeyHash(account))
          );

          this.balances.set(publicKeyHashBase64, {
            checkedAt: now,
            blockHashBase16: latestBlockHash,
            balance: latestAccountBalance
          });
        }
      }
    }
  }

  // Open a new account creation form.
  configureNewAccount() {
    this.accountForm = new NewAccountFormData(this.accounts!);
  }

  // Open a form for importing account.
  configureImportAccount() {
    this.accountForm = new ImportAccountFormData(this.accounts!);
  }

  async createAccount(): Promise<boolean> {
    let form = this.accountForm!;
    if (form instanceof NewAccountFormData && form.clean()) {
      // Save the private and public keys to disk.
      saveToFile(
        form.getKeys.exportPrivateKeyInPem(),
        `${form.name.$}_secret_key.pem`
      );
      saveToFile(
        form.getKeys.exportPublicKeyInPem(),
        `${form.name.$}_public_key.pem`
      );
      const publicKeyBase16 = encodeBase16(
        decodeBase64(form.publicKeyBase64.$!)
      );
      saveToFile('01' + publicKeyBase16, `${form.name.$}_public_key_hex`);
      // Add the public key to the accounts and save it to Auth0.
      await this.addAccount({
        name: form.name.$!,
        publicKeyBase64: form.publicKeyBase64.$!,
        sigAlgorithm: 'ed25519'
      });
      return true;
    } else {
      return false;
    }
  }

  async importAccount(): Promise<boolean> {
    let form = this.accountForm!;
    if (form instanceof ImportAccountFormData && form.clean()) {
      await this.addAccount({
        name: form.name.$,
        publicKeyBase64: form.publicKeyBase64.$,
        sigAlgorithm: 'ed25519'
      });
      return true;
    } else {
      return false;
    }
  }

  async deleteAccount(name: String) {
    if (window.confirm(`Are you sure you want to delete account '${name}'?`)) {
      this.accounts = this.accounts!.filter(x => x.name !== name);
      await this.errors.capture(this.saveMetaData());
    }
  }

  private async addAccount(account: UserAccount) {
    this.accounts!.push(account);
    await this.errors.capture(this.saveMetaData());
  }

  public getContracts<K extends keyof Contracts>(key: K): Contracts[K] {
    if (!this.contracts) {
      this.contracts = {};
    }
    return this.contracts[key];
  }

  public async updateContracts<K extends keyof Contracts>(
    key: K,
    f: (oldState: Contracts[K]) => Contracts[K]
  ) {
    if (!this.contracts) {
      this.contracts = {};
    }
    let oldState = this.contracts[key];
    this.contracts[key] = f(oldState);
    await this.errors.capture(this.saveMetaData());
  }

  private async saveMetaData() {
    await this.authService.updateUserMetadata(this.user!.sub, {
      accounts: this.accounts || undefined,
      contracts: this.contracts || undefined
    });
  }

  selectAccountByName(name: string) {
    this.selectedAccount = this.accounts!.find(x => x.name === name) || null;
  }
}

function saveToFile(content: string, filename: string) {
  let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
}

class AccountFormData extends CleanableFormData {
  name: FieldState<string> = new FieldState<string>('');
  publicKeyBase64: FieldState<string> = new FieldState('');

  constructor(private accounts: UserAccount[]) {
    super();
  }

  protected check() {
    let name = this.name.$;
    if (name === '') return 'Name cannot be empty!';

    if (name.indexOf(' ') > -1)
      return 'The account name should not include spaces.';

    if (this.accounts.some(x => x.name === name))
      return `An account with name '${name}' already exists.`;

    if (this.accounts.some(x => x.publicKeyBase64 === this.publicKeyBase64.$))
      return 'An account with this public key already exists.';

    return null;
  }
}

export class NewAccountFormData extends AccountFormData {
  @observable privateKeyBase64: string = '';
  private keys: AsymmetricKey;

  constructor(accounts: UserAccount[]) {
    super(accounts);
    // Generate key pair and assign to public and private keys.
    this.keys = Keys.Ed25519.new();
    this.publicKeyBase64 = new FieldState<string>(
      encodeBase64(this.keys.publicKey)
    );
    this.privateKeyBase64 = encodeBase64(this.keys.privateKey);
  }

  get getKeys() {
    return this.keys;
  }
}

export class ImportAccountFormData extends AccountFormData {
  @observable file: File | null = null;
  @observable fileContent: string | null = null;
  @observable key: ByteArray | null = null;

  handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      this.file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(this.file);
      reader.onload = e => {
        this.fileContent = reader.result as string;
        this.error = this.checkFileContent();
        if (this.error === null) {
          this.name.onChange(this.fileName!.split('.')[0]);
          this.publicKeyBase64.onChange(encodeBase64(this.key!));
        }
      };
    }
  }

  @computed
  get fileName(): string | null {
    if (this.file) {
      return this.file.name;
    }
    return null;
  }

  checkFileContent() {
    if (!this.fileContent) {
      return 'The content of imported file cannot be empty!';
    }
    try {
      this.key = Keys.Ed25519.parsePublicKey(
        Keys.Ed25519.readBase64WithPEM(this.fileContent)
      );
    } catch (e) {
      return e.message;
    }
    return null;
  }

  protected check() {
    let errorMsg = this.checkFileContent();
    if (errorMsg !== null) {
      return errorMsg;
    }
    return super.check();
  }
}

export default AuthContainer;

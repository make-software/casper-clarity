import { jsonArrayMember, jsonMember, jsonObject } from 'typedjson';

@jsonObject
class NamedKey {
  @jsonMember({ constructor: String })
  name: string;
  @jsonMember({ constructor: String })
  key: string;
}

@jsonObject
class AssociatedKey {
  @jsonMember({ name: 'account_hash', constructor: String })
  accountHash: string;
  @jsonMember({ constructor: Number })
  weight: number;
}

@jsonObject
class ActionThresholds {
  @jsonMember({ constructor: Number })
  deployment: number;

  @jsonMember({ name: 'key_management', constructor: Number })
  keyManagement: number;
}

/**
 * Structure representing a user's account, stored in global state.
 */
@jsonObject
class SAccount {
  get accountHash(): string {
    return this._accountHash;
  }

  @jsonMember({ name: 'account_hash', constructor: String })
  private _accountHash: string;
  @jsonArrayMember(NamedKey, { name: 'named_keys' })
  namedKeys: NamedKey[];
  @jsonMember({ name: 'main_purse', constructor: String })
  mainPurse: string;
  @jsonArrayMember(AssociatedKey, { name: 'associated_keys' })
  associatedKeys: AssociatedKey[];
  @jsonMember({ name: 'action_thresholds', constructor: ActionThresholds })
  actionThresholds: ActionThresholds;

  public getAccountHash() {}
}

@jsonObject
export class STransfer {
  // Deploy that created the transfer
  @jsonMember({ name: 'deploy_hash', constructor: String })
  deployHash: string;

  // Account from which transfer was executed
  @jsonMember({ constructor: String })
  from: string;

  // Source purse
  @jsonMember({ constructor: String })
  source: string;

  // Target purse
  @jsonMember({ constructor: String })
  target: string;

  // Transfer amount
  @jsonMember({ constructor: String })
  amount: string;

  // Gas
  @jsonMember({ constructor: String })
  gas: string;

  // User-defined id
  @jsonMember({ constructor: String, preserveNull: true })
  id: Number | null;
}

@jsonObject
export class SDeployInfo {
  // The relevant Deploy.
  @jsonMember({ name: 'deploy_hash', constructor: String })
  deployHash: string;

  // Transfers performed by the Deploy.
  @jsonArrayMember(String)
  transfers: String[];

  // Account identifier of the creator of the Deploy.
  @jsonMember({ constructor: String })
  from: string;
  // Source purse used for payment of the Deploy.
  @jsonMember({ constructor: String })
  source: string;

  // Gas cost of executing the Deploy.
  @jsonMember({ constructor: String })
  gas: string;
}

/**
 * Info about a seigniorage allocation for a validator
 */
@jsonObject
class Validator {
  // Validator's public key
  @jsonMember({ name: 'validator_public_key', constructor: String })
  validatorPublicKey: string;

  // Allocated amount
  @jsonMember({ constructor: String })
  amount: string;
}

/**
 * Info about a seigniorage allocation for a delegator
 */
@jsonObject
class Delegator {
  // Delegator's public key
  @jsonMember({ name: 'delegator_public_key', constructor: String })
  delegatorPublicKey: string;

  // Validator's public key
  @jsonMember({ name: 'validator_public_key', constructor: String })
  validatorPublicKey: string;

  // Allocated amount
  @jsonMember({ constructor: String })
  amount: string;
}

/**
 * Information about a seigniorage allocation
 */
@jsonObject
export class SeigniorageAllocation {
  @jsonMember({ constructor: Validator })
  Validator?: Validator;

  @jsonMember({ constructor: Delegator })
  Delegator?: Delegator;
}

/**
 * Auction metdata.  Intended to be recorded at each era.
 */
@jsonObject
export class EraInfo {
  @jsonArrayMember(SeigniorageAllocation, { name: 'seigniorage_allocations' })
  seigniorageAllocations: SeigniorageAllocation[];
}

@jsonObject
export class StoredValue {
  //todo SCLValue;

  // An account
  @jsonMember({ constructor: SAccount })
  Account?: SAccount;

  // A contract's Wasm
  @jsonMember({ constructor: String })
  ContractWASM?: string;

  // Methods and type signatures supported by a contract
  @jsonMember({ constructor: String })
  Contract?: string;

  // A contract definition, metadata, and security container
  @jsonMember({ constructor: String })
  ContractPackage?: string;

  //A record of a transfer
  @jsonMember({ constructor: STransfer })
  Transfer?: STransfer;

  // A record of a deploy
  @jsonMember({ constructor: SDeployInfo })
  DeployInfo?: SDeployInfo;

  @jsonMember({ constructor: EraInfo })
  EraInfo?: EraInfo;
}

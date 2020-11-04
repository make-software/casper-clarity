import { RuntimeArgs, CLValue } from 'casperlabs-sdk';

export class CallFaucet {
  public static args(accountHash: Uint8Array, amount: bigint): RuntimeArgs {
    return RuntimeArgs.fromMap({
      target: CLValue.fromBytes(accountHash),
      amount: CLValue.fromU512(amount.toString())
    });
  }
}

export class StoredFaucet {
  public static args(): RuntimeArgs {
    return RuntimeArgs.fromMap({});
  }
}

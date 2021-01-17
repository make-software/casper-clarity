import { RuntimeArgs, CLValue } from 'casper-client-sdk';

export class CallFaucet {
  public static args(accountHash: Uint8Array, amount: bigint): RuntimeArgs {
    return RuntimeArgs.fromMap({
      target: CLValue.byteArray(accountHash),
      amount: CLValue.u512(amount.toString())
    });
  }
}

export class StoredFaucet {
  public static args(): RuntimeArgs {
    return RuntimeArgs.fromMap({});
  }
}

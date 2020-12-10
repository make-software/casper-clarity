/**
 * Implements a collection of runtime arguments.
 */
import { toBytesString, toBytesVecT } from './byterepr';
import { CLValue, ToBytes } from './CLValue';
import { concat } from '@ethersproject/bytes';

type ByteArray = Uint8Array;

export class NamedArg implements ToBytes {
  constructor(public name: string, public value: CLValue) {}

  public toBytes(): ByteArray {
    return concat([toBytesString(this.name), this.value.toBytes()]);
  }
}

export class RuntimeArgs implements ToBytes {
  constructor(private args: NamedArg[]) {}

  public static fromMap(args: Record<string, CLValue>) {
    const vec = Object.keys(args).map(a => {
      return new NamedArg(a, args[a]);
    });
    return new RuntimeArgs(vec);
  }

  public insert(key: string, value: CLValue) {
    this.args.push(new NamedArg(key, value));
  }

  public toBytes() {
    return toBytesVecT(this.args);
  }
}

/**
 * Implements a collection of runtime arguments.
 */
import { toBytesString, toBytesVecT } from './byterepr';
import { CLValue, ToBytes } from './CLValue';
import { concat } from '@ethersproject/bytes';

export class NamedArg implements ToBytes {
  constructor(public name: string, public value: CLValue) {}

  public toBytes(): ByteArray {
    return concat([toBytesString(this.name), this.value.toBytes()]);
  }
}

export class RuntimeArgs implements ToBytes {
  constructor(public args: Record<string, CLValue>) {}

  public static fromMap(args: Record<string, CLValue>) {
    return new RuntimeArgs(args);
  }

  public static fromNamedArgs(namedArgs: NamedArg[]) {
    const args = namedArgs.reduce<Record<string, CLValue>>((pre, cur) => {
      pre[cur.name] = cur.value;
      return pre;
    }, {});
    return RuntimeArgs.fromMap(args);
  }

  public insert(key: string, value: CLValue) {
    this.args[key] = value;
  }

  public toBytes() {
    const vec = Object.keys(this.args).map(a => {
      return new NamedArg(a, this.args[a]);
    });

    return toBytesVecT(vec);
  }
}

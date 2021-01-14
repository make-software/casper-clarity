/**
 * Implements a collection of runtime arguments.
 */
import { toBytesString, toBytesVecT } from './byterepr';
import { CLValue, Result, StringValue, ToBytes, U32 } from './CLValue';
import { concat } from '@ethersproject/bytes';

export class NamedArg implements ToBytes {
  constructor(public name: string, public value: CLValue) {
  }

  public toBytes(): ByteArray {
    return concat([toBytesString(this.name), this.value.toBytes()]);
  }

  public static fromBytes(bytes: Uint8Array): Result<NamedArg> {
    const nameRes = StringValue.fromBytes(bytes);
    if (nameRes.hasError()) {
      return Result.Err(nameRes.error);
    }
    const clValueRes = CLValue.fromBytes(nameRes.remainder);
    if (clValueRes.hasError()) {
      return Result.Err(clValueRes.error);
    }
    return Result.Ok(new NamedArg(nameRes.value.str, clValueRes.value), clValueRes.remainder);
  }
}

export class RuntimeArgs implements ToBytes {
  constructor(public args: Record<string, CLValue>) {
  }

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

  public static fromBytes(bytes: Uint8Array): Result<RuntimeArgs> {
    const sizeRes = U32.fromBytes(bytes);
    if (sizeRes.hasError()) {
      return Result.Err(sizeRes.error);
    }
    const size = sizeRes.value.value as number;
    let remainBytes = sizeRes.remainder;
    const res: NamedArg[] = [];
    for (let i = 0; i < size; i++) {
      const namedArgRes = NamedArg.fromBytes(remainBytes);
      if (namedArgRes.hasError()) {
        return Result.Err(namedArgRes.error);
      }
      res.push(namedArgRes.value);
      remainBytes = namedArgRes.remainder;
    }
    return Result.Ok(RuntimeArgs.fromNamedArgs(res), remainBytes);
  }
}

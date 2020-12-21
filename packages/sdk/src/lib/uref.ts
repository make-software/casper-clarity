import { concat } from '@ethersproject/bytes';
import {
  BytesDeserializableStatic,
  CLType,
  CLTypedAndToBytes,
  CLTypeHelper,
  FromBytesError,
  Result,
  staticImplements
} from './CLValue';
import { decodeBase16 } from './Conversions';

const FORMATTED_STRING_PREFIX: string = 'uref-';
/**
 * Length of [[URef]] address field.
 * @internal
 */
const UREF_ADDR_LENGTH = 32;
/**
 * Length of [[ACCESS_RIGHT]] field.
 * @internal
 */
const ACCESS_RIGHT_LENGTH = 1;

const UREF_BYTES_LENGTH = UREF_ADDR_LENGTH + ACCESS_RIGHT_LENGTH;

export enum AccessRights {
  // No permissions
  None = 0b0,
  // Permission to read the value under the associated [[URef]].
  READ = 0b001,
  // Permission to write a value under the associated [[URef]].
  WRITE = 0b010,
  // Permission to add to the value under the associated [[URef]].
  ADD = 0b100,
  // Permission to read or write the value under the associated [[URef]].
  READ_WRITE = AccessRights.READ | AccessRights.WRITE,
  // Permission to read or add to the value under the associated [[URef]].
  READ_ADD = AccessRights.READ | AccessRights.ADD,
  // Permission to add to, or write the value under the associated [[URef]].
  ADD_WRITE = AccessRights.ADD | AccessRights.WRITE,
  // Permission to read, add to, or write the value under the associated [[URef]].
  READ_ADD_WRITE = AccessRights.READ | AccessRights.ADD | AccessRights.WRITE
}
type ByteArray = Uint8Array;

@staticImplements<BytesDeserializableStatic<URef>>()
export class URef extends CLTypedAndToBytes {
  /**
   * Constructs new instance of URef.
   * @param uRefAddr Bytes representing address of the URef.
   * @param accessRights Access rights flag. Use [[AccessRights.NONE]] to indicate no permissions.
   */
  constructor(public uRefAddr: Uint8Array, public accessRights: AccessRights) {
    super();
    if (this.uRefAddr.byteLength !== 32) {
      throw new Error('The length of URefAddr should be 32');
    }
  }

  /**
   * Parses a casper-client supported string formatted argument into a `URef`.
   */
  public static fromFormattedStr(input: string) {
    if (!input.startsWith(FORMATTED_STRING_PREFIX)) {
      throw new Error("prefix is not 'uref-'");
    }
    const parts = input.substring(FORMATTED_STRING_PREFIX.length).split('-', 2);
    if (parts.length !== 2) {
      throw new Error('no access rights as suffix');
    }

    const addr = decodeBase16(parts[0]);
    const accessRight = parseInt(parts[1], 8) as AccessRights;

    return new URef(addr, accessRight);
  }

  /**
   * Serializes the URef into an array of bytes that represents it in the Casper serialization
   * format.
   */
  public toBytes(): ByteArray {
    return concat([this.uRefAddr, Uint8Array.from([this.accessRights])]);
  }

  public clType(): CLType {
    return CLTypeHelper.uRef();
  }

  public static fromBytes(bytes: ByteArray): Result<URef> {
    if (bytes.length < UREF_BYTES_LENGTH) {
      return Result.Err<URef>(FromBytesError.EarlyEndOfStream);
    }

    const urefBytes = bytes.subarray(0, UREF_ADDR_LENGTH);
    const accessRights = bytes[UREF_BYTES_LENGTH - 1];
    const uref = new URef(urefBytes, accessRights);
    return Result.Ok(uref, bytes.subarray(UREF_BYTES_LENGTH));
  }
}

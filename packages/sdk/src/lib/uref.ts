import { concat } from '@ethersproject/bytes';
import { CLType, CLTypedAndToBytes, CLTypeHelper } from './CLValue';

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
   * Serializes the URef into an array of bytes that represents it in the Casper serialization
   * format.
   */
  toBytes(): ByteArray {
    return concat([this.uRefAddr, Uint8Array.from([this.accessRights])]);
  }

  clType(): CLType {
    return CLTypeHelper.uRef();
  }
}

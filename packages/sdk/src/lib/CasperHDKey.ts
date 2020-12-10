import { HDKeyT } from 'ethereum-cryptography/pure/hdkey';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { sha256 } from 'ethereum-cryptography/sha256';
import { ByteArray } from '../index';
import { Secp256K1 } from './Keys';

export class CasperHDKey {
  // todo select a lucky number and register in https://github.com/satoshilabs/slips/blob/master/slip-0044.md
  private readonly bip44Index = 748;

  constructor(private hdKey: HDKeyT) {}

  // see https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#path-levels
  private bip44Path(index: number): string {
    return [
      'm',
      `44'`, // bip 44
      `${this.bip44Index}'`, // coin index
      `0'`, // wallet
      `0`, // external
      `${index}` // child account index
    ].join('/');
  }

  public static fromMasterSeed(seed: ByteArray): CasperHDKey {
    return new CasperHDKey(HDKey.fromMasterSeed(Buffer.from(seed)));
  }

  public publicKey() {
    return this.hdKey.publicKey;
  }

  public privateKey() {
    return this.hdKey.privateKey;
  }

  public privateExtendedKey() {
    return this.hdKey.privateExtendedKey;
  }

  public publicExtendedKey() {
    return this.hdKey.publicExtendedKey;
  }

  public derive(path: string): Secp256K1 {
    const secpKeyPair = this.hdKey.derive(path);
    return new Secp256K1(secpKeyPair.publicKey!, secpKeyPair.privateKey!);
  }

  public deriveIndex(index: number): Secp256K1 {
    return this.derive(this.bip44Path(index));
  }

  public sign(msg: ByteArray) {
    return this.hdKey.sign(sha256(Buffer.from(msg)));
  }

  public verify(signature: ByteArray, msg: ByteArray) {
    return this.hdKey.verify(sha256(Buffer.from(msg)), Buffer.from(signature));
  }

  public toJSON() {
    return this.hdKey.toJSON();
  }
}

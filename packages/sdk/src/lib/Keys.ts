import * as fs from 'fs';
import * as nacl from 'tweetnacl-ts';
import { SignKeyPair, SignLength } from 'tweetnacl-ts';
import { decodeBase64 } from 'tweetnacl-util';
import { ByteArray, encodeBase16, encodeBase64, PublicKey } from '../index';
import { byteHash } from './Contracts';
import { ec as EC } from 'elliptic';
import * as secp256k1 from 'ethereum-cryptography/secp256k1';
import KeyEncoder from 'key-encoder';
import { sha256 } from 'ethereum-cryptography/sha256';

const keyEncoder = new KeyEncoder('secp256k1');
const ec = new EC('secp256k1');

const ED25519_PEM_SECRET_KEY_TAG = 'PRIVATE KEY';
const ED25519_PEM_PUBLIC_KEY_TAG = 'PUBLIC KEY';

export enum SignatureAlgorithm {
  Ed25519 = 'ed25519',
  Secp256K1 = 'secp256k1'
}

function accountHashHelper(
  signatureAlgorithm: SignatureAlgorithm,
  publicKey: ByteArray
) {
  const separator = Buffer.from([0]);
  const prefix = Buffer.concat([Buffer.from(signatureAlgorithm), separator]);

  if (publicKey.length === 0) {
    return Buffer.from([]);
  } else {
    return byteHash(Buffer.concat([prefix, Buffer.from(publicKey)]));
  }
}

/**
 * Get rid of PEM frames, skips header `-----BEGIN PUBLIC KEY-----`
 * and footer `-----END PUBLIC KEY-----`
 *
 * Example PEM:
 *
 * ```
 * -----BEGIN PUBLIC KEY-----\r\n
 * MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEj1fgdbpNbt06EY/8C+wbBXq6VvG+vCVD\r\n
 * Nl74LvVAmXfpdzCWFKbdrnIlX3EFDxkd9qpk35F/kLcqV3rDn/u3dg==\r\n
 * -----END PUBLIC KEY-----\r\n
 * ```
 *
 */
export function readBase64WithPEM(content: string): ByteArray {
  const base64 = content
    // there are two kinks of line-endings, CRLF(\r\n) and LF(\n)
    // we need handle both
    .split(/\r?\n/)
    .filter(x => !x.startsWith('---'))
    .join('')
    // remove the line-endings in the end of content
    .trim();
  return decodeBase64(base64);
}

export abstract class AsymmetricKey {
  public readonly publicKey: PublicKey;
  public readonly privateKey: ByteArray;
  public readonly signatureAlgorithm: SignatureAlgorithm;

  constructor(
    publicKey: ByteArray,
    privateKey: ByteArray,
    signatureAlgorithm: SignatureAlgorithm
  ) {
    this.publicKey = PublicKey.from(publicKey, signatureAlgorithm);
    this.privateKey = privateKey;
    this.signatureAlgorithm = signatureAlgorithm;
  }

  /**
   * Compute a unique hash from the algorithm name(Ed25519 here) and a public key, used for accounts.
   */
  public accountHash(): ByteArray {
    return this.publicKey.toAccountHash();
  }

  /**
   * Get the account hex
   */
  public accountHex(): string {
    return this.publicKey.toAccountHex();
  }

  protected toPem(tag: string, content: string) {
    // prettier-ignore
    return `-----BEGIN ${tag}-----\n` +
      `${content}\n` +
      `-----END ${tag}-----\n`;
  }

  public abstract exportPublicKeyInPem(): string;

  public abstract exportPrivateKeyInPem(): string;

  public abstract sign(msg: ByteArray): ByteArray;

  public abstract verfiy(signature: ByteArray, msg: ByteArray): boolean;
}

// Based on SignatureAlgorithm.scala
export class Ed25519 extends AsymmetricKey {
  constructor(keyPair: SignKeyPair) {
    super(keyPair.publicKey, keyPair.secretKey, SignatureAlgorithm.Ed25519);
  }

  /**
   * Generating a new key pair
   */
  public static new() {
    return new Ed25519(nacl.sign_keyPair());
  }

  static accountHex(publicKey: ByteArray): string {
    return '01' + encodeBase16(publicKey);
  }

  /**
   * Parse the key pair from publicKey file and privateKey file
   * @param publicKeyPath path of public key file
   * @param privateKeyPath path of private key file
   */
  public static parseKeyFiles(
    publicKeyPath: string,
    privateKeyPath: string
  ): AsymmetricKey {
    const publicKey = Ed25519.parsePublicKeyFile(publicKeyPath);
    const privateKey = Ed25519.parsePrivateKeyFile(privateKeyPath);
    // nacl expects that the private key will contain both.
    return new Ed25519({
      publicKey,
      secretKey: Buffer.concat([privateKey, publicKey])
    });
  }

  public static accountHash(publicKey: ByteArray): ByteArray {
    return accountHashHelper(SignatureAlgorithm.Ed25519, publicKey);
  }

  public static parseKeyPair(
    publicKey: ByteArray,
    privateKey: ByteArray
  ): AsymmetricKey {
    const publ = Ed25519.parsePublicKey(publicKey);
    const priv = Ed25519.parsePrivateKey(privateKey);
    // nacl expects that the private key will contain both.
    return new Ed25519({
      publicKey: publ,
      secretKey: Buffer.concat([priv, publ])
    });
  }

  public static parsePrivateKeyFile(path: string): ByteArray {
    return Ed25519.parsePrivateKey(Ed25519.readBase64File(path));
  }

  public static parsePublicKeyFile(path: string): ByteArray {
    return Ed25519.parsePublicKey(Ed25519.readBase64File(path));
  }

  public static parsePrivateKey(bytes: ByteArray) {
    return Ed25519.parseKey(bytes, 0, 32);
  }

  public static parsePublicKey(bytes: ByteArray) {
    return Ed25519.parseKey(bytes, 32, 64);
  }

  public static readBase64WithPEM(content: string) {
    return readBase64WithPEM(content);
  }

  /**
   * Read the Base64 content of a file, get rid of PEM frames.
   *
   * @param path the path of file to read from
   */
  private static readBase64File(path: string): ByteArray {
    const content = fs.readFileSync(path).toString();
    return Ed25519.readBase64WithPEM(content);
  }

  private static parseKey(bytes: ByteArray, from: number, to: number) {
    const len = bytes.length;
    // prettier-ignore
    const key =
      (len === 32) ? bytes :
        (len === 64) ? Buffer.from(bytes).slice(from, to) :
          (len > 32 && len < 64) ? Buffer.from(bytes).slice(len % 32) :
            null;
    if (key == null || key.length !== 32) {
      throw Error(`Unexpected key length: ${len}`);
    }
    return key;
  }

  public exportPrivateKeyInPem() {
    // prettier-ignore
    const derPrefix = Buffer.from([48, 46, 2, 1, 0, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]);
    const encoded = encodeBase64(
      Buffer.concat([
        derPrefix,
        Buffer.from(Ed25519.parsePrivateKey(this.privateKey))
      ])
    );
    return this.toPem(ED25519_PEM_SECRET_KEY_TAG, encoded);
  }

  public exportPublicKeyInPem() {
    // prettier-ignore
    const derPrefix = Buffer.from([48, 42, 48, 5, 6, 3, 43, 101, 112, 3, 33, 0]);
    const encoded = encodeBase64(
      Buffer.concat([derPrefix, Buffer.from(this.publicKey.rawPublicKey)])
    );
    return this.toPem(ED25519_PEM_PUBLIC_KEY_TAG, encoded);
  }

  sign(msg: ByteArray): ByteArray {
    return nacl.sign_detached(msg, this.privateKey);
  }

  verfiy(signature: ByteArray, msg: ByteArray) {
    return nacl.sign_detached_verify(
      msg,
      signature,
      this.publicKey.rawPublicKey
    );
  }

  static privateToPublicKey(privateKey: ByteArray) {
    if (privateKey.length === SignLength.SecretKey) {
      return nacl.sign_keyPair_fromSecretKey(privateKey).publicKey;
    } else {
      return nacl.sign_keyPair_fromSeed(privateKey).publicKey;
    }
  }
}

export class Secp256K1 extends AsymmetricKey {
  constructor(publicKey: ByteArray, privateKey: ByteArray) {
    super(publicKey, privateKey, SignatureAlgorithm.Secp256K1);
  }

  static new() {
    const keyPair = ec.genKeyPair();
    const publicKey = Uint8Array.from(keyPair.getPublic(true, 'array'));
    const privateKey = keyPair.getPrivate().toBuffer();
    return new Secp256K1(publicKey, privateKey);
  }

  /**
   * Parse the key pair from publicKey file and privateKey file
   * @param publicKeyPath path of public key file
   * @param privateKeyPath path of private key file
   */
  public static parseKeyFiles(
    publicKeyPath: string,
    privateKeyPath: string
  ): AsymmetricKey {
    const publicKey = Secp256K1.parsePublicKeyFile(publicKeyPath);
    const privateKey = Secp256K1.parsePrivateKeyFile(privateKeyPath);
    return new Secp256K1(publicKey, privateKey);
  }

  public static accountHash(publicKey: ByteArray): ByteArray {
    return accountHashHelper(SignatureAlgorithm.Secp256K1, publicKey);
  }

  public static parseKeyPair(
    publicKey: ByteArray,
    privateKey: ByteArray,
    originalFormat: 'raw' | 'der'
  ): AsymmetricKey {
    const publ = Secp256K1.parsePublicKey(publicKey, originalFormat);
    const priv = Secp256K1.parsePrivateKey(privateKey, originalFormat);
    // nacl expects that the private key will contain both.
    return new Secp256K1(publ, priv);
  }

  public static parsePrivateKeyFile(path: string): ByteArray {
    return Secp256K1.parsePrivateKey(Secp256K1.readBase64File(path));
  }

  public static parsePublicKeyFile(path: string): ByteArray {
    return Secp256K1.parsePublicKey(Secp256K1.readBase64File(path));
  }

  public static parsePrivateKey(
    bytes: ByteArray,
    originalFormat: 'der' | 'raw' = 'der'
  ) {
    let rawKeyHex: string;
    if (originalFormat === 'der') {
      rawKeyHex = keyEncoder.encodePrivate(Buffer.from(bytes), 'der', 'raw');
    } else {
      rawKeyHex = encodeBase16(bytes);
    }
    const privateKey = ec
      .keyFromPrivate(rawKeyHex, 'hex')
      .getPrivate()
      .toBuffer();
    return privateKey;
  }

  public static parsePublicKey(
    bytes: ByteArray,
    originalFormat: 'der' | 'raw' = 'der'
  ) {
    let rawKeyHex: string;
    if (originalFormat === 'der') {
      rawKeyHex = keyEncoder.encodePublic(Buffer.from(bytes), 'der', 'raw');
    } else {
      rawKeyHex = encodeBase16(bytes);
    }

    const publicKey = Uint8Array.from(
      ec.keyFromPublic(rawKeyHex, 'hex').getPublic(true, 'array')
    );
    return publicKey;
  }

  public static readBase64WithPEM(content: string) {
    return readBase64WithPEM(content);
  }

  /**
   * Read the Base64 content of a file, get rid of PEM frames.
   *
   * @param path the path of file to read from
   */
  private static readBase64File(path: string): ByteArray {
    const content = fs.readFileSync(path).toString();
    return Secp256K1.readBase64WithPEM(content);
  }

  exportPrivateKeyInPem(): string {
    return keyEncoder.encodePrivate(
      encodeBase16(this.privateKey),
      'raw',
      'pem'
    );
  }

  exportPublicKeyInPem(): string {
    return keyEncoder.encodePublic(
      encodeBase16(this.publicKey.rawPublicKey),
      'raw',
      'pem'
    );
  }

  sign(msg: ByteArray): ByteArray {
    const res = secp256k1.ecdsaSign(sha256(Buffer.from(msg)), this.privateKey);
    return res.signature;
  }

  verfiy(signature: ByteArray, msg: ByteArray) {
    return secp256k1.ecdsaVerify(
      signature,
      sha256(Buffer.from(msg)),
      this.publicKey.rawPublicKey
    );
  }

  static privateToPublicKey(privateKey: ByteArray): ByteArray {
    return secp256k1.publicKeyCreate(privateKey, true);
  }
}

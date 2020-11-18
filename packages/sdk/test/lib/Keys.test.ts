import { expect } from 'chai';
import { decodeBase16, decodeBase64 } from '../../src';
import { Ed25519 } from '../../src/lib/Keys';
import { byteHash } from '../../src/lib/Contracts';
import { encodeBase64 } from 'tweetnacl-ts';
import * as nacl from 'tweetnacl-ts';

import * as fs from 'fs';
import * as Crypto from 'crypto';
import * as path from 'path';
import * as os from 'os';

describe('Ed25519', () => {
  it('calculates the account hash', () => {
    const signKeyPair = Ed25519.new();
    // use lower case for node-rs
    const name = Buffer.from('ED25519'.toLowerCase());
    const sep = decodeBase16('00');
    const bytes = Buffer.concat([
      name,
      sep,
      signKeyPair.publicKey.rawPublicKey
    ]);
    const hash = byteHash(bytes);

    expect(Ed25519.accountHash(signKeyPair.publicKey.rawPublicKey)).deep.equal(
      hash
    );
  });

  it('should generate PEM file for Ed25519 correct', () => {
    const naclKeyPair = Ed25519.new();
    const publicKeyInPem = naclKeyPair.exportPublicKeyInPem();
    const privateKeyInPem = naclKeyPair.exportPrivateKeyInPem();

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    fs.writeFileSync(tempDir + '/public.pem', publicKeyInPem);
    fs.writeFileSync(tempDir + '/private.pem', privateKeyInPem);
    const signKeyPair2 = Ed25519.parseKeyFiles(
      tempDir + '/public.pem',
      tempDir + '/private.pem'
    );

    // expect nacl could import the generated PEM
    expect(encodeBase64(naclKeyPair.publicKey.rawPublicKey)).to.equal(
      encodeBase64(signKeyPair2.publicKey.rawPublicKey)
    );
    expect(encodeBase64(naclKeyPair.privateKey)).to.equal(
      encodeBase64(signKeyPair2.privateKey)
    );

    // import pem file to nodejs std library
    const pubKeyImported = Crypto.createPublicKey(publicKeyInPem);
    const priKeyImported = Crypto.createPrivateKey(privateKeyInPem);
    expect(pubKeyImported.asymmetricKeyType).to.equal('ed25519');

    // expect nodejs std lib export the same pem.
    const publicKeyInPemFromNode = pubKeyImported.export({
      type: 'spki',
      format: 'pem'
    });
    const privateKeyInPemFromNode = priKeyImported.export({
      type: 'pkcs8',
      format: 'pem'
    });
    expect(publicKeyInPemFromNode).to.equal(publicKeyInPem);
    expect(privateKeyInPemFromNode).to.equal(privateKeyInPem);

    // expect both of they generate the same signature
    const message = Buffer.from('hello world');
    const signatureByNode = Crypto.sign(null, message, priKeyImported);
    const signatureByNacl = nacl.sign_detached(
      Buffer.from(message),
      naclKeyPair.privateKey
    );
    expect(encodeBase64(signatureByNode)).to.eq(encodeBase64(signatureByNacl));

    // expect both of they could verify by their own public key
    expect(Crypto.verify(null, message, pubKeyImported, signatureByNode)).to
      .true;
    expect(
      nacl.sign_detached_verify(
        message,
        signatureByNacl,
        naclKeyPair.publicKey.rawPublicKey
      )
    ).to.true;
  });

  it('should deal with different line-endings', () => {
    const keyWithoutPem =
      'MCowBQYDK2VwAyEA4PFXL2NuakBv3l7yrDg65HaYQtxKR+SCRTDI+lXBoM8=';
    const key1 = decodeBase64(keyWithoutPem);
    const keyWithLF =
      '-----BEGIN PUBLIC KEY-----\n' +
      'MCowBQYDK2VwAyEA4PFXL2NuakBv3l7yrDg65HaYQtxKR+SCRTDI+lXBoM8=\n' +
      '-----END PUBLIC KEY-----\n';
    const key2 = Ed25519.readBase64WithPEM(keyWithLF);
    expect(key2).to.deep.eq(key1);
    const keyWithCRLF =
      '-----BEGIN PUBLIC KEY-----\r\n' +
      'MCowBQYDK2VwAyEA4PFXL2NuakBv3l7yrDg65HaYQtxKR+SCRTDI+lXBoM8=\r\n' +
      '-----END PUBLIC KEY-----\r\n';
    const key3 = Ed25519.readBase64WithPEM(keyWithCRLF);
    expect(key3).to.deep.eq(key1);
  });
});

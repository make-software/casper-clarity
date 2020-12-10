import { expect } from 'chai';
import { CasperClient } from '../../src/lib/CasperClient';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { DeployUtil, Keys, PublicKey } from '../../src/lib';
import { Ed25519, Secp256K1, SignatureAlgorithm } from '../../src/lib/Keys';
import JSBI from 'jsbi';
import { decodeBase16 } from '../../src';

let casperClient: CasperClient;
describe('CasperClient', () => {
  before(() => {
    casperClient = new CasperClient(
      'http://192.168.2.166:40101/rpc',
      'http://mock2:7777'
    );
  });

  it('should generate new Ed25519 key pair, and compute public key from private key', () => {
    const edKeyPair = casperClient.newKeyPair(SignatureAlgorithm.Ed25519);
    const publicKey = edKeyPair.publicKey.rawPublicKey;
    const privateKey = edKeyPair.privateKey;
    const convertFromPrivateKey = casperClient.privateToPublicKey(
      privateKey,
      SignatureAlgorithm.Ed25519
    );
    expect(convertFromPrivateKey).to.deep.equal(publicKey);
  });

  it('should generate PEM file for Ed25519 correctly', () => {
    const edKeyPair = casperClient.newKeyPair(SignatureAlgorithm.Ed25519);
    const publicKeyInPem = edKeyPair.exportPublicKeyInPem();
    const privateKeyInPem = edKeyPair.exportPrivateKeyInPem();

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    fs.writeFileSync(tempDir + '/public.pem', publicKeyInPem);
    fs.writeFileSync(tempDir + '/private.pem', privateKeyInPem);
    const publicKeyFromFIle = casperClient.loadPublicKeyFromFile(
      tempDir + '/public.pem',
      SignatureAlgorithm.Ed25519
    );
    const privateKeyFromFile = casperClient.loadPrivateKeyFromFile(
      tempDir + '/private.pem',
      SignatureAlgorithm.Ed25519
    );

    const keyPairFromFile = Keys.Ed25519.parseKeyPair(
      publicKeyFromFIle,
      privateKeyFromFile
    );

    expect(keyPairFromFile.publicKey.rawPublicKey).to.deep.equal(
      edKeyPair.publicKey.rawPublicKey
    );
    expect(keyPairFromFile.privateKey).to.deep.equal(edKeyPair.privateKey);

    // load the keypair from pem file of private key
    const loadedKeyPair = casperClient.loadKeyPairFromPrivateFile(
      tempDir + '/private.pem',
      SignatureAlgorithm.Ed25519
    );
    expect(loadedKeyPair.publicKey.rawPublicKey).to.deep.equal(
      edKeyPair.publicKey.rawPublicKey
    );
    expect(loadedKeyPair.privateKey).to.deep.equal(edKeyPair.privateKey);
  });

  it('should generate new Secp256K1 key pair, and compute public key from private key', () => {
    const edKeyPair = casperClient.newKeyPair(SignatureAlgorithm.Secp256K1);
    const publicKey = edKeyPair.publicKey.rawPublicKey;
    const privateKey = edKeyPair.privateKey;
    const convertFromPrivateKey = casperClient.privateToPublicKey(
      privateKey,
      SignatureAlgorithm.Secp256K1
    );
    expect(convertFromPrivateKey).to.deep.equal(publicKey);
  });

  it('should generate PEM file for Secp256K1 and restore the key pair from PEM file correctly', () => {
    const edKeyPair: Secp256K1 = casperClient.newKeyPair(
      SignatureAlgorithm.Secp256K1
    );
    const publicKeyInPem = edKeyPair.exportPublicKeyInPem();
    const privateKeyInPem = edKeyPair.exportPrivateKeyInPem();

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    fs.writeFileSync(tempDir + '/public.pem', publicKeyInPem);
    fs.writeFileSync(tempDir + '/private.pem', privateKeyInPem);
    const publicKeyFromFIle = casperClient.loadPublicKeyFromFile(
      tempDir + '/public.pem',
      SignatureAlgorithm.Secp256K1
    );
    const privateKeyFromFile = casperClient.loadPrivateKeyFromFile(
      tempDir + '/private.pem',
      SignatureAlgorithm.Secp256K1
    );

    const keyPairFromFile = Keys.Secp256K1.parseKeyPair(
      publicKeyFromFIle,
      privateKeyFromFile,
      'raw'
    );

    expect(keyPairFromFile.publicKey.rawPublicKey).to.deep.equal(
      edKeyPair.publicKey.rawPublicKey
    );
    expect(keyPairFromFile.privateKey).to.deep.equal(edKeyPair.privateKey);

    // load the keypair from pem file of private key
    const loadedKeyPair = casperClient.loadKeyPairFromPrivateFile(
      tempDir + '/private.pem',
      SignatureAlgorithm.Secp256K1
    );
    expect(loadedKeyPair.publicKey.rawPublicKey).to.deep.equal(
      edKeyPair.publicKey.rawPublicKey
    );
    expect(loadedKeyPair.privateKey).to.deep.equal(edKeyPair.privateKey);
  });

  // todo move it to example once we publish transfer feature
  describe.skip('transfer', async () => {
    const transfer = new DeployUtil.Transfer(
      100000000000000,
      PublicKey.fromHex(
        '01a72eb5ba13e243d40e56b0547536e3ad1584eee5a386c7be5d5a1f94c09a6592'
      )
    );
    const keyPair = Ed25519.parseKeyFiles(
      '../server/test.public.key',
      '../server/test.private.key'
    );
    const deploy = casperClient.makeTransferDeploy(
      new DeployUtil.DeployParams(keyPair.publicKey, 'casper-net-1'),
      transfer,
      DeployUtil.standardPayment(JSBI.BigInt(100000000000000))
    );
    const signedDeploy = casperClient.signDeploy(deploy, keyPair);
    const deployHash = await casperClient.putDeploy(signedDeploy);
    console.log(deployHash);
  });

  it('should create a HK wallet and derive child account correctly', function () {
    const seed =
      'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542';
    const hdKey = casperClient.newHdWallet(decodeBase16(seed));
    const secpKey1 = hdKey.deriveIndex(1);
    const msg = Buffer.from('hello world');
    const signature = secpKey1.sign(msg);
    expect(secpKey1.verfiy(signature, msg)).to.be.equal(true);

    const secpKey2 = hdKey.deriveIndex(2);
    const signature2 = secpKey2.sign(msg);
    expect(secpKey2.verfiy(signature2, msg)).to.be.equal(true);
  });
});

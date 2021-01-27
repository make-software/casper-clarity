import { expect, assert } from 'chai';
import { Keys, DeployUtil, PublicKey } from '../../src/lib';
import { TypedJSON } from 'typedjson';

describe('DeployUtil', () => {
  it('should stringify/parse DeployHeader correctly', function () {
    const ed25519Key = Keys.Ed25519.new();
    const deployHeader = new DeployUtil.DeployHeader(
      ed25519Key.publicKey,
      123456,
      654321,
      10,
      Uint8Array.from(Array(32).fill(42)),
      [Uint8Array.from(Array(32).fill(2))],
      'test-network'
    );
    const serializer = new TypedJSON(DeployUtil.DeployHeader);
    const json = serializer.stringify(deployHeader);
    const deployHeader1 = serializer.parse(json);
    expect(deployHeader1).to.deep.equal(deployHeader);
  });

  it('should allow to extract data from Transfer', function () {
    const senderKey = Keys.Ed25519.new();
    const recipientKey = Keys.Ed25519.new();
    const networkName = 'test-network';
    const paymentAmount = 10000000000000;
    const transferAmount = 10;
    const id = 34;

    let deployParams = new DeployUtil.DeployParams(
      senderKey.publicKey,
      networkName
    );
    let session = DeployUtil.ExecutableDeployItem.newTransfer(
      transferAmount,
      recipientKey.publicKey,
      undefined,
      id
    );
    let payment = DeployUtil.standardPayment(paymentAmount);
    let deploy = DeployUtil.makeDeploy(deployParams, session, payment);
    deploy = DeployUtil.signDeploy(deploy, senderKey);
    deploy = DeployUtil.signDeploy(deploy, recipientKey);

    let json = DeployUtil.deployToJson(deploy);
    // console.log(json);
    deploy = DeployUtil.deployFromJson(json)!;

    assert.isTrue(deploy.isTransfer());
    assert.isTrue(deploy.isStandardPayment());
    assert.deepEqual(deploy.header.account, senderKey.publicKey);
    assert.deepEqual(
      deploy.payment.getArgByName('amount')!.asBigNumber().toNumber(),
      paymentAmount
    );
    assert.deepEqual(
      deploy.session.getArgByName('amount')!.asBigNumber().toNumber(),
      transferAmount
    );
    assert.deepEqual(
      deploy.session.getArgByName('target')!.asBytesArray(),
      recipientKey.accountHash()
    );
    assert.deepEqual(
      deploy.session
        .getArgByName('id')!
        .asOption()
        .getSome()
        .asBigNumber()
        .toNumber(),
      id
    );
    assert.deepEqual(deploy.approvals[0].signer, senderKey.accountHex());
    assert.deepEqual(deploy.approvals[1].signer, recipientKey.accountHex());
  });
});

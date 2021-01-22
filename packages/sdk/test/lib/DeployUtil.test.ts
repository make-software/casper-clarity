import { DeployHeader } from '../../src/lib/DeployUtil';
import { expect } from 'chai';
import { Keys } from '../../src/lib';
import { TypedJSON } from 'typedjson';

describe('DeployUtil', () => {
  it('should stringify/parse DeployHeader correctly', function() {
    const ed25519Key = Keys.Ed25519.new();
    const deployHeader = new DeployHeader(ed25519Key.publicKey, 123456, 654321, 10, Uint8Array.from(Array(32).fill(42)), [Uint8Array.from(Array(32).fill(2))], 'test-network');
    const serializer = new TypedJSON(DeployHeader);
    const json = serializer.stringify(deployHeader);
    const deployHeader1 = serializer.parse(json);
    expect(deployHeader1).to.deep.equal(deployHeader);
  });
});

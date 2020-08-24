import { expect } from 'chai';
import { DeployArgumentParser } from '../../src/lib/DeployArgumentParser';

describe('DeployArgumentParser', () => {
  it('validate and parse bool', () => {
    expect(DeployArgumentParser.validateBoolean(true)).to.be.false;
    expect(DeployArgumentParser.validateBoolean(false)).to.be.false;
    expect(DeployArgumentParser.validateBoolean(1)).to.include(
      'not a valid boolean literal'
    );
    expect(DeployArgumentParser.validateBoolean({ a: 'a' })).to.include(
      'not a valid boolean literal'
    );
  });
});

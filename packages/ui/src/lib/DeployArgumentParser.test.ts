// @ts-nocheck
import { expect } from 'chai';
import { DeployArgumentParser } from '../../src/lib/DeployArgumentParser';
import { CLType } from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import { encodeBase16 } from 'casperlabs-sdk';
import { DeployContractsContainer } from '../containers/DeployContractsContainer';

describe('DeployArgumentParser', () => {
  it('should validate bool value correctly', () => {
    expect(DeployArgumentParser.validateBoolean(true)).to.be.false;
    expect(DeployArgumentParser.validateBoolean(false)).to.be.false;
    expect(DeployArgumentParser.validateBoolean(1)).to.include(
      'not a valid boolean literal'
    );
    expect(DeployArgumentParser.validateBoolean({ a: 'a' })).to.include(
      'not a valid boolean literal'
    );
  });

  it('should validate number value correctly', function() {
    expect(DeployArgumentParser.validateBigInt(3, CLType.Simple.U8)).to.be
      .false;
    expect(
      DeployArgumentParser.validateBigInt(256, CLType.Simple.U8)
    ).to.include('is not a valid U8, which should be in [0, 255]');
    expect(
      DeployArgumentParser.validateBigInt(-1, CLType.Simple.U8)
    ).to.include('is not a valid U8, which should be in [0, 255]');

    expect(DeployArgumentParser.validateBigInt(-1, CLType.Simple.I32)).to.be
      .false;
    expect(DeployArgumentParser.validateBigInt(2 ** 12, CLType.Simple.I32)).to
      .be.false;
    expect(
      DeployArgumentParser.validateBigInt(2 ** 32, CLType.Simple.I32)
    ).to.include(
      `is not a valid I32, which should be in [${-1 * 2 ** 31}, ${2 ** 31 - 1}]`
    );

    expect(
      DeployArgumentParser.validateBigInt([], CLType.Simple.I32)
    ).to.include(`[] is not a valid number literal`);
  });

  it('should validate string', function() {
    expect(DeployArgumentParser.validateString('test')).to.be.false;
    expect(DeployArgumentParser.validateString('')).to.be.false;
    expect(DeployArgumentParser.validateString(1)).to.include(
      'is not a valid string literal'
    );

    expect(DeployArgumentParser.validateString([])).to.include(
      '[] is not a valid string literal'
    );
  });

  it('should validate bytes', () => {
    expect(
      DeployArgumentParser.validateBase16String(encodeBase16('a valid string'))
    ).to.be.false;
    expect(DeployArgumentParser.validateBase16String('ghi')).to.include(
      'is not a valid'
    );
  });

  it('should validate list types', () => {
    // List<string>
    const innerDeployArg = DeployContractsContainer.newDeployArgument(
      false,
      '',
      CLType.Simple.STRING
    );
    const listInnerDeployArgs = [innerDeployArg];
    expect(DeployArgumentParser.validateList(listInnerDeployArgs, ['A', 'B']))
      .to.be.false;
    // success for empty list
    expect(DeployArgumentParser.validateList(listInnerDeployArgs, [])).to.be
      .false;

    // fail when value is not a valid array
    expect(
      DeployArgumentParser.validateList(listInnerDeployArgs, true)
    ).to.include('the input value is not a valid array');
    expect(
      DeployArgumentParser.validateList(listInnerDeployArgs, 1)
    ).to.include('the input value is not a valid array');
    expect(
      DeployArgumentParser.validateList(listInnerDeployArgs, 'A')
    ).to.include('the input value is not a valid array');

    // fail when type of any element is not string
    expect(
      DeployArgumentParser.validateList(listInnerDeployArgs, ['A', 1])
    ).to.include('list[1] is not correct');
    expect(
      DeployArgumentParser.validateList(listInnerDeployArgs, [[1], 'A'])
    ).to.include('list[0] is not correct: [1] is not a valid string literal');
    expect(
      DeployArgumentParser.validateList(listInnerDeployArgs, [true, 'A'])
    ).to.include('list[0] is not correct: true is not a valid string literal');
  });
});

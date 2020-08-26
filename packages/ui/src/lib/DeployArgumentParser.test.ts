// @ts-nocheck
import { expect } from 'chai';
import { DeployArgumentParser } from '../../src/lib/DeployArgumentParser';
import { CLType } from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import { encodeBase16 } from 'casperlabs-sdk';
import {
  BytesTypeStr,
  DeployContractsContainer
} from '../containers/DeployContractsContainer';

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
      DeployArgumentParser.validateBase16String(
        encodeBase16(Buffer.from('a valid string'))
      )
    ).to.be.false;
    expect(DeployArgumentParser.validateBase16String('ghi')).to.include(
      'is not a valid'
    );
  });

  it('should validate list', () => {
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

  it('should validate tuple', () => {
    // string
    const stringArgType = DeployContractsContainer.newDeployArgument(
      false,
      '',
      CLType.Simple.STRING
    );

    // bool
    const boolArgType = DeployContractsContainer.newDeployArgument(
      false,
      '',
      CLType.Simple.BOOL
    );

    // bytes
    const bytesArgType = DeployContractsContainer.newDeployArgument(
      false,
      '',
      BytesTypeStr
    );

    expect(
      DeployArgumentParser.validateTuple(
        [bytesArgType],
        [encodeBase16(Buffer.from('test'))]
      )
    ).to.be.false;

    expect(
      DeployArgumentParser.validateTuple(
        [bytesArgType, stringArgType, boolArgType],
        [encodeBase16(Buffer.from('test')), 'test', true]
      )
    ).to.false;

    // fail for empty list
    expect(
      DeployArgumentParser.validateTuple([bytesArgType], [])
    ).to.be.include('length of tuple is not correct');

    expect(
      DeployArgumentParser.validateTuple(
        [bytesArgType],
        [encodeBase16(Buffer.from('test')), 1]
      )
    ).to.include('length of tuple is not correct');

    expect(
      DeployArgumentParser.validateTuple(
        [bytesArgType, stringArgType, boolArgType],
        [true, 'test', encodeBase16(Buffer.from('test'))]
      )
    ).to.include(
      'tuple[0] is not correct: true is not a valid base16 encoded string'
    );
  });

  it('should validate map', () => {
    // string
    const stringArgType = DeployContractsContainer.newDeployArgument(
      false,
      '',
      CLType.Simple.STRING
    );

    // bytes
    const bytesArgType = DeployContractsContainer.newDeployArgument(
      false,
      '',
      BytesTypeStr
    );

    // number
    DeployContractsContainer.newDeployArgument(false, '', CLType.Simple.I32);
    expect(
      DeployArgumentParser.validateMap(
        [bytesArgType, stringArgType],
        [
          [encodeBase16(Buffer.from('A')), 'A'],
          [encodeBase16(Buffer.from('B')), 'B']
        ]
      )
    ).to.be.false;

    // success when creating empty map
    expect(DeployArgumentParser.validateMap([bytesArgType, stringArgType], []))
      .to.false;

    expect(
      DeployArgumentParser.validateMap(
        [bytesArgType, stringArgType],
        [[encodeBase16(Buffer.from('test'))]]
      )
    ).to.include('length of the MapEntry[0] is not 2');

    expect(
      DeployArgumentParser.validateMap(
        [bytesArgType, stringArgType],
        [[encodeBase16(Buffer.from('test')), 1, 1]]
      )
    ).to.include('length of the MapEntry[0] is not 2');

    expect(
      DeployArgumentParser.validateMap(
        [bytesArgType, stringArgType],
        [[encodeBase16(Buffer.from('test')), 1]]
      )
    ).to.include(
      'the value of MapEntry[0] is not correct: 1 is not a valid string literal'
    );
  });
});

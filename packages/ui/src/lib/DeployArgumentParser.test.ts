// @ts-nocheck
import { expect } from 'chai';
import { DeployArgumentParser } from '../../src/lib/DeployArgumentParser';
import {
  CLType,
  CLValueInstance
} from 'casperlabs-grpc/io/casperlabs/casper/consensus/state_pb';
import { Args, decodeBase16, encodeBase16 } from 'casperlabs-sdk';
import {
  BytesTypeStr,
  DeployContractsContainer
} from '../containers/DeployContractsContainer';

describe('DeployArgumentParser', () => {
  it('should validate bool value and create bool Argument', () => {
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
    // success
    expect(DeployArgumentParser.validateList(listInnerDeployArgs, ['A', 'B']))
      .to.be.false;
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

  it('should create list Argument', async function() {
    const listDeployArg = DeployContractsContainer.newDeployArgument(
      true,
      'list',
      'List',
      '["A", "B"]'
    );
    listDeployArg.$.listInnerDeployArgs.$[0] = DeployContractsContainer.newDeployArgument(
      false,
      '',
      CLType.Simple.STRING
    );
    const listArg = DeployArgumentParser.buildArgument(listDeployArg);
    expect(listArg.getName()).to.eq('list');
    expect(
      listArg
        .getValue()
        .getClType()
        .toObject()
    ).to.deep.equal(Args.Types.list(Args.Types.string()).toObject());
    expect(
      listArg
        .getValue()
        .getValue()
        .toObject()
    ).to.deep.equal(
      Args.Values.list([
        Args.Values.string('A'),
        Args.Values.string('B')
      ]).toObject()
    );

    // empty list
    listDeployArg.$.value.onChange('[]');
    await delay(200);
    const emptyList = DeployArgumentParser.buildArgument(listDeployArg);
    expect(emptyList.getName()).to.eq('list');
    expect(
      emptyList
        .getValue()
        .getClType()
        .toObject()
    ).to.deep.equal(Args.Types.list(Args.Types.string()).toObject());
    expect(
      emptyList
        .getValue()
        .getValue()
        .toObject()
    ).to.deep.equal(Args.Values.list([]).toObject());
  });

  it('should create fixed length list Argument', function() {
    const listDeployArg = DeployContractsContainer.newDeployArgument(
      true,
      'fixedList',
      'FixedList',
      '["A", "B"]'
    );
    listDeployArg.$.listInnerDeployArgs.$[0] = DeployContractsContainer.newDeployArgument(
      false,
      '',
      CLType.Simple.STRING
    );
    const fixedList = DeployArgumentParser.buildArgument(listDeployArg);
    expect(fixedList.getName()).to.eq('fixedList');
    expect(
      fixedList
        .getValue()
        .getClType()
        .toObject()
    ).to.deep.equal(Args.Types.fixedList(Args.Types.string(), 2).toObject());
    expect(
      fixedList
        .getValue()
        .getValue()
        .toObject()
    ).to.deep.equal(
      Args.Values.fixedList([
        Args.Values.string('A'),
        Args.Values.string('B')
      ]).toObject()
    );
  });

  it('should create tuple argument', async () => {
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

    const tupleArgs = DeployContractsContainer.newDeployArgument(
      true,
      'tuple',
      'Tuple',
      `["A"]`
    );
    tupleArgs.$.tupleInnerDeployArgs.$[0] = stringArgType;

    const tuple = DeployArgumentParser.buildArgument(tupleArgs);
    expect(tuple.getName()).to.eq('tuple');
    expect(tuple.getValue().getClType()).to.deep.equal(
      Args.Types.tuple1(Args.Types.string())
    );

    tupleArgs.$.tupleInnerDeployArgs.$.push(boolArgType);
    tupleArgs.$.value.onChange(`["A",true]`);
    await delay(200);

    const tuple2 = DeployArgumentParser.buildArgument(tupleArgs);
    expect(tuple2.getValue().getClType()).to.deep.equal(
      Args.Types.tuple2(Args.Types.string(), Args.Types.bool())
    );
    expect(tuple2.getValue().getValue()).to.deep.equal(
      Args.Values.tuple2(Args.Values.string('A'), Args.Values.bool(true))
    );

    const bytes = encodeBase16(Buffer.from('test'));
    tupleArgs.$.tupleInnerDeployArgs.$.push(bytesArgType);
    tupleArgs.$.value.onChange(`["A",true, "${bytes}"]`);
    await delay(200);

    const tuple3 = DeployArgumentParser.buildArgument(tupleArgs);
    expect(tuple3.getValue().getClType()).to.deep.equal(
      Args.Types.tuple3(
        Args.Types.string(),
        Args.Types.bool(),
        Args.Types.list(Args.Types.u8())
      )
    );

    expect(tuple3.getValue().getValue()).to.deep.equal(
      Args.Values.tuple3(
        Args.Values.string('A'),
        Args.Values.bool(true),
        Args.Values.bytes(decodeBase16(bytes))
      )
    );
  });

  it('should create map argument', async () => {
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

    // empty map
    const mapArgs = DeployContractsContainer.newDeployArgument(
      true,
      'map',
      'Map',
      `[]`
    );
    // set type of key
    mapArgs.$.mapInnerDeployArgs.$[0] = bytesArgType;
    // set type of value
    mapArgs.$.mapInnerDeployArgs.$[1] = stringArgType;

    const map = DeployArgumentParser.buildArgument(mapArgs);
    expect(map.getName()).to.eq('map');
    expect(map.getValue().getClType()).to.deep.equal(
      Args.Types.map(Args.Types.bytes(), Args.Types.string())
    );
    expect(
      map
        .getValue()
        .getValue()
        .getMapValue()
        .getValuesList()
    ).to.deep.equal([]);

    mapArgs.$.value.onChange(`[["${encodeBase16(Buffer.from('A'))}", "A"]]`);
    await delay(200);

    const map2 = DeployArgumentParser.buildArgument(mapArgs);
    const expectMapEntry = new CLValueInstance.MapEntry();
    expectMapEntry.setKey(Args.Values.bytes(Buffer.from('A')));
    expectMapEntry.setValue(Args.Values.string('A'));

    expect(map2.getValue().getValue()).to.deep.equal(
      Args.Values.map([expectMapEntry])
    );
  });
});

function delay(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}

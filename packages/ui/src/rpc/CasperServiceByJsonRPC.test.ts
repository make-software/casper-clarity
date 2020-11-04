import { CasperServiceByJsonRPC } from './CasperServiceByJsonRPC';
import { Ed25519 } from 'casperlabs-sdk/dist/lib/Keys';
import { decodeBase16, encodeBase16 } from 'casperlabs-sdk';

describe('CasperServiceByJsonRPC', () => {
  it('should validate bool value and create bool Argument', async () => {
    const casperService = new CasperServiceByJsonRPC(
      'http://192.168.2.166:7777/rpc'
    );
    // const status = await casperService.getLatestBlockInfo();
    let re = await casperService.getLatestBlockInfo();
    console.log(re.block.header.system_transactions);
    console.log(
      encodeBase16(
        Ed25519.publicKeyHash(
          decodeBase16(
            'f60bce2bb1059c41910eac1e7ee6c3ef4c8fcc63a901eb9603c1524cadfb0c18'
          )
        )
      )
    );
    const balanceUref = await casperService.getAccountBalanceUref(
      re.block.hash,
      '0000000000000000000000000000000000000000000000000000000000000000'
    );
    const balance = await casperService.getAccountBalance(
      re.block.hash,
      balanceUref
    );
    console.log(balance);
  });
});

import { CasperServiceByJsonRPC } from './CasperServiceByJsonRPC';

describe('CasperServiceByJsonRPC', () => {
  it('should validate bool value and create bool Argument', async () => {
    const casperService = new CasperServiceByJsonRPC(
      'http://192.168.2.166:7777/rpc'
    );
    // const status = await casperService.getLatestBlockInfo();
    const re = await casperService.getLatestBlockInfo();
    console.log(re.block!.header.system_transactions);
    const balanceUref = await casperService.getAccountBalanceUref(
      re.block!.hash,
      '0000000000000000000000000000000000000000000000000000000000000000'
    );
    const balance = await casperService.getAccountBalance(
      re.block!.hash,
      balanceUref
    );
    console.log(balance);
  });
});

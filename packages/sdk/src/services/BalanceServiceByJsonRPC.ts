/**
 * A service to query balance for accounts
 */
import { CasperServiceByJsonRPC } from './CasperServiceByJsonRPC';

export class BalanceServiceByJsonRPC {
  private balanceUrefs = new Map<string, string>();

  constructor(private casperService: CasperServiceByJsonRPC) {}

  /**
   * Query balance for the specified account
   *
   * It will cache balance URef values for accounts so that on subsequent queries,
   * it only takes 1 state query not 4 to get the value.
   * @param blockHashBase16
   * @param accountPublicKeyHashBase16
   */
  async getAccountBalance(
    blockHashBase16: string,
    accountPublicKeyHashBase16: string
  ): Promise<number | undefined> {
    try {
      const stateRootHash = await this.casperService.getStateRootHash(
        blockHashBase16
      );
      let balanceUref = this.balanceUrefs.get(accountPublicKeyHashBase16);

      // Find the balance Uref and cache it if we don't have it.
      if (!balanceUref) {
        balanceUref = await this.casperService.getAccountBalanceUref(
          stateRootHash,
          accountPublicKeyHashBase16
        );
        if (balanceUref) {
          this.balanceUrefs.set(accountPublicKeyHashBase16, balanceUref);
        }
      }

      if (!balanceUref) {
        return undefined;
      }

      return await this.casperService.getAccountBalance(
        stateRootHash,
        balanceUref
      );
    } catch (e) {
      return undefined;
    }
  }
}

// Help avoid typos in routing and constructing links.
export default class Pages {
  static readonly Home = '/';
  static readonly Accounts = '/accounts';
  static readonly Faucet = '/faucet';
  static readonly Explorer = '/explorer';
  static readonly Blocks = '/blocks';
  static readonly Block = '/blocks/:blockHashBase16';
  static readonly Deploys = '/deploys';
  static readonly DeploysOfAccount =
    '/accounts/:accountPublicKeyBase16/deploys';
  static readonly Deploy = '/deploys/:deployHashBase16';
  static readonly Search = '/search';
  static readonly Vesting = '/contracts/vesting';
  static readonly ConnectedPeers = '/peers';
  static readonly Validators = '/validators';
  static readonly DeployContracts = '/deploy';

  static readonly block = (blockHashBase16: string) =>
    `/blocks/${blockHashBase16}`;

  static readonly deploy = (deployHashBase16: string) =>
    `/deploys/${deployHashBase16}`;

  static readonly deploysOfAccount = (
    accountHashBase16: string,
    pageToken?: string
  ) => {
    const url = `/accounts/${accountHashBase16}/deploys`;
    return pageToken ? `${url}?pageToken=${pageToken}` : url;
  };

  static readonly explorerWithMaxRankAndDepth = (
    maxRank: number,
    depth: number
  ) => `${Pages.Explorer}?maxRank=${maxRank}&depth=${depth}`;

  static readonly blocksWithMaxRankAndDepth = (
    maxRank: number,
    depth: number
  ) => `${Pages.Blocks}?maxRank=${maxRank}&depth=${depth}`;
}

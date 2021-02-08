import { CasperServiceByJsonRPC, Contracts, Keys } from 'casper-client-sdk';
import commandLineArgs from 'command-line-args';

// https://www.npmjs.com/package/command-line-args

const optionDefinitions = [
  { name: 'host-url', type: String },
  { name: 'transfer-contract-path', type: String },
  { name: 'from-public-key-path', type: String },
  { name: 'from-private-key-path', type: String },
  { name: 'to-public-key-path', type: String },
  { name: 'amount', type: BigInt },
  { name: 'chain-name', type: String },
  { name: 'payment-amount', type: BigInt }
];

const options = commandLineArgs(optionDefinitions);

for (const opt of optionDefinitions) {
  if (typeof options[opt.name] === 'undefined') {
    console.log(`'${opt.name}' is missing!`);
    process.exit(1);
  }
}

const contractKeys = Keys.Ed25519.parseKeyFiles(
  options['from-public-key-path'],
  options['from-private-key-path']
);

const hex = (x: Uint8Array) => Buffer.from(x).toString('hex');

const accountPublicKey = Keys.Ed25519.parsePublicKeyFile(
  options['to-public-key-path']
);
const accountPublicKeyBase16 = hex(accountPublicKey);

const transfer = new Contracts.Contract(options['transfer-contract-path']);

const args = Contracts.Transfer.args(accountPublicKey, options.amount);

const deploy = transfer.deploy(
  args,
  options['payment-amount'],
  contractKeys.publicKey,
  contractKeys,
  options['chain-name']
);

const deployHashBase16 = hex(deploy.hash);

console.log(`Transferring tokens to account ${accountPublicKeyBase16}`);
console.log(`Deploying ${deployHashBase16} to ${options['host-url']}`);

const deployService = new CasperServiceByJsonRPC(options['host-url'][0]);

deployService
  .deploy(deploy)
  .then(() => console.log('Done.'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

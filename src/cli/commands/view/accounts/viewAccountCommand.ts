import { program } from 'commander';
import { viewAccount } from './viewAccount';

export const viewAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first account that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the account')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .action(viewAccount);

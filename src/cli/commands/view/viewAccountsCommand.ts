import { program } from 'commander';
import { viewAccounts } from '../../../actions/viewAccounts';

export const viewAccountsCommand = program
  .command('accounts')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all accounts that satisfy certain criteria')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .option('-d, --description <description>', 'The account description')
  .option('-cId, --currency-id <currencyId>', "The related currency's id")
  .action(viewAccounts);

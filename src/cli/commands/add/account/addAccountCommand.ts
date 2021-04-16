import { program } from 'commander';
import { addAccount } from '../../../../actions/addAccount';

export const addAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new account to the database')
  .requiredOption('-c, --code, <code>', 'The account code, eg. MNZO')
  .requiredOption('-n, --name <name>', 'The account name, eg. Monzo')
  .requiredOption(
    '-cId, --currency-id <currencyId>',
    "The related currency's id"
  )
  .option('-d, --description <description>', 'Description field for notes')
  .option('-o, --opened <opened>', 'Date account was opened, YYYY/MM/DD')
  .option('-x, --closed <closed>', 'Date account was closed, YYYY/MM/DD')
  .action(addAccount);

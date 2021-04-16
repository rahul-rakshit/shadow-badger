import { program } from 'commander';
import { editAccount } from '../../../actions/editAccount';

export const editAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing account by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The account id')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .option('-d, --description', 'Description field for notes')
  .option('-cId, --currency-id <currencyId>', "The related currency's id")
  .option('-o, --opened <opened>', 'Date account was opened, YYYY/MM/DD')
  .option('-x, --closed <closed>', 'Date account was closed, YYYY/MM/DD')
  .action(editAccount);

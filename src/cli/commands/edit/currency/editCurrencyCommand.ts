import { program } from 'commander';
import { editCurrency } from './editCurrency';

export const editCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing currency by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The id of the currency to edit')
  .option('-c, --code, <code>', 'The currency code, eg. USD')
  .option('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .option('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .option('-d, --description <description>', 'Description field for notes')
  .action(editCurrency);

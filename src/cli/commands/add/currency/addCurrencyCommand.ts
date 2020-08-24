import { program } from 'commander';
import { addCurrency } from './addCurrency';

export const addCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new currency to the database')
  .requiredOption('-c, --code, <code>', 'The currency code, eg. USD')
  .requiredOption('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .requiredOption('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .option('-d, --description <description>', 'Description field for notes')
  .action(addCurrency);

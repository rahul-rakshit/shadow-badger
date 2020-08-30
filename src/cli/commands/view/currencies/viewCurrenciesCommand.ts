import { program } from 'commander';
import { viewCurrency } from './viewCurrency';

export const viewCurrenciesCommand = program
  .command('currencies')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all currencies that satisfy certain criteria')
  .option('-c, --code, <code>', 'The currency code, eg. USD')
  .option('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .option('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .action(viewCurrency);

import { program } from 'commander';
import { deleteCurrency } from './deleteCurrency';

export const deleteCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a currency')
  .requiredOption('-id, --id, <id>', 'The id of the currency to delete')
  .action(deleteCurrency);

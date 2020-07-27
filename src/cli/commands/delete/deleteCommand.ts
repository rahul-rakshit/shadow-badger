import { program } from 'commander';
import { deleteCurrencyCommand } from './currency/deleteCurrencyCommand';

export const deleteCommand = program
  .command('delete')
  .description('delete an instance of the model from the database')
  .addCommand(deleteCurrencyCommand);

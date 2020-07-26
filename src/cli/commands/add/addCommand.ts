import { program } from 'commander';
import { addCurrencyCommand } from './currency/addCurrencyCommand';

export const addCommand = program
  .command('add')
  .description('save a new instance of the model to the database')
  .addCommand(addCurrencyCommand);

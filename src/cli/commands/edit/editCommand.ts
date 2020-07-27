import { program } from 'commander';
import { editCurrencyCommand } from './currency/editCurrencyCommand';

export const editCommand = program
  .command('edit')
  .description('find an instance by id and update passed values')
  .addCommand(editCurrencyCommand);

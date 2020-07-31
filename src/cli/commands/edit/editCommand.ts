import { program } from 'commander';
import { editCurrencyCommand } from './currency/editCurrencyCommand';
import { editAccountCommand } from './account/editAccountCommand';

export const editCommand = program
  .command('edit')
  .description('find an instance by id and update passed values')
  .addCommand(editCurrencyCommand)
  .addCommand(editAccountCommand);

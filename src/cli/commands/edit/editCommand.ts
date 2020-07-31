import { program } from 'commander';
import { editCurrencyCommand } from './currency/editCurrencyCommand';
import { editAccountCommand } from './account/editAccountCommand';
import { editCategoryCommand } from './category/editCategoryCommand';

export const editCommand = program
  .command('edit')
  .description('find an instance by id and update passed values')
  .addCommand(editCurrencyCommand)
  .addCommand(editAccountCommand)
  .addCommand(editCategoryCommand);

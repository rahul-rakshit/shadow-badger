import { program } from 'commander';
import { deleteCurrencyCommand } from './currency/deleteCurrencyCommand';
import { deleteAccountCommand } from './account/deleteAccountCommand';
import { deleteCategoryCommand } from './category/deleteCategoryCommand';

export const deleteCommand = program
  .command('delete')
  .description('delete an instance of the model from the database')
  .addCommand(deleteCurrencyCommand)
  .addCommand(deleteAccountCommand)
  .addCommand(deleteCategoryCommand);

import { program } from 'commander';
import { deleteCurrencyCommand } from './deleteCurrencyCommand';
import { deleteAccountCommand } from './deleteAccountCommand';
import { deleteCategoryCommand } from './deleteCategoryCommand';
import { deleteVendorCommand } from './deleteVendorCommand';
import { deleteTransactionCommmand } from './deleteTransactionCommand';

export const deleteCommand = program
  .command('delete')
  .description('delete an instance of the model from the database')
  .addCommand(deleteCurrencyCommand)
  .addCommand(deleteAccountCommand)
  .addCommand(deleteCategoryCommand)
  .addCommand(deleteVendorCommand)
  .addCommand(deleteTransactionCommmand);

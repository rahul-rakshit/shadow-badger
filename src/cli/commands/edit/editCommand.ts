import { program } from 'commander';
import { editCurrencyCommand } from './editCurrencyCommand';
import { editAccountCommand } from './editAccountCommand';
import { editCategoryCommand } from './editCategoryCommand';
import { editVendorCommand } from './editVendorCommand';
import { editTransactionCommand } from './editTransactionCommand';

export const editCommand = program
  .command('edit')
  .description('find an instance by id and update passed values')
  .addCommand(editCurrencyCommand)
  .addCommand(editAccountCommand)
  .addCommand(editCategoryCommand)
  .addCommand(editVendorCommand)
  .addCommand(editTransactionCommand);

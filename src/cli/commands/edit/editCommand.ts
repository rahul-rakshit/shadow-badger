import { program } from 'commander';
import { editCurrencyCommand } from './currency/editCurrencyCommand';
import { editAccountCommand } from './account/editAccountCommand';
import { editCategoryCommand } from './category/editCategoryCommand';
import { editVendorCommand } from './vendor/editVendorCommand';

export const editCommand = program
  .command('edit')
  .description('find an instance by id and update passed values')
  .addCommand(editCurrencyCommand)
  .addCommand(editAccountCommand)
  .addCommand(editCategoryCommand)
  .addCommand(editVendorCommand);

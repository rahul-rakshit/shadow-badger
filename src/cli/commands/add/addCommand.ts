import { program } from 'commander';
import { addCurrencyCommand } from './currency/addCurrencyCommand';
import { addAccountCommand } from './account/addAccountCommand';
import { addCategoryCommand } from './category/addCategoryCommand';
import { addVendorCommand } from './vendor/addVendorCommand';

export const addCommand = program
  .command('add')
  .description('save a new instance of the model to the database')
  .addCommand(addCurrencyCommand)
  .addCommand(addCategoryCommand)
  .addCommand(addAccountCommand)
  .addCommand(addVendorCommand);

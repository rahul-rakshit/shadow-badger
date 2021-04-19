import { program } from 'commander';
import { addCurrencyCommand } from './addCurrencyCommand';
import { addCategoryCommand } from './addCategoryCommand';
import { addAccountCommand } from './addAccountCommand';
import { addVendorCommand } from './addVendorCommand';
import { addTransactionCommmand } from './addTransactionCommand';
import { addSnapshotCommand } from './addSnapshotCommand';

export const addCommand = program
  .command('add')
  .description('save a new instance of the model to the database')
  .addCommand(addCurrencyCommand)
  .addCommand(addCategoryCommand)
  .addCommand(addAccountCommand)
  .addCommand(addVendorCommand)
  .addCommand(addTransactionCommmand)
  .addCommand(addSnapshotCommand);

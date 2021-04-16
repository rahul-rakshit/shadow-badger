import { program } from 'commander';
import { viewCurrencyCommand } from './viewCurrencyCommand';
import { viewCurrenciesCommand } from './viewCurrenciesCommand';
import { viewAccountCommand } from './viewAccountCommand';
import { viewAccountsCommand } from './viewAccountsCommand';
import { viewCategoryCommand } from './viewCategoryCommand';
import { viewCategoriesCommand } from './viewCategoriesCommand';
import { viewVendorCommand } from './viewVendorCommand';
import { viewVendorsCommand } from './viewVendorsCommand';
import { viewTransactionCommand } from './viewTransactionCommand';
import { viewTransactionsCommand } from './viewTransactionsCommand';

export const viewCommand = program
  .command('view <model>')
  .description('read entries of a model from the database')
  .addCommand(viewCurrencyCommand)
  .addCommand(viewCurrenciesCommand)
  .addCommand(viewAccountCommand)
  .addCommand(viewAccountsCommand)
  .addCommand(viewCategoryCommand)
  .addCommand(viewCategoriesCommand)
  .addCommand(viewVendorCommand)
  .addCommand(viewVendorsCommand)
  .addCommand(viewTransactionCommand)
  .addCommand(viewTransactionsCommand);

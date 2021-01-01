import { program } from 'commander';
import { viewCurrenciesCommand } from './currencies/viewCurrenciesCommand';
import { viewCurrencyCommand } from './currencies/viewCurrencyCommand';
import { viewAccountsCommand } from './accounts/viewAccountsCommand';
import { viewAccountCommand } from './accounts/viewAccountCommand';
import { viewCategoriesCommand } from './categories/viewCategoriesCommand';
import { viewCategoryCommand } from './categories/viewCategoryCommand';
import { viewVendorCommand } from './vendors/viewVendorCommand';
import { viewVendorsCommand } from './vendors/viewVendorsCommand';
import { viewTransactionCommand } from './transactions/viewTransactionCommand';
import { viewTransactionsCommand } from './transactions/viewTransactionsCommand';

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

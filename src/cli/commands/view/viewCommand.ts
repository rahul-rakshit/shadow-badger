import { program } from 'commander';
import { viewCurrenciesCommand } from './currencies/viewCurrenciesCommand';
import { viewCurrencyCommand } from './currencies/viewCurrencyCommand';
import { viewAccountsCommand } from './accounts/viewAccountsCommand';

export const viewCommand = program
  .command('view <model>')
  .description('read entries of a model from the database')
  .addCommand(viewCurrencyCommand)
  .addCommand(viewCurrenciesCommand)
  .addCommand(viewAccountsCommand);

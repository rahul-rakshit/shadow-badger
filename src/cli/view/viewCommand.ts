import { program } from 'commander';
import { currencyActions } from '../../entity/Currency';

export const viewCommand = program
  .command('view <model>')
  .description('read entries of a model from the database')
  .action(async (model: string) => {
    if (model === 'currencies' || model === 'currency') {
      const allCurrencies = await currencyActions.findAll();

      console.table(allCurrencies);
    }
  });

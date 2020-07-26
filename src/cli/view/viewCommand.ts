import { program } from 'commander';
import { getRepository } from 'typeorm';
import { CurrencySchema } from '../../entity/Currency';

export const viewCommand = program
  .command('view <model>')
  .description('read entries of a model from the database')
  .action(async (model: string) => {
    if (model === 'currencies' || model === 'currency') {
      const repo = getRepository(CurrencySchema);
      const allCurrencies = await repo.find();

      console.table(allCurrencies);
    }
  });

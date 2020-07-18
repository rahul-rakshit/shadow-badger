import { createConnection, getRepository } from 'typeorm';
import { CurrencySchema } from './src/entity/Currency';
import { program } from 'commander';

async function run() {
  await createConnection({
    type: 'sqlite',
    database: './test.sqlite3',
    entities: [CurrencySchema],
    logging: ['query', 'schema']
  });

  program.storeOptionsAsProperties(false).passCommandToAction(false);

  program
    .name('shadow-badger')
    .version('0.1.0')
    .usage('action model [options]');

  program
    .command('add')
    .description('save a new instance of the model to the database')
    .command('currency')
    .storeOptionsAsProperties(false)
    .passCommandToAction(false)
    .description('save a new currency to the database')
    .requiredOption('-c, --code, <code>', 'The currency code, eg. USD')
    .requiredOption('-n, --name <name>', 'The currency name, eg. US_Dollar')
    .requiredOption('-$, --symbol <symbol>', 'The currency symbol, eg. $')
    .action(async (opts: { name: string; code: string; symbol: string }) => {
      const { name, code, symbol } = opts;
      const currencyRepo = getRepository(CurrencySchema);
      await currencyRepo.save({ name, code, symbol });
    });

  program
    .command('view <model>')
    .description('read entries of a model from the database')
    .action(async (model: string) => {
      if (model === 'currencies' || model === 'currency') {
        const repo = getRepository(CurrencySchema);
        const allCurrencies = await repo.find();

        console.table(allCurrencies);
      }
    });

  await program.parseAsync(process.argv);
}

run();

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
    .usage('subcommand arg [options]')
    .arguments('<model>');

  program
    .command('add <model>')
    .description('save a new instance of a model to the database')
    .requiredOption('-n, --name <name>', 'The currency name, eg. US_Dollar')
    .requiredOption('-c, --code, <code>', 'The currency code, eg. USD')
    .requiredOption('-$, --symbol <symbol>', 'The currency symbol, eg. $')
    .action(
      async (
        model: string,
        opts: { name: string; code: string; symbol: string }
      ) => {
        if (model === 'currency') {
          const repo = getRepository(CurrencySchema);
          await repo.save(opts);
        }
      }
    );

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

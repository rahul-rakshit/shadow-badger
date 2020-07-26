import { createConnection } from 'typeorm';
import { CurrencySchema } from './src/entity/Currency';
import { program } from 'commander';
import { addCommand } from './src/cli/commands/add/addCommand';
import { viewCommand } from './src/cli/commands/view/viewCommand';

async function run() {
  await createConnection({
    type: 'sqlite',
    database: './test.sqlite3',
    entities: [CurrencySchema],
    logging: []
  });

  program.storeOptionsAsProperties(false).passCommandToAction(false);

  program
    .name('shadow-badger')
    .version('0.1.0')
    .usage('action model [options]');

  program.addCommand(addCommand);
  program.addCommand(viewCommand);

  await program.parseAsync(process.argv);
}

run();

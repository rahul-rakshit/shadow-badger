import { createConnection } from 'typeorm';
import { CurrencySchema } from './src/entity/Currency';
import { program } from 'commander';
import { addCommand } from './src/cli/commands/add/addCommand';
import { viewCommand } from './src/cli/commands/view/viewCommand';
import { editCommand } from './src/cli/commands/edit/editCommand';
import { deleteCommand } from './src/cli/commands/delete/deleteCommand';

async function run() {
  await createConnection({
    type: 'sqlite',
    database:
      '/Volumes/personal-code/side_projects/shadow-badger-cli/test.sqlite3',
    entities: [CurrencySchema],
    logging: []
  });

  program.storeOptionsAsProperties(false).passCommandToAction(false);

  program
    .name('shadow-badger')
    .version('0.1.0')
    .usage('action model [options]');

  program.addCommand(addCommand);
  program.addCommand(editCommand);
  program.addCommand(viewCommand);
  program.addCommand(deleteCommand);

  await program.parseAsync(process.argv);
}

run();

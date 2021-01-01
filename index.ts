import { createConnection } from 'typeorm';
import { program } from 'commander';
import { addCommand } from './src/cli/commands/add/addCommand';
import { viewCommand } from './src/cli/commands/view/viewCommand';
import { editCommand } from './src/cli/commands/edit/editCommand';
import { deleteCommand } from './src/cli/commands/delete/deleteCommand';
import { categorySchema } from './src/entity/Category/categorySchema';
import { accountSchema } from './src/entity/Account/accountSchema';
import { currencySchema } from './src/entity/Currency/currencySchema';
import { vendorSchema } from './src/entity/Vendor/vendorSchema';
import { transactionSchema } from './src/entity/Transaction/transactionSchema';

async function run() {
  await createConnection({
    type: 'sqlite',
    database: 'test.sqlite3',
    entities: [
      currencySchema,
      accountSchema,
      categorySchema,
      vendorSchema,
      transactionSchema
    ],
    synchronize: false
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

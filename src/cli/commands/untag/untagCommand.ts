import { program } from 'commander';
import { untagVendorCommand } from './untagVendorCommand';
import { untagTransactionCommand } from './untagTransactionCommand';

export const untagCommand = program
  .command('untag')
  .description('remove a tag from an instance of a model to the database')
  .addCommand(untagVendorCommand)
  .addCommand(untagTransactionCommand);

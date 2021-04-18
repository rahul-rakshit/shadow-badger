import { program } from 'commander';
import { tagVendorCommand } from './tagVendorCommand';
import { tagTransactionCommand } from './tagTransactionCommand';

export const tagCommand = program
  .command('tag')
  .description('append a tag to an instance of a model to the database')
  .addCommand(tagVendorCommand)
  .addCommand(tagTransactionCommand);

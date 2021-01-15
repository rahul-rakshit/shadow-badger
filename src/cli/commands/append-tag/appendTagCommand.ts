import { program } from 'commander';
import { appendVendorTagCommand } from './vendor/appendVendorTagCommand';

export const appendTagCommand = program
  .command('append-tag')
  .description('append a tag to an instance of a model to the database')
  .addCommand(appendVendorTagCommand);

import { program } from 'commander';
import { tagVendorCommand } from './tagVendorCommand';

export const tagCommand = program
  .command('tag')
  .description('append a tag to an instance of a model to the database')
  .addCommand(tagVendorCommand);

import { editVendor } from './editVendor';
import { program } from 'commander';

export const editVendorCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing vendor by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The id of the vendor to edit')
  .option('-gps, --coordinates <coordinates>', 'The vendor GPS coordinates')
  .option('-a, --address <address>', 'The vendor address')
  .option('-d, --description <description>', 'The vendor description')
  .option(
    '-#, --tags <tags>',
    'A command-separated string of tags for the vendor'
  )
  .action(editVendor);

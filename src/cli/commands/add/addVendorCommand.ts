import { program } from 'commander';
import { addVendor } from '../../../actions/addVendor';

export const addVendorCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new vendor to the database')
  .requiredOption('-n, --name <name>', 'The vendor name')
  .option('-gps, --coordinates <coordinates>', 'The vendor GPS coordinates')
  .option('-a, --address <address>', 'The vendor address')
  .option('-d, --description <description>', 'The vendor description')
  .option(
    '-#, --tags <tags>',
    'A command-separated string of tags for the vendor'
  )
  .action(addVendor);

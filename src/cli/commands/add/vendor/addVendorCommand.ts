import { addVendor } from './addVendor';
import { program } from 'commander';

export const addVendorCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new vendor to the database')
  .requiredOption('-n, --name <name>', 'The vendor name')
  .option('-gps, --coordinates <coordinates>', 'The vendor GPS coordinates')
  .option('-a, --address <address>', 'The vendor address')
  .option('-d, --description <description>', 'The vendor description')
  .action(addVendor);

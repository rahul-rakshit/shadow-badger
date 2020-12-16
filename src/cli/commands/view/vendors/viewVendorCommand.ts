import { program } from 'commander';
import { viewVendor } from './viewVendor';

export const viewVendorCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the vendor currency that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the vendor')
  .option('-n, --name <name>', 'The vendor name')
  .option('-gps, --coordinates <coordinates>', 'The vendor GPS coordinates')
  .option('-a, --address <address>', 'The vendor address')
  .option('-d, --description <description>', 'The vendor description')
  .action(viewVendor);

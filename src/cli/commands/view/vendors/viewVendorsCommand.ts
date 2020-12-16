import { program } from 'commander';
import { viewVendors } from './viewVendors';

export const viewVendorsCommand = program
  .command('vendors')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all vendors that satisfy certain criteria')
  .option('-n, --name, <name>', 'The vendor name')
  .option('-a, --address <address>', 'The vendor address')
  .action(viewVendors);

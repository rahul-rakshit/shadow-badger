import { program } from 'commander';
import { deleteVendor } from './deleteVendor';

export const deleteVendorCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a vendor')
  .requiredOption('-id, --id, <id>', 'The id of the vendor to delete')
  .action(deleteVendor);

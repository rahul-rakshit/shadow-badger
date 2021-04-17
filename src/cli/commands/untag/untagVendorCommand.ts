import { program } from 'commander';
import { untagVendor } from '../../../actions/untagVendor';

export const untagVendorCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description(
    'remove a comma-separated string of tags from a vendor in the database'
  )
  .requiredOption('-id, --id, <id>', 'The id of the vendor to untag')
  .requiredOption(
    '-#, --tags, <id>',
    'The command-separated list of tags to remove'
  )
  .action(untagVendor);

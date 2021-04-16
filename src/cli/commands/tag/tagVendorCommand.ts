import { program } from 'commander';
import { tagVendor } from '../../../actions/tagVendor';

export const tagVendorCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description(
    'append a comma-separated string of tags to a vendor in the database'
  )
  .requiredOption('-id, --id, <id>', 'The id of the vendor to tag')
  .requiredOption(
    '-#, --tags, <id>',
    'The command-separated list of tags to append'
  )
  .action(tagVendor);

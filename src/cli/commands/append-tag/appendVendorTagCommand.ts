import { program } from 'commander';
import { appendVendorTag } from '../../../actions/appendVendorTag';

export const appendVendorTagCommand = program
  .command('vendor')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description(
    'append a comma-separated string of tags to a vendor in the database'
  )
  .requiredOption('-id, --id, <id>', 'The id of the vendor to append a tag to')
  .requiredOption(
    '-#, --tags, <id>',
    'The command-separated list of tags to append'
  )
  .action(appendVendorTag);

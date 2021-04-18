import { program } from 'commander';
import { untagTransaction } from '../../../actions/untagTransaction';

export const untagTransactionCommand = program
  .command('transaction')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description(
    'remove a comma-separated string of tags from a transaction in the database'
  )
  .requiredOption('-id, --id, <id>', 'The id of the transaction to untag')
  .requiredOption(
    '-#, --tags, <id>',
    'The command-separated list of tags to remove'
  )
  .action(untagTransaction);

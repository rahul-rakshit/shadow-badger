import { tagTransaction } from '../../../actions/tagTransaction';
import { program } from 'commander';

export const tagTransactionCommand = program
  .command('transaction')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description(
    'append a comma-separated string of tags to a transaction in the database'
  )
  .requiredOption('-id, --id, <id>', 'The id of the transaction to tag')
  .requiredOption(
    '-#, --tags, <id>',
    'The command-separated list of tags to append'
  )
  .action(tagTransaction);

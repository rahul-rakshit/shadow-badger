import { program } from 'commander';
import { deleteTransaction } from '../../../actions/deleteTransaction';

export const deleteTransactionCommmand = program
  .command('transaction')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a transaction')
  .requiredOption('-id, --id, <id>', 'The id of the transaction to delete')
  .action(deleteTransaction);

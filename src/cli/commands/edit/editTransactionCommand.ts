import { program } from 'commander';
import { editTransaction } from '../../../actions/editTransaction';

export const editTransactionCommand = program
  .command('transaction')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing transaction by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The transaction id')
  .option('-t, --dateTime, <dateTime>', 'The dateTime the transaction occured')
  .option('-a, --amount <amount>', 'The amount of the transaction')
  .option('-d, --description <description>', "The transaction's description")
  .option('-aId, --account-id <accountId>', 'The id of the referenced account')
  .option(
    '-cId, --category-id <categoryId>',
    'The id of the referenced category'
  )
  .option('-vId, --vendor-id <vendorId>', 'The id of the referenced vendor')
  .action(editTransaction);

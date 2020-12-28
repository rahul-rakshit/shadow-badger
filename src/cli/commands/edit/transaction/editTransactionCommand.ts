import { program } from 'commander';
import { editTransaction } from './editTransaction';

export const editTransactionCommand = program
  .command('transaction')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing transaction by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The transaction id')
  .option('-t, --dateTime, <dateTime>', 'The dateTime the transaction occured')
  .option('-a, --amount <amount>', 'The amount of the transaction')
  .option('-d, --description <description>', "The transaction's description")
  .option('-aId, --accountId <accountId>', 'The id of the referenced account')
  .option(
    '-cId, --categoryId <categoryId>',
    'The id of the referenced category'
  )
  .option('-vId, --vendorId <vendorId>', 'The id of the referenced vendor')
  .action(editTransaction);

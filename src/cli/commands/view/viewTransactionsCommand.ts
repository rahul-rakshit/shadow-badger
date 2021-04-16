import { program } from 'commander';
import { viewTransactions } from '../../../actions/viewTransactions';

export const viewTransactionsCommand = program
  .command('transactions')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first transaction that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the transaction')
  .option('-t, --dateTime, <dateTime>', 'The dateTime the transaction occured')
  .option('-a, --amount <amount>', 'The amount of the transaction')
  .option('-d, --description <description>', "The transaction's description")
  .option('-aId, --account-id <accountId>', 'The id of the referenced account')
  .option(
    '-cId, --category-id <categoryId>',
    'The id of the referenced category'
  )
  .option('-vId, --vendor-id <vendorId>', 'The id of the referenced vendor')
  .action(viewTransactions);

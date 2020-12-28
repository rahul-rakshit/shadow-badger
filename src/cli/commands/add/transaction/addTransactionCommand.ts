import { program } from 'commander';
import { addTransaction } from './addTransaction';

export const addTransactionCommmand = program
  .command('transaction')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new transaction to the database')
  .requiredOption(
    '-t, --dateTime, <dateTime>',
    'The dateTime the transaction occured'
  )
  .requiredOption('-a, --amount <amount>', 'The amount of the transaction')
  .option('-d, --description <description>', "The transaction's description")
  .requiredOption(
    '-aId, --accountId <accountId>',
    'The id of the referenced account'
  )
  .requiredOption(
    '-cId, --categoryId <categoryId>',
    'The id of the referenced category'
  )
  .requiredOption(
    '-vId, --vendorId <vendorId>',
    'The id of the referenced vendor'
  )
  .action(addTransaction);

import { program } from 'commander';
import { deleteAccount } from '../../../actions/deleteAccount';

export const deleteAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete an account')
  .requiredOption('-id, --id, <id>', 'The id of the account to delete')
  .action(deleteAccount);

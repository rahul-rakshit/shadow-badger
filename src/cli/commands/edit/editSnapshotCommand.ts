import { program } from 'commander';
import { editSnapshot } from '../../../actions/editSnapshot';

export const editSnapshotCommand = program
  .command('snapshot')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing snapshot by id and update passed values')
  .option('-id, --id, <id>', 'The snapshot id')
  .option('-t, --dateTime, <dateTime>', 'The datetime of the snapshot')
  .option('-b, --balance <balance>', 'The account balance')
  .option('-aId, --account-id <accountId>', 'The id of the account')
  .option('-d, --description <description>', 'Description field for notes')
  .action(editSnapshot);

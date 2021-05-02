import { program } from 'commander';
import { viewSnapshot } from '../../../actions/viewSnapshot';

export const viewSnapshotCommand = program
  .command('snapshot')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first snapshot that satisfies certain criteria')
  .option('-id, --id, <id>', 'The snapshot id')
  .option('-t, --dateTime, <dateTime>', 'The datetime of the snapshot')
  .option('-b, --balance <balance>', 'The account balance')
  .option('-aId, --account-id <accountId>', 'The id of the account')
  .option('-d, --description <description>', 'Description field for notes')
  .action(viewSnapshot);

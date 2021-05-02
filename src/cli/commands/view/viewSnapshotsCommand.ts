import { viewSnapshots } from '../../../actions/viewSnapshots';
import { program } from 'commander';

export const viewSnapshotsCommand = program
  .command('snapshots')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all snapshots that satisfy certain criteria')
  .option('-t, --dateTime, <dateTime>', 'The datetime of the snapshots')
  .option('-b, --balance <balance>', 'The account balance')
  .option('-aId, --account-id <accountId>', 'The id of the account')
  .option('-d, --description <description>', 'Description field for notes')
  .action(viewSnapshots);

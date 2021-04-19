import { program } from 'commander';
import { addSnapshot } from '../../../actions/addSnapshot';

export const addSnapshotCommand = program
  .command('snapshot')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new snapshot to the database')
  .requiredOption('-t, --dateTime, <dateTime>', 'The datetime of the snapshot')
  .requiredOption('-b, --balance <balance>', 'The account balance')
  .option('-d, --description <description>', 'Description field for notes')
  .action(addSnapshot);

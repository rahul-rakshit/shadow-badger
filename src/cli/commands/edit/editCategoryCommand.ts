import { program } from 'commander';
import { editCategory } from '../../../actions/editCategory';

export const editCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing category by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The category id')
  .option('-c, --code, <code>', 'The category code, eg. GRC')
  .option('-n, --name <name>', 'The category name, eg. Groceries')
  .option('-d, --description <description>', 'The category description')
  .action(editCategory);

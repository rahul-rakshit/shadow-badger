import { program } from 'commander';
import { addCategory } from './addCategory';

export const addCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new category to the database')
  .requiredOption('-c, --code, <code>', 'The category code, eg. GRC')
  .requiredOption('-n, --name <name>', 'The category name, eg. Groceries')
  .option('-d, --description <description>', 'The category description')
  .action(addCategory);

import { program } from 'commander';
import { viewCategories } from './viewCategories';

export const viewCategoriesCommand = program
  .command('categories')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all categories that satisfy certain criteria')
  .option('-c, --code, <code>', 'The category code, eg. GRC')
  .option('-n, --name <name>', 'The category name, eg. Groceries')
  .option('-d, --description <description>', 'The category description')
  .action(viewCategories);

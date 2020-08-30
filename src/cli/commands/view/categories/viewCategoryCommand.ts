import { program } from 'commander';
import { viewCategory } from './viewCategory';

export const viewCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first category that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the category')
  .option('-c, --code, <code>', 'The category code, eg. GRC')
  .option('-n, --name <name>', 'The category name, eg. Groceries')
  .option('-d, --description <description>', 'The category description')
  .action(viewCategory);

import { program } from 'commander';
import { deleteCategory } from '../../../actions/deleteCategory';

export const deleteCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a category')
  .requiredOption('-id, --id, <id>', 'The id of the category to delete')
  .action(deleteCategory);

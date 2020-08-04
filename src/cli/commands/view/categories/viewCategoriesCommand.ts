import { program } from 'commander';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logList } from '../../../cli-helpers/logList';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { categoryActions } from '../../../../entity/Category/categoryActions';

export const viewCategoriesCommand = program
  .command('categories')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all categories that satisfy certain criteria')
  .option('-c, --code, <code>', 'The category code, eg. GRC')
  .option('-n, --name <name>', 'The category name, eg. Groceries')
  .option('-d, --description <description>', 'The category description')
  .action(
    async (opts: { name?: string; code?: string; description?: string }) => {
      try {
        const allCategories = await categoryActions.findAll({ where: opts });
        if (allCategories.length === 0) logAndExitNotFoundMessage('category');
        logList(allCategories, 'categories', opts);
      } catch (error) {
        logAndExitOnSqlEngineError('view', 'categories', error.message);
      }
    }
  );

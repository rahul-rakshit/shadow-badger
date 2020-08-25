import { program } from 'commander';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { processUtil } from '../../../cli-helpers/processUtil';

const {
  logAndExitNotFoundMessage,
  logList,
  logAndExitOnSqlEngineError
} = processUtil;

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

import { program } from 'commander';
import { categoryActions } from '../../../../entity/Category';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';

export const deleteCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a category')
  .requiredOption('-id, --id, <id>', 'The id of the category to delete')
  .action(async ({ id }: { id: string }) => {
    try {
      const foundCategory = await categoryActions.findOne(id);
      if (!foundCategory) logAndExitNotFoundMessage('category', id);

      await categoryActions.delete(id);
      logSuccess('deleted', 'category', `with id ${id}`);
    } catch (error) {
      logAndExitOnSqlEngineError('delete', 'category', error.message);
    }
  });

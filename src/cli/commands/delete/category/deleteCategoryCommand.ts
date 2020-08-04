import { program } from 'commander';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { categoryActions } from '../../../../entity/Category/categoryActions';

export const deleteCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a category')
  .requiredOption('-id, --id, <id>', 'The id of the category to delete')
  .action(async ({ id: idString }: { id: string }) => {
    const id = Number(idString);
    try {
      const foundCategory = await categoryActions.findOne(id);
      if (!foundCategory) logAndExitNotFoundMessage('category', idString);

      await categoryActions.delete(id);
      logSuccess('deleted', 'category', `with id ${id}`);
    } catch (error) {
      logAndExitOnSqlEngineError('delete', 'category', error.message);
    }
  });

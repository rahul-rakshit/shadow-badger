import { program } from 'commander';
import {
  Category,
  categoryValidatorMap,
  categoryActions
} from '../../../../entity/Category';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { failed } from '../../../../types-d';
import { logAndExitOnValidationFailure } from '../../../cli-helpers/logAndExitOnValidationFailure';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';

export const addCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('save a new category to the database')
  .requiredOption('-c, --code, <code>', 'The category code, eg. GRC')
  .requiredOption('-n, --name <name>', 'The category name, eg. Groceries')
  .requiredOption('-d, --description <description>', 'The category description')
  .action(async (opts: { name: string; code: string; description: string }) => {
    const newCategory: Category = opts;
    const validation = validateModelObject<Category>(
      newCategory,
      categoryValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      logAndExitOnValidationFailure<Category>('add', 'category', messageMap);
    } else {
      try {
        const { id } = await categoryActions.create(newCategory);
        logSuccess('added', 'category', `with id ${id}`);
      } catch (error) {
        logAndExitOnSqlEngineError('add', 'category', error.message);
      }
    }
  });

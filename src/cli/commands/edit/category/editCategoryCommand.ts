import { program } from 'commander';
import {
  categoryActions,
  Category,
  categoryValidatorMap
} from '../../../../entity/Category';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { failed } from '../../../../types-d';
import { logAndExitOnValidationFailure } from '../../../cli-helpers/logAndExitOnValidationFailure';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';

export const editCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('find an existing category by id and update passed values')
  .requiredOption('-id, --id, <id>', 'The category id')
  .option('-c, --code, <code>', 'The category code, eg. GRC')
  .option('-n, --name <name>', 'The category name, eg. Groceries')
  .option('-d, --description <description>', 'The category description')
  .action(
    async (opts: {
      id: string;
      code?: string;
      name?: string;
      description?: string;
    }) => {
      const { code, name, description } = opts;
      const idString = opts.id;
      const id = Number(idString);

      try {
        const foundCategory = await categoryActions.findOne(id);
        if (!foundCategory) logAndExitNotFoundMessage('category', idString);
        const category = foundCategory as Category;

        if (code) category.code = code;
        if (name) category.name = name;
        if (description) category.description = description;

        const validation = validateModelObject<Category>(
          category,
          categoryValidatorMap
        );

        if (failed(validation)) {
          const messageMap = validation.value;
          logAndExitOnValidationFailure<Category>(
            'edit',
            'category',
            messageMap
          );
        }

        await categoryActions.edit(id, category);

        logSuccess('edited', 'category', `with id ${id}`);
      } catch (error) {
        logAndExitOnSqlEngineError('edit', 'category', error.message);
      }
    }
  );

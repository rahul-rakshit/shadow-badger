import { program } from 'commander';
import { logAndExitNoFilterCriteria } from '../../../cli-helpers/logAndExitNoFilterCriteria';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logObject } from '../../../cli-helpers/logObject';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { parseDefinedOpts } from '../../../cli-helpers/parseDefinedOpts';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { Category } from '../../../../entity/Category/Category-d';

export const viewCategoryCommand = program
  .command('category')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first category that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the category')
  .option('-c, --code, <code>', 'The category code, eg. GRC')
  .option('-n, --name <name>', 'The category name, eg. Groceries')
  .option('-d, --description <description>', 'The category description')
  .action(
    async (opts: {
      id?: string;
      name?: string;
      code?: string;
      description?: string;
    }) => {
      const { name, code, description } = opts;
      const idString = opts.id;
      const id = Number(idString);

      if (!idString && !name && !code && !description) {
        logAndExitNoFilterCriteria();
      }

      try {
        const foundCategory = id
          ? await categoryActions.findOne(id)
          : await categoryActions.findOne(undefined, {
              where: parseDefinedOpts({ name, code, description })
            });

        if (!foundCategory) logAndExitNotFoundMessage('category', opts.id);

        logObject(foundCategory as Category, 'category');
      } catch (error) {
        logAndExitOnSqlEngineError('view', 'category', error.message);
      }
    }
  );

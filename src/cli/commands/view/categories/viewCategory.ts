import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { Category } from '../../../../entity/Category/Category-d';
import { parseDefinedOpts } from '../../../../utils/parseDefinedOpts';

export async function viewCategory(opts: {
  id?: string;
  name?: string;
  code?: string;
  description?: string;
}) {
  const { name, code, description } = opts;
  const idString = opts.id;
  const id = Number(idString);

  if (!idString && !name && !code && !description) {
    $.logAndExitNoFilterCriteria();
  }

  try {
    const foundCategory = id
      ? await categoryActions.findOne(id)
      : await categoryActions.findOne(undefined, {
          where: parseDefinedOpts({ name, code, description })
        });

    if (!foundCategory) $.logAndExitNotFoundMessage('category', opts.id);

    $.logObject(foundCategory as Category, 'category');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'category', error.message);
  }
}

import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { categoryActions } from '../../../../entity/Category/categoryActions';

export async function viewCategories(opts: {
  name?: string;
  code?: string;
  description?: string;
}) {
  try {
    const allCategories = await categoryActions.findAll({ where: opts });
    if (allCategories.length === 0) $.logAndExitNotFoundMessage('category');
    const loggable = allCategories.map((category) => ({
      id: category.id,
      name: category.name,
      code: category.code
    }));
    $.logList(loggable, 'categories', opts);
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'categories', error.message);
  }
}

import { Category } from '../../../../entity/Category/Category-d';

import { validateModelObject } from '../../../../validations/validateModelObject';
import { categoryValidatorMap } from '../../../../entity/Category/categoryValidatorMap';
import { failed } from '../../../../types-d';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { categoryActions } from '../../../../entity/Category/categoryActions';

export async function addCategory(opts: {
  name: string;
  code: string;
  description?: string;
}) {
  const newCategory: Category = opts;
  if (opts.description === undefined) newCategory.description = '';
  const validation = validateModelObject<Category>(
    newCategory,
    categoryValidatorMap
  );

  if (failed(validation)) {
    const messageMap = validation.value;
    $.logAndExitOnValidationFailure<Category>('add', 'category', messageMap);
  } else {
    try {
      const { id } = await categoryActions.create(newCategory);
      $.logSuccess('added', 'category', `with id ${id}`);
    } catch (error) {
      $.logAndExitOnSqlEngineError('add', 'category', error.message);
    }
  }
}

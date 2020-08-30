import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { Category } from '../../../../entity/Category/Category-d';
import { categoryValidatorMap } from '../../../../entity/Category/categoryValidatorMap';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { failed } from '../../../../types-d';

export async function editCategory(opts: {
  id: string;
  code?: string;
  name?: string;
  description?: string;
}) {
  const { code, name, description } = opts;
  const idString = opts.id;
  const id = Number(idString);

  try {
    const foundCategory = await categoryActions.findOne(id);
    if (!foundCategory) $.logAndExitNotFoundMessage('category', idString);
    const category = foundCategory as Category;

    if (code) category.code = code;
    if (name) category.name = name;
    if (description || description === '') {
      category.description = description;
    }

    const validation = validateModelObject<Category>(
      category,
      categoryValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Category>('edit', 'category', messageMap);
    }

    await categoryActions.edit(category);

    $.logSuccess('edited', 'category', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('edit', 'category', error.message);
  }
}

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { categoryActions } from '../entity/Category/categoryActions';

export async function deleteCategory({ id: idString }: { id: string }) {
  const id = Number(idString);
  try {
    const foundCategory = await categoryActions.findOne(id);
    if (!foundCategory) $.logAndExitNotFoundMessage('category', idString);

    await categoryActions.delete(id);
    $.logSuccess('deleted', 'category', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('delete', 'category', error.message);
  }
}

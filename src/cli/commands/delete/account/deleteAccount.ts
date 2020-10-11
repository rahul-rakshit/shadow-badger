import { accountActions } from '../../../../entity/Account/accountActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

export async function deleteAccount({ id: idString }: { id: string }) {
  try {
    const id = Number(idString);
    const foundAccount = await accountActions.findOne(id);
    if (!foundAccount) $.logAndExitNotFoundMessage('account', idString);

    await accountActions.delete(id);
    $.logSuccess('deleted', 'account', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('delete', 'account', error.message);
  }
}

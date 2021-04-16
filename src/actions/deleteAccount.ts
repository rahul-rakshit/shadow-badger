import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { accountActions } from '../entity/Account/accountActions';
import { transactionActions } from '../entity/Transaction/transactionActions';

export async function deleteAccount({ id: idString }: { id: string }) {
  try {
    const id = Number(idString);
    const foundAccount = await accountActions.findOne(id);
    if (!foundAccount) $.logAndExitNotFoundMessage('account', idString);

    const dependingTransaction = await transactionActions.findOne(undefined, {
      where: { account: foundAccount }
    });
    if (dependingTransaction) {
      const accountId = foundAccount?.id as number;
      $.logAndExitHasDependingEntry('delete', 'account', accountId);
    }

    await accountActions.delete(id);
    $.logSuccess('deleted', 'account', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('delete', 'account', error.message);
  }
}

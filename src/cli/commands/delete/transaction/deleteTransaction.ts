import { transactionActions } from '../../../../entity/Transaction/transactionActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

export async function deleteTransaction({ id: idString }: { id: string }) {
  try {
    const id = Number(idString);
    const foundTransaction = await transactionActions.findOne(id);
    if (!foundTransaction) $.logAndExitNotFoundMessage('transaction', idString);

    await transactionActions.delete(id);
    $.logSuccess('deleted', 'transaction', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('delete', 'transaction', error.message);
  }
}

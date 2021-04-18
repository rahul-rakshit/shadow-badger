import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { untag } from '../utils/untag';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { Transaction } from '../entity/Transaction/Transaction-d';

export async function untagTransaction(opts: { id: string; tags: string }) {
  const idString = opts.id;
  const id = Number(idString);
  const tagsToRemove = opts.tags;

  try {
    const foundTransaction = await transactionActions.findOne(id);
    if (!foundTransaction) $.logAndExitNotFoundMessage('transaction', idString);
    const transaction = foundTransaction as Transaction;

    transaction.tags = untag(transaction.tags ?? [], tagsToRemove);

    await transactionActions.edit(transaction);

    $.logSuccess('removed tag from', 'transaction', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError(
      'update tags of',
      'transaction',
      error.message
    );
  }
}

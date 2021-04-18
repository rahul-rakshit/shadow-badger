import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { Transaction } from '../entity/Transaction/Transaction-d';
import { tag } from '../utils/tag';

export async function tagTransaction(opts: { id: string; tags: string }) {
  const idString = opts.id;
  const id = Number(idString);

  try {
    const foundTransaction = await transactionActions.findOne(id);
    if (!foundTransaction) $.logAndExitNotFoundMessage('transaction', idString);
    const transaction = foundTransaction as Transaction;

    transaction.tags = tag(opts.tags, transaction.tags);

    await transactionActions.edit(transaction);
    $.logSuccess('updated tags of', 'transaction', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError(
      'update tags of',
      'transaction',
      error.message
    );
  }
}

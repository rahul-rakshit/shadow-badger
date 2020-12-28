import { parseDefinedOpts } from '../../../../utils/parseDefinedOpts';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { transactionActions } from '../../../../entity/Transaction/transactionActions';
import { Transaction } from '../../../../entity/Transaction/Transaction-d';
import { AllowedRelations } from '../../../../entity/generateActionsWrapper';

export async function viewTransaction(opts: {
  id?: string;
  dateTime?: string;
  amount?: string;
  description?: string;
  accountId?: string;
  categoryId?: string;
  vendorId?: string;
}) {
  const idString = opts.id;
  const id = Number(idString);

  if (parseDefinedOpts(opts) === {}) $.logAndExitNoFilterCriteria();

  try {
    const relations = ['account', 'category', 'vendor'] as AllowedRelations[];
    const foundTransaction = id
      ? await transactionActions.findOne(id, { relations })
      : await transactionActions.findOne(undefined, {
          where: parseDefinedOpts({ description: opts.description }),
          relations
        });

    if (!foundTransaction) $.logAndExitNotFoundMessage('transaction', opts.id);

    $.logObject(foundTransaction as Transaction, 'transaction');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'transaction', error.message);
  }
}

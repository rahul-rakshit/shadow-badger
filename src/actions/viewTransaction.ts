import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { areOptionsEmpty } from '../utils/areOptionsEmpty';
import { AllowedRelations } from '../entity/generateActionsWrapper';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { parseDefinedOpts } from '../utils/parseDefinedOpts';
import { Transaction } from '../entity/Transaction/Transaction-d';

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

  if (areOptionsEmpty(opts)) $.logAndExitNoFilterCriteria();

  try {
    const relations = ['account', 'category', 'vendor'] as AllowedRelations[];
    const searchOptions = {
      ...opts,
      id: opts.id ? Number(opts.id) : undefined,
      dateTime: opts.dateTime ? new Date(Date.parse(opts.dateTime)) : undefined,
      accountId: opts.accountId ? Number(opts.accountId) : undefined,
      categoryId: opts.categoryId ? Number(opts.categoryId) : undefined,
      vendorId: opts.vendorId ? Number(opts.vendorId) : undefined
    };
    const foundTransaction = id
      ? await transactionActions.findOne(id, { relations })
      : await transactionActions.findOne(undefined, {
          where: parseDefinedOpts(searchOptions),
          relations
        });

    if (!foundTransaction) $.logAndExitNotFoundMessage('transaction', opts.id);

    $.logObject(foundTransaction as Transaction, 'transaction');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'transaction', error.message);
  }
}

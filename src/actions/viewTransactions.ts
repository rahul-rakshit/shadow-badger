import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { parseDefinedOpts } from '../utils/parseDefinedOpts';
import { getDate } from '../utils/getDate';
import { transactionActions } from '../entity/Transaction/transactionActions';

export async function viewTransactions(opts: {
  dateTime?: string;
  amount?: string;
  description?: string;
  accountId?: string;
  categoryId?: string;
  vendorId?: string;
}) {
  const searchOptions = parseDefinedOpts({
    ...opts,
    dateTime: opts.dateTime ? getDate(opts.dateTime) : undefined,
    accountId: opts.accountId ? Number(opts.accountId) : undefined,
    categoryId: opts.categoryId ? Number(opts.categoryId) : undefined,
    vendorId: opts.vendorId ? Number(opts.vendorId) : undefined
  });

  try {
    const allTransactions = await transactionActions.findAll({
      relations: ['account', 'category', 'vendor'],
      where: searchOptions
    });
    if (allTransactions.length === 0) {
      $.logAndExitNotFoundMessage('transaction');
    }

    const loggable = allTransactions.map((transaction) => ({
      id: transaction.id,
      dateTime: transaction.dateTime?.toISOString(),
      amount: transaction.amount,
      account: transaction.account?.code,
      category: transaction.category?.code,
      vendor: transaction.vendor?.name
    }));
    $.logList(loggable, 'transactions', opts);
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'transactions', error.message);
  }
}

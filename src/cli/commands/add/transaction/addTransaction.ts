import { getDate } from '../../../../utils/getDate';
import { accountActions } from '../../../../entity/Account/accountActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { Transaction } from '../../../../entity/Transaction/Transaction-d';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { transactionValidatorMap } from '../../../../entity/Transaction/transactionValidatorMap';
import { failed } from '../../../../types-d';
import { transactionActions } from '../../../../entity/Transaction/transactionActions';

export async function addTransaction(opts: {
  dateTime: string;
  amount: string;
  description?: string;
  accountId: string;
  categoryId: string;
  vendorId: string;
}) {
  const amount = Number(opts.amount);
  const dateTime = getDate(opts.dateTime);
  const description = opts.description ?? '';
  const accountId = Number(opts.accountId);
  const categoryId = Number(opts.categoryId);
  const vendorId = Number(opts.vendorId);

  try {
    const account = await accountActions.findOne(accountId);
    if (!account) $.logAndExitNotFoundMessage('account', opts.accountId);
    const category = await categoryActions.findOne(categoryId);
    if (!category) $.logAndExitNotFoundMessage('category', opts.categoryId);
    const vendor = await vendorActions.findOne(vendorId);
    if (!vendor) $.logAndExitNotFoundMessage('vendor', opts.vendorId);

    const newTransaction: Transaction = {
      dateTime,
      amount,
      description,
      account,
      category,
      vendor
    };

    const validation = validateModelObject<Transaction>(
      newTransaction,
      transactionValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Transaction>(
        'add',
        'transaction',
        messageMap
      );
    } else {
      const { id } = await transactionActions.create(newTransaction);
      $.logSuccess('added', 'transaction', `with id ${id}`);
    }
  } catch (error) {
    $.logAndExitOnSqlEngineError('add', 'transaction', error.message);
  }
}

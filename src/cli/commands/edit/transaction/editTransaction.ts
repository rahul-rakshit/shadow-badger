import { transactionActions } from '../../../../entity/Transaction/transactionActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { Transaction } from '../../../../entity/Transaction/Transaction-d';
import { getDate } from '../../../../utils/getDate';
import { isNullish } from '../../../../utils/isNullish';
import { accountActions } from '../../../../entity/Account/accountActions';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { transactionValidatorMap } from '../../../../entity/Transaction/transactionValidatorMap';
import { failed } from '../../../../types-d';

export async function editTransaction(opts: {
  id: string;
  dateTime?: string;
  amount?: string;
  description?: string;
  accountId?: string;
  categoryId?: string;
  vendorId?: string;
}) {
  const id = Number(opts.id);
  try {
    const foundTransaction = await transactionActions.findOne(id, {
      relations: ['account', 'category', 'vendor']
    });
    if (!foundTransaction) $.logAndExitNotFoundMessage('transaction', opts.id);
    const tnx = foundTransaction as Transaction;

    if (opts.dateTime) tnx.dateTime = getDate(opts.dateTime);
    if (opts.amount) tnx.amount = opts.amount;
    if (!isNullish(opts.description)) tnx.description = opts.description;

    if (opts.accountId) {
      const foundAccount = await accountActions.findOne(Number(opts.accountId));
      if (!foundAccount) $.logAndExitNotFoundMessage('account', opts.accountId);
      else tnx.account = foundAccount;
    }

    if (opts.categoryId) {
      const categoryId = Number(opts.categoryId);
      const foundCategory = await categoryActions.findOne(categoryId);
      if (!foundCategory) {
        $.logAndExitNotFoundMessage('category', opts.categoryId);
      } else tnx.category = foundCategory;
    }

    if (opts.vendorId) {
      const vendorId = Number(opts.vendorId);
      const foundVendor = await vendorActions.findOne(vendorId);
      if (!foundVendor) {
        $.logAndExitNotFoundMessage('vendor', opts.vendorId);
      } else tnx.vendor = foundVendor;
    }

    const validation = validateModelObject<Transaction>(
      tnx,
      transactionValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Transaction>(
        'edit',
        'transaction',
        messageMap
      );
    }

    await transactionActions.edit(tnx);

    $.logSuccess('edited', 'transaction', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('edit', 'transaction', error.message);
  }
}

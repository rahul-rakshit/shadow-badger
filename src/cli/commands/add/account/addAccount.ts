import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { Account } from '../../../../entity/Account/Account-d';
import { failed } from '../../../../types-d';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { accountActions } from '../../../../entity/Account/accountActions';
import { accountValidatorMap } from '../../../../entity/Account/accountValidatorMap';
import { getDate } from '../../../../utils/getDate';

export async function addAccount(opts: {
  code: string;
  name: string;
  description?: string;
  currencyId: string;
  opened?: string;
  closed?: string;
}) {
  const currencyId = Number(opts.currencyId);
  const opened = opts.opened ? getDate(opts.opened) : null;
  const closed = opts.closed ? getDate(opts.closed) : null;
  const description = opts.description ?? '';
  try {
    const currency = await currencyActions.findOne(currencyId);
    if (!currency) $.logAndExitNotFoundMessage('currency', opts.currencyId);

    const newAccount: Account = {
      code: opts.code,
      name: opts.name,
      currency,
      description,
      closed,
      opened
    };
    if (opts.description === undefined) newAccount.description = '';

    const validation = validateModelObject<Account>(
      newAccount,
      accountValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Account>('add', 'account', messageMap);
    } else {
      const { id } = await accountActions.create(newAccount);
      $.logSuccess('added', 'account', `with id ${id}`);
    }
  } catch (error) {
    $.logAndExitOnSqlEngineError('add', 'account', error.message);
  }
}

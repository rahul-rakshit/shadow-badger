import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { accountActions } from '../entity/Account/accountActions';
import { Account } from '../entity/Account/Account-d';
import { isNullish } from '../utils/isNullish';
import { getDate } from '../utils/getDate';
import { currencyActions } from '../entity/Currency/currencyActions';
import { validateModelObject } from '../validations/validateModelObject';
import { accountValidatorMap } from '../entity/Account/accountValidatorMap';
import { failed } from '../types-d';

export async function editAccount(opts: {
  id: string;
  code?: string;
  name?: string;
  description?: string;
  currencyId?: string;
  opened?: string;
  closed?: string;
}) {
  const idString = opts.id;
  const id = Number(idString);
  const currencyIdString = opts.currencyId;
  const currencyId = Number(currencyIdString);
  const { code, name, description, closed, opened } = opts;

  try {
    const foundAccount = await accountActions.findOne(id, {
      relations: ['currency']
    });
    if (!foundAccount) $.logAndExitNotFoundMessage('account', idString);
    const account = foundAccount as Account;

    if (code !== undefined) account.code = code;
    if (name !== undefined) account.name = name;
    if (!isNullish(opened)) {
      if (opened === '') account.opened = null;
      else account.opened = getDate(opened as string);
    }
    if (!isNullish(closed)) {
      if (closed === '') account.closed = null;
      else account.closed = getDate(closed as string);
    }
    if (currencyId) {
      const foundCurrency = await currencyActions.findOne(currencyId);
      if (!foundCurrency)
        $.logAndExitNotFoundMessage('currency', currencyIdString);
      else account.currency = foundCurrency;
    }
    if (description !== undefined) account.description = description;

    const validation = validateModelObject<Account>(
      account,
      accountValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Account>('edit', 'account', messageMap);
    }

    await accountActions.edit(account);

    $.logSuccess('edited', 'account', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('edit', 'account', error.message);
  }
}

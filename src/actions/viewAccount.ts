import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { accountActions } from '../entity/Account/accountActions';
import { parseDefinedOpts } from '../utils/parseDefinedOpts';
import { Account } from '../entity/Account/Account-d';

export async function viewAccount(opts: {
  id?: string;
  name?: string;
  code?: string;
  currencyId?: string;
}) {
  const { name, code } = opts;
  const idString = opts.id;
  const id = Number(idString);
  const currencyId = opts.currencyId ? Number(opts.currencyId) : undefined;

  if (!idString && !name && !code && !currencyId) {
    $.logAndExitNoFilterCriteria();
  }

  try {
    const foundAccount = id
      ? await accountActions.findOne(id, { relations: ['currency'] })
      : await accountActions.findOne(undefined, {
          where: parseDefinedOpts({ name, code, currencyId }),
          relations: ['currency']
        });

    if (!foundAccount) $.logAndExitNotFoundMessage('account', opts.id);

    $.logObject(foundAccount as Account, 'account');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'account', error.message);
  }
}

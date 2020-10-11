import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { accountActions } from '../../../../entity/Account/accountActions';
import { parseDefinedOpts } from '../../../cli-helpers/parseDefinedOpts';
import { Account } from '../../../../entity/Account/Account-d';

export async function viewAccount(opts: {
  id?: string;
  name?: string;
  code?: string;
}) {
  const { name, code } = opts;
  const idString = opts.id;
  const id = Number(idString);

  if (!idString && !name && !code) $.logAndExitNoFilterCriteria();

  try {
    const foundAccount = id
      ? await accountActions.findOne(id, { relations: ['currency'] })
      : await accountActions.findOne(undefined, {
          where: parseDefinedOpts({ name, code }),
          relations: ['currency']
        });

    if (!foundAccount) $.logAndExitNotFoundMessage('account', opts.id);

    $.logObject(foundAccount as Account, 'account');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'account', error.message);
  }
}

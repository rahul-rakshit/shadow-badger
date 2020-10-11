import { accountActions } from '../../../../entity/Account/accountActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

export async function viewAccounts(opts: {
  code?: string;
  name?: string;
  description?: string;
}) {
  try {
    const allAccounts = await accountActions.findAll({
      relations: ['currency'],
      where: opts
    });
    if (allAccounts.length === 0) $.logAndExitNotFoundMessage('account');

    const loggable = allAccounts.map((account) => ({
      id: account.id,
      name: account.name,
      code: account.code,
      currencyId: account.currency?.id,
      currencyCode: account.currency?.code
    }));
    $.logList(loggable, 'accounts', opts);
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'accounts', error.message);
  }
}

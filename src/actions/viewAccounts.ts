import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { parseDefinedOpts } from '../utils/parseDefinedOpts';
import { accountActions } from '../entity/Account/accountActions';

export async function viewAccounts(opts: {
  code?: string;
  name?: string;
  description?: string;
  currencyId?: string;
}) {
  const searchOptions = parseDefinedOpts({
    ...opts,
    currencyId: opts.currencyId ? Number(opts.currencyId) : undefined
  });

  try {
    const allAccounts = await accountActions.findAll({
      relations: ['currency'],
      where: searchOptions
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

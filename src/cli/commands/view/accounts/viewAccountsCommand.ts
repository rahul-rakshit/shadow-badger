import { program } from 'commander';
import { accountActions } from '../../../../entity/Account/accountActions';
import { processUtil } from '../../../cli-helpers/processUtil';

const {
  logAndExitNotFoundMessage,
  logList,
  logAndExitOnSqlEngineError
} = processUtil;

export const viewAccountsCommand = program
  .command('accounts')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all accounts that satisfy certain criteria')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .action(async (opts: { code?: string; name?: string }) => {
    try {
      const allAccounts = await accountActions.findAll({
        relations: ['currency'],
        where: opts
      });
      if (allAccounts.length === 0) logAndExitNotFoundMessage('account');

      const loggable = allAccounts.map((account) => ({
        id: account.id,
        name: account.name,
        code: account.code,
        currencyId: account.currency?.id,
        currencyCode: account.currency?.code
      }));
      logList(loggable, 'accounts', opts);
    } catch (error) {
      logAndExitOnSqlEngineError('view', 'accounts', error.message);
    }
  });

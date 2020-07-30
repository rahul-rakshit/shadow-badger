import { program } from 'commander';
import { accountActions } from '../../../../entity/Account';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logList } from '../../../cli-helpers/logList';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';

export const viewAccountsCommand = program
  .command('accounts')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all accounts that satisfy certain criteria')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .option(
    '-d, --description <description>',
    'The account description, eg. My main checking account'
  )
  .action(
    async ({
      code,
      name,
      description
    }: {
      code?: string;
      name?: string;
      description?: string;
    }) => {
      try {
        const allAccounts = await accountActions.findAll({
          relations: ['currency']
        });
        if (allAccounts.length === 0) logAndExitNotFoundMessage('account');

        const loggable = allAccounts.map((account) => ({
          name: account.name,
          code: account.code,
          description: account.description,
          currencyId: account.currency?.id,
          currencyCode: account.currency?.code
        }));
        logList(loggable, 'accounts', { code, name, description });
      } catch (error) {
        logAndExitOnSqlEngineError('view', 'accounts', error.message);
      }
    }
  );

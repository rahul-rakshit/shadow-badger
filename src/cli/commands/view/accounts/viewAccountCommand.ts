import { program } from 'commander';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { logObject } from '../../../cli-helpers/logObject';
import { logAndExitNoFilterCriteria } from '../../../cli-helpers/logAndExitNoFilterCriteria';
import { accountActions, Account } from '../../../../entity/Account';

export const viewAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first account that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the currency')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .action(
    async (opts: {
      id?: string;
      name?: string;
      code?: string;
      symbol?: string;
    }) => {
      const { id, name, code } = opts;
      if (!id && !name && !code) logAndExitNoFilterCriteria();

      try {
        const foundAccount = id
          ? await accountActions.findOne(id)
          : await accountActions.findOne(undefined, {
              where: opts,
              relations: ['currency']
            });

        if (!foundAccount) logAndExitNotFoundMessage('account', opts.id);

        logObject(foundAccount as Account, 'account');
      } catch (error) {
        logAndExitOnSqlEngineError('view', 'account', error.message);
      }
    }
  );

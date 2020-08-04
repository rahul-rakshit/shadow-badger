import { program } from 'commander';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { logObject } from '../../../cli-helpers/logObject';
import { logAndExitNoFilterCriteria } from '../../../cli-helpers/logAndExitNoFilterCriteria';
import { parseDefinedOpts } from '../../../cli-helpers/parseDefinedOpts';
import { Account } from '../../../../entity/Account/Account-d';
import { accountActions } from '../../../../entity/Account/accountActions';

export const viewAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display the first account that satisfies certain criteria')
  .option('-id, --id, <id>', 'The id of the currency')
  .option('-c, --code, <code>', 'The account code, eg. MNZO')
  .option('-n, --name <name>', 'The account name, eg. Monzo')
  .action(async (opts: { id?: string; name?: string; code?: string }) => {
    const { name, code } = opts;
    const idString = opts.id;
    const id = Number(idString);

    if (!idString && !name && !code) logAndExitNoFilterCriteria();

    try {
      const foundAccount = id
        ? await accountActions.findOne(id)
        : await accountActions.findOne(undefined, {
            where: parseDefinedOpts({ name, code }),
            relations: ['currency']
          });

      if (!foundAccount) logAndExitNotFoundMessage('account', opts.id);

      logObject(foundAccount as Account, 'account');
    } catch (error) {
      logAndExitOnSqlEngineError('view', 'account', error.message);
    }
  });

import { program } from 'commander';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { accountActions } from '../../../../entity/Account';

export const deleteAccountCommand = program
  .command('account')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete an account')
  .requiredOption('-id, --id, <id>', 'The id of the account to delete')
  .action(async ({ id: idString }: { id: string }) => {
    try {
      const id = Number(idString);
      const foundAccount = await accountActions.findOne(id);
      if (!foundAccount) logAndExitNotFoundMessage('account', idString);

      await accountActions.delete(id);
      logSuccess('deleted', 'account', `with id ${id}`);
    } catch (error) {
      logAndExitOnSqlEngineError('delete', 'account', error.message);
    }
  });

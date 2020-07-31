import { program } from 'commander';
import { currencyActions } from '../../../../entity/Currency';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';
import { logAndExitNotFoundMessage } from '../../../cli-helpers/logAndExitNotFoundMessage';
import { accountActions } from '../../../../entity/Account';
import { logAndExitHasDependingEntry } from '../../../cli-helpers/logAndExitHasDependingEntry';

export const deleteCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a currency')
  .requiredOption('-id, --id, <id>', 'The id of the currency to edit')
  .action(async ({ id }: { id: string }) => {
    try {
      const foundCurrency = await currencyActions.findOne(id);
      if (!foundCurrency) logAndExitNotFoundMessage('currency', id);

      const dependingAccount = await accountActions.findOne(undefined, {
        where: { currency: foundCurrency }
      });
      if (dependingAccount) {
        logAndExitHasDependingEntry(
          'delete',
          'currency',
          foundCurrency?.id as string,
          'account',
          dependingAccount?.id as string
        );
      }

      await currencyActions.delete(id);
      logSuccess('deleted', 'currency', `with id ${id}`);
    } catch (error) {
      logAndExitOnSqlEngineError('add', 'currency', error.message);
    }
  });

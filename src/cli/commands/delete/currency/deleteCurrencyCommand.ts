import { program } from 'commander';
import { accountActions } from '../../../../entity/Account/accountActions';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

export const deleteCurrencyCommand = program
  .command('currency')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('delete a currency')
  .requiredOption('-id, --id, <id>', 'The id of the currency to delete')
  .action(async ({ id: idString }: { id: string }) => {
    try {
      const id = Number(idString);
      const foundCurrency = await currencyActions.findOne(id);
      if (!foundCurrency) $.logAndExitNotFoundMessage('currency', idString);

      const dependingAccount = await accountActions.findOne(undefined, {
        where: { currency: foundCurrency }
      });
      if (dependingAccount) {
        const currencyId = foundCurrency?.id as number;
        $.logAndExitHasDependingEntry('delete', 'currency', currencyId);
      }

      await currencyActions.delete(id);
      $.logSuccess('deleted', 'currency', `with id ${id}`);
    } catch (error) {
      $.logAndExitOnSqlEngineError('delete', 'currency', error.message);
    }
  });

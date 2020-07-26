import { program } from 'commander';
import { currencyActions } from '../../../../entity/Currency';
import { logList } from '../../../cli-helpers/logList';
import { logAndExitOnSqlEngineError } from '../../../cli-helpers/logAndExitOnSqlEngineError';

export const viewCurrenciesCommand = program
  .command('currencies')
  .description('display all currencies that satisfy certain criteria')
  .action(async () => {
    try {
      const allCurrencies = await currencyActions.findAll();
      logList(allCurrencies, 'currencies');
    } catch (error) {
      logAndExitOnSqlEngineError('view', 'currencies', error.message);
    }
  });

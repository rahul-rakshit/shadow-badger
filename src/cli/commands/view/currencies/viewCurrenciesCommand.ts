import { program } from 'commander';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

export const viewCurrenciesCommand = program
  .command('currencies')
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .description('display all currencies that satisfy certain criteria')
  .option('-c, --code, <code>', 'The currency code, eg. USD')
  .option('-n, --name <name>', 'The currency name, eg. US_Dollar')
  .option('-$, --symbol <symbol>', 'The currency symbol, eg. $')
  .action(async (opts: { name?: string; code?: string; symbol?: string }) => {
    try {
      const allCurrencies = await currencyActions.findAll({ where: opts });
      if (allCurrencies.length === 0) $.logAndExitNotFoundMessage('currency');

      const loggable = allCurrencies.map((currency) => ({
        id: currency.id,
        name: currency.name,
        code: currency.code,
        symbol: currency.symbol
      }));

      $.logList(loggable, 'currencies', opts);
    } catch (error) {
      $.logAndExitOnSqlEngineError('view', 'currencies', error.message);
    }
  });

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { currencyActions } from '../entity/Currency/currencyActions';

export async function viewCurrencies(opts: {
  name?: string;
  code?: string;
  symbol?: string;
}) {
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
}

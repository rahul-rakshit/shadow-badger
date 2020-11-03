import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { Currency } from '../../../../entity/Currency/Currency-d';
import { parseDefinedOpts } from '../../../../utils/parseDefinedOpts';

export async function viewCurrency(opts: {
  id?: string;
  name?: string;
  code?: string;
  symbol?: string;
}) {
  const { name, code, symbol } = opts;
  const idString = opts.id;
  const id = Number(idString);

  if (!idString && !name && !code && !symbol) $.logAndExitNoFilterCriteria();

  try {
    const foundCurrency = id
      ? await currencyActions.findOne(id)
      : await currencyActions.findOne(undefined, {
          where: parseDefinedOpts({ name, code, symbol })
        });

    if (!foundCurrency) $.logAndExitNotFoundMessage('currency', opts.id);

    $.logObject(foundCurrency as Currency, 'currency');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'currency', error.message);
  }
}

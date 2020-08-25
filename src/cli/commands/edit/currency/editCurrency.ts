import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { Currency } from '../../../../entity/Currency/Currency-d';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { currencyValidatorMap } from '../../../../entity/Currency/currencyValidatorMap';
import { failed } from '../../../../types-d';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

export async function editCurrency(opts: {
  id: string;
  name?: string;
  code?: string;
  symbol?: string;
  description?: string;
}) {
  const idString = opts.id;
  const id = Number(idString);
  const { name, code, symbol, description } = opts;

  try {
    const foundCurrency = await currencyActions.findOne(id);
    if (!foundCurrency) $.logAndExitNotFoundMessage('currency', idString);
    const currency = foundCurrency as Currency;

    if (name !== undefined) currency.name = name;
    if (code !== undefined) currency.code = code;
    if (symbol !== undefined) currency.symbol = symbol;
    if (description !== undefined) currency.description = description;

    const validation = validateModelObject<Currency>(
      currency,
      currencyValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Currency>('edit', 'currency', messageMap);
    } else {
      await currencyActions.edit(currency);
      $.logSuccess('edited', 'currency', `with id ${id}`);
    }
  } catch (error) {
    $.logAndExitOnSqlEngineError('edit', 'currency', error.message);
  }
}

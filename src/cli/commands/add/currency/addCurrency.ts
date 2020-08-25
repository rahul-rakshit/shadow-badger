import { Currency } from '../../../../entity/Currency/Currency-d';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { currencyValidatorMap } from '../../../../entity/Currency/currencyValidatorMap';
import { failed } from '../../../../types-d';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

export async function addCurrency(opts: {
  name: string;
  code: string;
  symbol: string;
  description?: string;
}) {
  const newCurrency: Currency = opts;
  const validation = validateModelObject<Currency>(
    newCurrency,
    currencyValidatorMap
  );

  if (failed(validation)) {
    const messageMap = validation.value;
    $.logAndExitOnValidationFailure<Currency>('add', 'currency', messageMap);
  } else {
    try {
      const { id } = await currencyActions.create(newCurrency);
      $.logSuccess('added', 'currency', `with id ${id}`);
    } catch (error) {
      $.logAndExitOnSqlEngineError('add', 'currency', error.message);
    }
  }
}

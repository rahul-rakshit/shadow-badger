jest.mock('../../../cli-helpers/logAndExitOnValidationFailure');
jest.mock('../../../../entity/Currency/currencyActions');
jest.mock('../../../cli-helpers/logSuccess');

import { validateModelObject } from '../../../../validations/validateModelObject';
import { currencyValidatorMap } from '../../../../entity/Currency/currencyValidatorMap';
import { logAndExitOnValidationFailure } from '../../../cli-helpers/logAndExitOnValidationFailure';
import { addCurrency } from './addCurrency';
import { logSuccess } from '../../../cli-helpers/logSuccess';
import { currencyActions } from '../../../../entity/Currency/currencyActions';

describe('addCurrency', () => {
  it('exits with failure when validation fails', async () => {
    const currencyToAdd = {
      name: 'Fake currency with incorrect code',
      code: 'CODE',
      symbol: 'F',
      description: 'Code has 4 chars but should have 3'
    };
    const { value: messageMap } = validateModelObject(
      currencyToAdd,
      currencyValidatorMap
    );

    await addCurrency(currencyToAdd);

    expect(logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'add',
      'currency',
      messageMap
    );
  });

  it('adds a currency to DB if successful', async () => {
    currencyActions.create = jest.fn().mockResolvedValue({ id: '🍌' });
    const gbp = {
      name: 'Great Britain Pound',
      code: 'GBP',
      symbol: '£'
    };

    await addCurrency(gbp);

    expect(currencyActions.create).toHaveBeenCalledWith(gbp);
    expect(logSuccess).toHaveBeenCalledWith('added', 'currency', 'with id 🍌');
  });
});

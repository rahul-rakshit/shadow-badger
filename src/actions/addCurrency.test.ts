import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { validateModelObject } from '../validations/validateModelObject';
import { currencyValidatorMap } from '../entity/Currency/currencyValidatorMap';
import { addCurrency } from './addCurrency';
import { currencyActions } from '../entity/Currency/currencyActions';

jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Currency/currencyActions');

describe('addCurrency', () => {
  beforeEach(jest.resetAllMocks);

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

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
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
      symbol: '£',
      description: 'Currency of the United Kingdom'
    };

    await addCurrency(gbp);

    expect(currencyActions.create).toHaveBeenCalledWith(gbp);
    expect($.logSuccess).toHaveBeenCalledWith(
      'added',
      'currency',
      'with id 🍌'
    );
  });

  it('auto-adds optional fields (eg. description) as empty strings', async () => {
    const usd = {
      name: 'United States Dollar',
      code: 'USD',
      symbol: '$'
    };
    const usdWithEmptyDescription = { ...usd, description: '' };

    await addCurrency(usd);

    expect(currencyActions.create).toHaveBeenCalledWith(
      usdWithEmptyDescription
    );
  });

  it('exits with message if the is an sql engine error', async () => {
    currencyActions.create = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });
    const gbp = {
      name: 'Great Britain Pound',
      code: 'GBP',
      symbol: '£'
    };

    await addCurrency(gbp);

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'add',
      'currency',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

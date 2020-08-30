jest.mock('../../../../entity/Currency/currencyActions');
jest.mock('../../../cli-helpers/processUtil');

import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { viewCurrencies } from './viewCurrencies';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

describe('viewCurrencies', () => {
  const currenciesList = [
    { id: 1, name: 'first', code: 'AAA', symbol: '$' },
    { id: 2, name: 'second', code: 'BBB', symbol: '$' },
    { id: 3, name: 'third', code: 'CCC', symbol: '$' }
  ];

  it('shows all currencies that were found', async () => {
    currencyActions.findAll = jest.fn().mockResolvedValue(currenciesList);

    await viewCurrencies({ symbol: '$' });

    expect(currencyActions.findAll).toHaveBeenCalledWith({
      where: { symbol: '$' }
    });
    expect($.logList).toHaveBeenCalledWith(currenciesList, 'currencies', {
      symbol: '$'
    });
  });

  it('only calls logList with id, name, code and symbol', async () => {
    const currenciesWithExtraFiels = currenciesList.map((currency) => ({
      ...currency,
      a: '1',
      b: '2',
      blabla: 'hello'
    }));
    currencyActions.findAll = jest
      .fn()
      .mockResolvedValue(currenciesWithExtraFiels);

    await viewCurrencies({ symbol: '$' });

    expect(currencyActions.findAll).toHaveBeenCalledWith({
      where: { symbol: '$' }
    });
    expect($.logList).toHaveBeenCalledWith(currenciesList, 'currencies', {
      symbol: '$'
    });
  });

  it('can also be called with an empty map of options', async () => {
    currencyActions.findAll = jest.fn().mockResolvedValue(currenciesList);

    await viewCurrencies({});

    expect(currencyActions.findAll).toHaveBeenCalledWith({ where: {} });
    expect($.logList).toHaveBeenCalledWith(currenciesList, 'currencies', {
      symbol: '$'
    });
  });

  it('exits with message if the is an sql engine error', async () => {
    currencyActions.findAll = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await viewCurrencies({});

    expect(currencyActions.findAll).toHaveBeenCalledWith({ where: {} });
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'view',
      'currencies',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

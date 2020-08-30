jest.mock('../../../../entity/Currency/currencyActions');
jest.mock('../../../cli-helpers/processUtil');

import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { viewCurrency } from './viewCurrency';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { Currency } from '../../../../entity/Currency/Currency-d';

describe('viewCurrency', () => {
  describe('when id is provided', () => {
    it('exits with a message when provided id is invalid', async () => {
      currencyActions.findOne = jest.fn().mockResolvedValue(null);

      await viewCurrency({ id: '9999' });

      expect(currencyActions.findOne).toHaveBeenCalledWith(9999);
      expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
        'currency',
        '9999'
      );
    });

    it('logs the object when the entry is found', async () => {
      const dummyCurrency: Currency = {
        id: 1234,
        code: 'DUM',
        name: 'Dummy valid currerncy',
        symbol: 'D'
      };
      currencyActions.findOne = jest.fn().mockResolvedValue(dummyCurrency);

      await viewCurrency({ id: '1234' });

      expect(currencyActions.findOne).toHaveBeenCalledWith(1234);
      expect($.logObject).toHaveBeenCalledWith(dummyCurrency, 'currency');
    });
  });

  describe('when id is not provided', () => {
    it('tries to find a currency with the provided options', async () => {
      await viewCurrency({ name: 'Dummy currency', code: 'DUM' });

      expect(currencyActions.findOne).toHaveBeenCalledWith(undefined, {
        where: {
          name: 'Dummy currency',
          code: 'DUM'
        }
      });
    });

    it('exits with a message when no filters are provided', async () => {
      await viewCurrency({});

      expect($.logAndExitNoFilterCriteria).toHaveBeenCalled();
    });

    it('logs the entry when found', async () => {
      const dummyCurrency: Currency = {
        id: 1234,
        code: 'DUM',
        name: 'Dummy valid currerncy',
        symbol: 'D'
      };
      currencyActions.findOne = jest.fn().mockResolvedValue(dummyCurrency);

      await viewCurrency({ code: 'DUM' });

      expect(currencyActions.findOne).toHaveBeenCalledWith(undefined, {
        where: { code: 'DUM' }
      });
      expect($.logObject).toHaveBeenCalledWith(dummyCurrency, 'currency');
    });
  });
});

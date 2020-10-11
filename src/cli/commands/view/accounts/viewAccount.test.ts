jest.mock('../../../cli-helpers/processUtil');
jest.mock('../../../../entity/Account/accountActions');

import { Account } from '../../../../entity/Account/Account-d';
import { Currency } from '../../../../entity/Currency/Currency-d';
import { accountActions } from '../../../../entity/Account/accountActions';
import { viewAccount } from './viewAccount';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

describe('viewAccount', () => {
  const euro: Currency = { id: 1, name: 'Euro', code: 'EUR', symbol: '€' };
  const n26Account: Account = {
    id: 2,
    name: 'n26',
    code: 'N°26',
    description: 'bank',
    currencyId: 1,
    currency: euro,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 2
  };

  describe('when id is provided', () => {
    it('logs the object when the entry is found', async () => {
      accountActions.findOne = jest.fn().mockResolvedValue(n26Account);

      await viewAccount({ id: '2' });

      expect(accountActions.findOne).toHaveBeenCalledWith(2, {
        relations: ['currency']
      });
      expect($.logObject).toHaveBeenCalledWith(n26Account, 'account');
    });

    it('exits with a message when provided id is invalid', async () => {
      accountActions.findOne = jest.fn().mockResolvedValue(null);

      await viewAccount({ id: '1234' });

      expect(accountActions.findOne).toHaveBeenCalledWith(1234, {
        relations: ['currency']
      });
      expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
        'account',
        '1234'
      );
    });
  });

  describe('when id is not provided', () => {
    it('logs the entry when found', async () => {
      accountActions.findOne = jest.fn().mockResolvedValue(n26Account);

      await viewAccount({ code: 'N°26' });

      expect(accountActions.findOne).toHaveBeenCalledWith(undefined, {
        relations: ['currency'],
        where: { code: 'N°26' }
      });
      expect($.logObject).toHaveBeenCalledWith(n26Account, 'account');
    });

    it('tries to find an account with the provided options', async () => {
      await viewAccount({ code: 'N°26', name: 'n26' });

      expect(accountActions.findOne).toHaveBeenCalledWith(undefined, {
        relations: ['currency'],
        where: {
          code: 'N°26',
          name: 'n26'
        }
      });
    });

    it('exits with a message when no filters are provided', async () => {
      await viewAccount({});

      expect($.logAndExitNoFilterCriteria).toHaveBeenCalled();
    });

    it('exits with a message if there is an sql engine error', async () => {
      accountActions.findOne = jest.fn().mockImplementation(async () => {
        throw new Error("Don't do that, postgres is tickling there!");
      });

      await viewAccount({ id: '1234' });

      expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
        'view',
        'account',
        "Don't do that, postgres is tickling there!"
      );
    });
  });
});

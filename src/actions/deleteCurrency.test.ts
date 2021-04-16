jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Currency/currencyActions');
jest.mock('../entity/Account/accountActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { currencyActions } from '../entity/Currency/currencyActions';
import { deleteCurrency } from './deleteCurrency';
import { accountActions } from '../entity/Account/accountActions';

describe('deleteCurrency', () => {
  it("exits with a failure when the passed currency's id is invalid", async () => {
    currencyActions.findOne = jest.fn().mockResolvedValue(null);

    await deleteCurrency({ id: '1234' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'currency',
      '1234'
    );
  });

  it('exits with a failure if there is a depending account', async () => {
    currencyActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 1234, rest: 'dummy currency' });
    accountActions.findOne = jest.fn().mockResolvedValue('dummy account');

    await deleteCurrency({ id: '1234' });

    expect($.logAndExitHasDependingEntry).toHaveBeenCalledWith(
      'delete',
      'currency',
      1234
    );
  });

  it('deletes the currency in the DB if successful', async () => {
    currencyActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 1234, rest: 'dummy currency' });

    await deleteCurrency({ id: '1234' });

    expect($.logSuccess('deleted', 'currency'));
  });

  it('exits with message when there is an sql engine error', async () => {
    currencyActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await deleteCurrency({ id: '1234' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'delete',
      'currency',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

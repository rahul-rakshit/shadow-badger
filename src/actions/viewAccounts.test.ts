jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Account/accountActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { accountActions } from '../entity/Account/accountActions';
import { viewAccounts } from './viewAccounts';
import { Account } from '../entity/Account/Account-d';

describe('viewAccounts', () => {
  const currenciesList = [
    { id: 1, name: 'Euro', code: 'EUR', symbol: '€' },
    { id: 2, name: 'Great Britain Pound', code: 'GBP', symbol: '£' },
    { id: 3, name: 'United States Dollar', code: 'USD', symbol: '$' }
  ];
  const accountsList = [
    {
      id: 1,
      name: 'monzo',
      code: 'MNZO',
      description: 'bank',
      currencyId: 2,
      currency: currenciesList[1],
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 3
    },
    {
      id: 2,
      name: 'n26',
      code: 'N°26',
      description: 'bank',
      currencyId: 1,
      currency: currenciesList[0],
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 2
    },
    {
      id: 3,
      name: 'Bank of America',
      code: 'BOAM',
      description: 'bank',
      currencyId: 3,
      currency: currenciesList[2],
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 4
    }
  ];

  it('shows all accounts that were found', async () => {
    accountActions.findAll = jest.fn().mockResolvedValue(accountsList);

    await viewAccounts({ description: 'bank' });

    expect(accountActions.findAll).toHaveBeenCalledWith({
      relations: ['currency'],
      where: { description: 'bank' }
    });
    const loggedArray: Account[] = ($.logList as any).mock.calls[0][0];
    expect($.logList).toHaveBeenCalledWith(expect.anything(), 'accounts', {
      description: 'bank'
    });
    expect(loggedArray).toHaveLength(3);
    const loggedArrayCodes = loggedArray.map((account) => account.code);
    expect(loggedArrayCodes).toEqual(['MNZO', 'N°26', 'BOAM']);
  });

  it('only logs id, name, code, currencyId and currency', async () => {
    accountActions.findAll = jest.fn().mockResolvedValue(accountsList);

    await viewAccounts({ description: 'bank' });

    const expectedLoggedArray = [
      {
        id: 1,
        name: 'monzo',
        code: 'MNZO',
        currencyId: 2,
        currencyCode: 'GBP'
      },
      {
        id: 2,
        name: 'n26',
        code: 'N°26',
        currencyId: 1,
        currencyCode: 'EUR'
      },
      {
        id: 3,
        name: 'Bank of America',
        code: 'BOAM',
        currencyId: 3,
        currencyCode: 'USD'
      }
    ];
    const loggedArray: Account[] = ($.logList as any).mock.calls[0][0];
    expect(loggedArray).toEqual(expectedLoggedArray);
  });

  it('can also be called with an empty map of options', async () => {
    accountActions.findAll = jest.fn().mockResolvedValue(accountsList);

    await viewAccounts({ description: 'bank' });

    const loggedArray: Account[] = ($.logList as any).mock.calls[0][0];
    expect(loggedArray).toHaveLength(3);
  });

  it('exits with a message if there is an sql engine error', async () => {
    accountActions.findAll = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await viewAccounts({});

    expect(accountActions.findAll).toHaveBeenCalled();
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'view',
      'accounts',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

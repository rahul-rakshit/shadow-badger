jest.mock('../entity/Currency/currencyActions');
jest.mock('../entity/Account/accountActions');
jest.mock('../cli/cli-helpers/processUtil');

import { currencyActions } from '../entity/Currency/currencyActions';
import { accountActions } from '../entity/Account/accountActions';
import { addAccount } from './addAccount';
import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { validateModelObject } from '../validations/validateModelObject';
import { accountValidatorMap } from '../entity/Account/accountValidatorMap';

describe('addAccount', () => {
  beforeEach(jest.resetAllMocks);

  it('adds an account to DB if successful', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    currencyActions.findOne = jest.fn().mockResolvedValue(dummyCurrency);
    const dummyAccount = {
      name: 'dumaccount',
      code: 'DACC'
    };
    accountActions.create = jest
      .fn()
      .mockResolvedValue({ id: 4, ...dummyAccount });

    await addAccount({ ...dummyAccount, currencyId: '1' });

    expect(accountActions.create).toHaveBeenCalledWith({
      ...dummyAccount,
      currency: dummyCurrency,
      opened: null,
      closed: null,
      description: ''
    });
    expect(currencyActions.findOne).toHaveBeenCalledWith(1);
    expect($.logSuccess).toHaveBeenCalledWith('added', 'account', 'with id 4');
  });

  it('exits with "not found" message when related currency is not found', async () => {
    currencyActions.findOne = jest.fn().mockResolvedValue(null);

    await addAccount({
      name: 'account with non-existent currency',
      code: 'BAAD',
      currencyId: '9999'
    });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'currency',
      '9999'
    );
  });

  it('exits with failure when validation fails', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    currencyActions.findOne = jest.fn().mockResolvedValue(dummyCurrency);
    const dummyAccount = {
      name: 'Account with bad code',
      code: 'BAAAAAD CODE!'
    };
    const { value: expectedMessageMap } = validateModelObject(
      { ...dummyAccount, currency: dummyCurrency },
      accountValidatorMap
    );

    await addAccount({ ...dummyAccount, currencyId: '1' });

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'add',
      'account',
      expectedMessageMap
    );
  });

  it('exits with message if there is an sql engine error', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    currencyActions.findOne = jest.fn().mockResolvedValue(dummyCurrency);
    const dummyAccount = {
      name: 'dumaccount',
      code: 'DACC',
      description: 'My dummy account'
    };
    accountActions.create = jest.fn().mockImplementation(async () => {
      throw new Error('Help, some fatal crazy insane exception!');
    });
    await addAccount({ ...dummyAccount, currencyId: '1' });

    expect(accountActions.create).toHaveBeenCalledWith({
      ...dummyAccount,
      currency: dummyCurrency,
      opened: null,
      closed: null
    });
    expect(currencyActions.findOne).toHaveBeenCalledWith(1);
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'add',
      'account',
      'Help, some fatal crazy insane exception!'
    );
  });
});

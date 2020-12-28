jest.mock('../../../../entity/Account/accountActions');
jest.mock('../../../cli-helpers/processUtil');

import { accountActions } from '../../../../entity/Account/accountActions';
import { editAccount } from './editAccount';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { accountValidatorMap } from '../../../../entity/Account/accountValidatorMap';
import { Account } from '../../../../entity/Account/Account-d';
import { currencyActions } from '../../../../entity/Currency/currencyActions';

describe('editAccount', () => {
  beforeEach(jest.resetAllMocks);

  it('updates the account in the DB if successful', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    const dummyAccount = {
      id: 4,
      name: 'dumaccount',
      code: 'DACC',
      description: 'My dummy account',
      currency: dummyCurrency,
      opened: null,
      closed: null
    };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);

    await editAccount({ id: '4', name: 'Replaced name' });

    expect(accountActions.edit).toHaveBeenCalledWith({
      ...dummyAccount,
      name: 'Replaced name'
    });
    expect(accountActions.findOne).toHaveBeenCalledWith(4, expect.anything());
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'account', 'with id 4');
  });

  it('exits with a failure when provided id is invalid', async () => {
    accountActions.findOne = jest.fn().mockResolvedValue(null);

    await editAccount({ id: '4', name: 'Replaced name' });

    expect(accountActions.findOne).toHaveBeenCalledWith(4, expect.anything());
    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('account', '4');
  });

  it('exits with a failure when the update fails validation', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    const dummyAccount: Account = {
      id: 4,
      name: 'account with invalid code',
      code: 'CODE',
      description: 'My dummy account',
      currency: dummyCurrency
    };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    const accountUpdate = { ...dummyAccount, code: 'invalid_code' };
    const { value: messageMap } = validateModelObject(
      accountUpdate,
      accountValidatorMap
    );

    await editAccount({ ...accountUpdate, id: '4' } as any);

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'edit',
      'account',
      messageMap
    );
  });

  it('can update optional fields (eg. description) to ""', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    const dummyAccount: Account = {
      id: 4,
      name: 'dumaccount',
      code: 'DACC',
      description: 'A description that will be deleted later',
      currency: dummyCurrency,
      opened: null,
      closed: null
    };
    const accountWithResetDescription = { ...dummyAccount, description: '' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);

    await editAccount({ ...accountWithResetDescription, id: '4' } as any);

    expect(accountActions.edit).toHaveBeenCalledWith(
      accountWithResetDescription
    );
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'account', 'with id 4');
  });

  it('can update optional fields (eg. opened) with a date', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    const dummyAccount: Account = {
      id: 4,
      name: 'dumaccount',
      code: 'DACC',
      description: '',
      currency: dummyCurrency,
      opened: null,
      closed: null
    };
    const accountWithOpenedDate = {
      ...dummyAccount,
      opened: new Date(Date.parse('2020/12/13'))
    };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);

    await editAccount({ ...accountWithOpenedDate, id: '4' } as any);

    expect(accountActions.edit).toHaveBeenCalledWith(accountWithOpenedDate);
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'account', 'with id 4');
  });

  it('can set a date field to null by specifying an empty string', async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    const dummyAccount: Account = {
      id: 4,
      name: 'dumaccount',
      code: 'DACC',
      description: '',
      currency: dummyCurrency,
      opened: new Date(Date.parse('2020/12/13')),
      closed: null
    };
    const accountWithResetDate = {
      ...dummyAccount,
      opened: ''
    };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);

    await editAccount({
      ...accountWithResetDate,
      id: '4'
    } as any);

    expect(accountActions.edit).toHaveBeenCalledWith({
      ...accountWithResetDate,
      opened: null
    });
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'account', 'with id 4');
  });

  it("can't update account if passed currencyId is invalid", async () => {
    const dummyCurrency = { id: 1, name: 'dummy', code: 'DUM', symbol: 'Đ' };
    const dummyAccount = {
      id: 4,
      name: 'dumaccount',
      code: 'DACC',
      description: 'My dummy account',
      currency: dummyCurrency,
      opened: null,
      closed: null
    };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    currencyActions.findOne = jest.fn().mockResolvedValue(null);

    await editAccount({ id: '4', currencyId: '7' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('currency', '7');
  });

  it('exits with a message when there is an sql engine error', async () => {
    accountActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await editAccount({ id: '1234', code: 'WAT' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'edit',
      'account',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

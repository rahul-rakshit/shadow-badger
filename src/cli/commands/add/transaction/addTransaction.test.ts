jest.mock('../../../../entity/Account/accountActions');
jest.mock('../../../../entity/Category/categoryActions');
jest.mock('../../../../entity/Vendor/vendorActions');
jest.mock('../../../cli-helpers/processUtil');

import { accountActions } from '../../../../entity/Account/accountActions';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { transactionActions } from '../../../../entity/Transaction/transactionActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { addTransaction } from './addTransaction';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { transactionValidatorMap } from '../../../../entity/Transaction/transactionValidatorMap';

describe('addTransaction', () => {
  beforeEach(jest.resetAllMocks);

  it('adds a transaction to DB if successful', async () => {
    const dummyAccount = { id: 1, text: 'account' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    const dummyCategory = { id: 2, text: 'category' };
    categoryActions.findOne = jest.fn().mockResolvedValue(dummyCategory);
    const dummyVendor = { id: 3, text: 'vendor' };
    vendorActions.findOne = jest.fn().mockResolvedValue(dummyVendor);
    const dummyTransactionInput = {
      dateTime: '2020/08/17',
      amount: '99.99',
      description: 'Just another time I spent money'
    };
    transactionActions.create = jest.fn().mockResolvedValue({
      id: 10,
      ...dummyTransactionInput
    });

    await addTransaction({
      ...dummyTransactionInput,
      accountId: '1',
      categoryId: '2',
      vendorId: '3'
    });

    expect(transactionActions.create).toHaveBeenCalledWith({
      dateTime: new Date(Date.parse('2020/08/17')),
      amount: 99.99,
      description: 'Just another time I spent money',
      account: dummyAccount,
      category: dummyCategory,
      vendor: dummyVendor
    });
    expect(accountActions.findOne).toHaveBeenCalledWith(1);
    expect(categoryActions.findOne).toHaveBeenCalledWith(2);
    expect(vendorActions.findOne).toHaveBeenCalledWith(3);
    expect($.logSuccess).toHaveBeenCalledWith(
      'added',
      'transaction',
      'with id 10'
    );
  });

  it('exits with "not found" if a relation is not found', async () => {
    accountActions.findOne = jest.fn().mockResolvedValue(null);
    categoryActions.findOne = jest.fn().mockResolvedValue({});
    vendorActions.findOne = jest.fn().mockResolvedValue({});

    await addTransaction({
      dateTime: '2020/08/17',
      amount: '99.99',
      description: 'A transaction with a non-existent account',
      accountId: '999',
      categoryId: '123',
      vendorId: '456'
    });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('account', '999');
  });

  it('exits with failure when validation fails', async () => {
    const dummyAccount = { id: 1, text: 'account' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    const dummyCategory = { id: 2, text: 'category' };
    categoryActions.findOne = jest.fn().mockResolvedValue(dummyCategory);
    const dummyVendor = { id: 3, text: 'vendor' };
    vendorActions.findOne = jest.fn().mockResolvedValue(dummyVendor);
    const dummyTransactionInput = {
      dateTime: '2020/08/17',
      amount: 'some text that is definitely not a number',
      description: 'Just another time I spent money'
    };
    const dummyTransaction = {
      dateTime: new Date(Date.parse('2020/08/17')),
      amount: Number('invalid number'),
      description: 'Just another time I spent money'
    };
    transactionActions.create = jest.fn().mockResolvedValue({
      id: 10,
      ...dummyTransactionInput
    });
    const { value: expectedMessageMap } = validateModelObject(
      dummyTransaction,
      transactionValidatorMap
    );

    await addTransaction({
      ...dummyTransactionInput,
      accountId: '1',
      categoryId: '2',
      vendorId: '3'
    });

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'add',
      'transaction',
      expectedMessageMap
    );
  });

  it('exits with message if there is an sql engine error', async () => {
    const dummyAccount = { id: 1, text: 'account' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    const dummyCategory = { id: 2, text: 'category' };
    categoryActions.findOne = jest.fn().mockResolvedValue(dummyCategory);
    const dummyVendor = { id: 3, text: 'vendor' };
    vendorActions.findOne = jest.fn().mockResolvedValue(dummyVendor);
    const dummyTransactionInput = {
      dateTime: '2020/08/17',
      amount: '99.99',
      description: 'Just another time I spent money'
    };
    transactionActions.create = jest.fn().mockImplementation(async () => {
      throw new Error('Help, some fatal crazy insane exception!');
    });

    await addTransaction({
      ...dummyTransactionInput,
      accountId: '1',
      categoryId: '2',
      vendorId: '3'
    });

    expect(transactionActions.create).toHaveBeenCalledWith({
      dateTime: new Date(Date.parse('2020/08/17')),
      amount: 99.99,
      description: 'Just another time I spent money',
      account: dummyAccount,
      category: dummyCategory,
      vendor: dummyVendor
    });
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'add',
      'transaction',
      'Help, some fatal crazy insane exception!'
    );
  });
});

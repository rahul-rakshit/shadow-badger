jest.mock('../../../../entity/Account/accountActions');
jest.mock('../../../../entity/Category/categoryActions');
jest.mock('../../../../entity/Vendor/vendorActions');
jest.mock('../../../cli-helpers/processUtil');
jest.mock('../../../../entity/Transaction/transactionActions');

import { accountActions } from '../../../../entity/Account/accountActions';
import { categoryActions } from '../../../../entity/Category/categoryActions';
import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { transactionActions } from '../../../../entity/Transaction/transactionActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { editTransaction } from './editTransaction';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { transactionValidatorMap } from '../../../../entity/Transaction/transactionValidatorMap';

describe('editTransaction', () => {
  beforeEach(jest.resetAllMocks);

  it('updates the transaction in DB if successful', async () => {
    const dummyAccount = { id: 1, text: 'account' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    categoryActions.findOne = jest.fn().mockResolvedValue(null);
    const dummyCategory = { id: 2, text: 'category' };
    categoryActions.findOne = jest.fn().mockResolvedValue(dummyCategory);
    const dummyVendor = { id: 3, text: 'vendor' };
    vendorActions.findOne = jest.fn().mockResolvedValue(dummyVendor);
    const transaction = {
      id: 10,
      dateTime: new Date(Date.parse('2020/08/17')),
      amount: '99.99',
      description: 'Just another time I spent money',
      accountId: 1,
      categoryId: 2,
      vendorId: 3
    };
    transactionActions.findOne = jest.fn().mockResolvedValue(transaction);

    await editTransaction({ id: '10', amount: '103' });

    expect(transactionActions.edit).toHaveBeenCalledWith({
      ...transaction,
      amount: '103'
    });
    expect(transactionActions.findOne).toHaveBeenCalledWith(
      10,
      expect.anything()
    );
    expect($.logSuccess).toHaveBeenCalledWith(
      'edited',
      'transaction',
      'with id 10'
    );
  });

  it('exits with a failure when provided id is invalid', async () => {
    transactionActions.findOne = jest.fn().mockResolvedValue(null);

    await editTransaction({ id: '4', amount: '1234.56' });

    expect(transactionActions.findOne).toHaveBeenCalledWith(
      4,
      expect.anything()
    );
    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'transaction',
      '4'
    );
  });

  it('exits with a failure when the update fails validation', async () => {
    const dummyAccount = { id: 1, text: 'account' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    const dummyCategory = { id: 2, text: 'category' };
    categoryActions.findOne = jest.fn().mockResolvedValue(dummyCategory);
    const dummyVendor = { id: 3, text: 'vendor' };
    vendorActions.findOne = jest.fn().mockResolvedValue(dummyVendor);
    const transaction = {
      id: 10,
      dateTime: new Date(Date.parse('2020/08/17')),
      amount: '99.99',
      description: 'Just another time I spent money',
      accountId: 1,
      categoryId: 2,
      vendorId: 3
    };
    transactionActions.findOne = jest.fn().mockResolvedValue(transaction);
    const transactionUpdate = {
      ...transaction,
      dateTime: new Date(Date.parse('a-bad-date'))
    };
    const { value: messageMap } = validateModelObject(
      transactionUpdate,
      transactionValidatorMap
    );

    await editTransaction({ id: '10', dateTime: 'a-bad-date' });

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'edit',
      'transaction',
      messageMap
    );
  });
  it('can update optional fields (eg. description) to ""', async () => {
    const dummyAccount = { id: 1, text: 'account' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    const dummyCategory = { id: 2, text: 'category' };
    categoryActions.findOne = jest.fn().mockResolvedValue(dummyCategory);
    const dummyVendor = { id: 3, text: 'vendor' };
    vendorActions.findOne = jest.fn().mockResolvedValue(dummyVendor);
    const transaction = {
      id: 10,
      dateTime: new Date(Date.parse('2020/08/17')),
      amount: '99.99',
      description: 'Just another time I spent money',
      accountId: 1,
      categoryId: 2,
      vendorId: 3
    };
    transactionActions.findOne = jest.fn().mockResolvedValue(transaction);

    await editTransaction({ id: '10', description: '' });

    expect(transactionActions.edit).toHaveBeenCalledWith({
      ...transaction,
      description: ''
    });
    expect(transactionActions.findOne).toHaveBeenCalledWith(
      10,
      expect.anything()
    );
    expect($.logSuccess).toHaveBeenCalledWith(
      'edited',
      'transaction',
      'with id 10'
    );
  });

  it("can't update transaction if passed relation's id is invalid", async () => {
    const dummyAccount = { id: 1, text: 'account' };
    accountActions.findOne = jest.fn().mockResolvedValue(dummyAccount);
    const dummyVendor = { id: 3, text: 'vendor' };
    vendorActions.findOne = jest.fn().mockResolvedValue(dummyVendor);
    const transaction = {
      id: 10,
      dateTime: new Date(Date.parse('2020/08/17')),
      amount: '99.99',
      description: 'Just another time I spent money',
      accountId: 1,
      categoryId: 2,
      vendorId: 3
    };
    categoryActions.findOne = jest.fn().mockResolvedValue(null);
    transactionActions.findOne = jest.fn().mockResolvedValue(transaction);

    await editTransaction({ id: '10', categoryId: '7' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('category', '7');
  });

  it('exits with a message when there is an sql engine error', async () => {
    transactionActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await editTransaction({ id: '1234', amount: '0.12' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'edit',
      'transaction',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

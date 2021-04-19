jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Transaction/transactionActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { viewTransactions } from './viewTransactions';
import { Transaction } from '../entity/Transaction/Transaction-d';
import {
  dummyTransactions,
  transactionLog
} from './__fixtures__/transactionFixtures';

describe('viewTransactions', () => {
  it('shows all accounts that were found', async () => {
    const expectedTransactionsList = dummyTransactions.filter(
      (tnx) => tnx.vendorId === 11
    );
    transactionActions.findAll = jest
      .fn()
      .mockResolvedValue(expectedTransactionsList);

    await viewTransactions({ vendorId: '11' });

    expect(transactionActions.findAll).toHaveBeenCalledWith({
      relations: ['account', 'category', 'vendor'],
      where: { vendorId: 11 }
    });
    const loggedArray = ($.logList as any).mock.calls[0][0];
    expect($.logList).toHaveBeenCalledWith(expect.anything(), 'transactions', {
      vendorId: '11'
    });
    expect(loggedArray).toHaveLength(2);
    const loggedArrayAmounts = loggedArray.map(
      (tnx: Transaction) => tnx.amount
    );
    expect(loggedArrayAmounts).toContain('32.42');
    expect(loggedArrayAmounts).toContain('0.92');
  });

  it('logs id, dateTime, amount, account code, category code and vendor name', async () => {
    transactionActions.findAll = jest.fn().mockResolvedValue(dummyTransactions);

    await viewTransactions({});

    expect($.logList).toHaveBeenCalledWith(transactionLog, 'transactions', {});
  });

  it('exits with a message if there is an sql engine error', async () => {
    transactionActions.findAll = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await viewTransactions({});

    expect(transactionActions.findAll).toHaveBeenCalled();
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'view',
      'transactions',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

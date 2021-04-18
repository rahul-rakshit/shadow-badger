jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Transaction/transactionActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { dummyTransactions } from './__fixtures__/transactionFixtures';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { untagTransaction } from './untagTransaction';

describe('untagTransaction', () => {
  it('removes tag from transaction in DB if successful', async () => {
    const transaction = dummyTransactions[1];
    transactionActions.findOne = jest.fn().mockResolvedValue(transaction);

    const untagTransactionOptions = { id: '13', tags: 'supermarket' };
    await untagTransaction(untagTransactionOptions);

    const updatedTransaction = { ...transaction, tags: [] };
    expect(transactionActions.edit).toHaveBeenCalledWith(updatedTransaction);
    expect($.logSuccess).toHaveBeenCalledWith(
      'removed tag from',
      'transaction',
      'with id 13'
    );
  });
});

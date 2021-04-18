jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Transaction/transactionActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { dummyTransactions } from './__fixtures__/transactionFixtures';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { tagTransaction } from './tagTransaction';

describe('tagTransaction', () => {
  it('appends tags to transaction in DB if successful', async () => {
    const tnx = dummyTransactions[2];
    transactionActions.findOne = jest.fn().mockResolvedValue(tnx);

    const tagTransactionOptions = { id: '14', tags: 'got_milk' };
    await tagTransaction(tagTransactionOptions);

    const updatedTransaction = { ...tnx, tags: ['groceries', 'got_milk'] };
    expect(transactionActions.edit).toHaveBeenCalledWith(updatedTransaction);
    expect($.logSuccess).toHaveBeenCalledWith(
      'updated tags of',
      'transaction',
      'with id 14'
    );
  });
});

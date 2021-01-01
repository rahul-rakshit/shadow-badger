jest.mock('../../../../entity/Transaction/transactionActions');
jest.mock('../../../cli-helpers/processUtil');

import { transactionActions } from '../../../../entity/Transaction/transactionActions';
import { deleteTransaction } from './deleteTransaction';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

describe('deleteTransaction', () => {
  it('deletes the transaction in the DB if successful', async () => {
    transactionActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 1234, rest: 'dummy transaction' });

    await deleteTransaction({ id: '1234' });

    expect($.logSuccess).toHaveBeenCalledWith(
      'deleted',
      'transaction',
      'with id 1234'
    );
  });

  it("exits with a failure if the passed transaction's id is invalid", async () => {
    transactionActions.findOne = jest.fn().mockResolvedValue(null);

    await deleteTransaction({ id: '1234' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'transaction',
      '1234'
    );
  });

  it('exits with a message when there is an sql engine error', async () => {
    transactionActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await deleteTransaction({ id: '1234' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'delete',
      'transaction',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

jest.mock('../../../../entity/Transaction/transactionActions');
jest.mock('../../../cli-helpers/processUtil');

import { transactionActions } from '../../../../entity/Transaction/transactionActions';
import { viewTransaction } from './viewTransaction';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

describe('viewTransaction', () => {
  describe('when id is provided', () => {
    it('logs the object when the entry is found', async () => {
      const dummyTransaction = { id: 5, text: 'A test double for transaction' };
      transactionActions.findOne = jest
        .fn()
        .mockResolvedValue(dummyTransaction);

      await viewTransaction({ id: '5' });

      expect(transactionActions.findOne).toHaveBeenCalledWith(5, {
        relations: ['account', 'category', 'vendor']
      });
      expect($.logObject).toHaveBeenCalledWith(dummyTransaction, 'transaction');
    });

    it('exits with a message when provided id is invalid', async () => {
      transactionActions.findOne = jest.fn().mockResolvedValue(null);

      await viewTransaction({ id: '1234' });

      expect(transactionActions.findOne).toHaveBeenCalledWith(1234, {
        relations: ['account', 'category', 'vendor']
      });
      expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
        'transaction',
        '1234'
      );
    });
  });

  describe('when id is not provided', () => {
    it('logs the entry when found', async () => {
      const dummyTransaction = {
        id: 5,
        description: 'A test double for transaction'
      };
      transactionActions.findOne = jest
        .fn()
        .mockResolvedValue(dummyTransaction);

      await viewTransaction({
        description: 'A test double for transaction'
      });

      expect(transactionActions.findOne).toHaveBeenCalledWith(undefined, {
        relations: ['account', 'category', 'vendor'],
        where: { description: 'A test double for transaction' }
      });
      expect($.logObject).toHaveBeenCalledWith(dummyTransaction, 'transaction');
    });
  });
});

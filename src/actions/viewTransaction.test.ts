jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Transaction/transactionActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { viewTransaction } from './viewTransaction';

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

    it('tries to find a transaction with the provided options', async () => {
      await viewTransaction({
        dateTime: '2020/03/07',
        vendorId: '27',
        description: 'abcdefg'
      });

      expect(transactionActions.findOne).toHaveBeenCalledWith(undefined, {
        relations: ['account', 'category', 'vendor'],
        where: {
          dateTime: new Date(Date.parse('2020/03/07')),
          vendorId: 27,
          description: 'abcdefg'
        }
      });
    });

    it('exits with a message when no filters are provided', async () => {
      await viewTransaction({});

      expect($.logAndExitNoFilterCriteria).toHaveBeenCalled();
    });

    it('exits with a message if there is an sql engine error', async () => {
      transactionActions.findOne = jest.fn().mockImplementation(async () => {
        throw new Error(
          'Hehehe, the sql devil wants to return a non-zero error code'
        );
      });

      await viewTransaction({ id: '1234' });

      expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
        'view',
        'transaction',
        'Hehehe, the sql devil wants to return a non-zero error code'
      );
    });
  });
});

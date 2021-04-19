jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Account/accountActions');
jest.mock('../entity/Transaction/transactionActions');
jest.mock('../entity/Snapshot/snapshotActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { accountActions } from '../entity/Account/accountActions';
import { deleteAccount } from './deleteAccount';
import { transactionActions } from '../entity/Transaction/transactionActions';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';

describe('deleteAccount', () => {
  beforeEach(jest.resetAllMocks);

  it('deletes the account in the DB if successful', async () => {
    accountActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 1234, rest: 'dummy account' });

    await deleteAccount({ id: '1234' });

    expect($.logSuccess).toHaveBeenCalledWith(
      'deleted',
      'account',
      'with id 1234'
    );
  });

  it("exits with a failure if the passed account's id is invalid", async () => {
    accountActions.findOne = jest.fn().mockResolvedValue(null);

    await deleteAccount({ id: '1234' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('account', '1234');
  });

  it('exits with a failure if there is a depending transaction', async () => {
    accountActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 1234, rest: 'dummy account' });
    transactionActions.findOne = jest
      .fn()
      .mockResolvedValue('dummy transaction');

    await deleteAccount({ id: '1234' });

    expect($.logAndExitHasDependingEntry).toHaveBeenCalledWith(
      'delete',
      'account',
      1234
    );
  });

  it('exits with a failure if there is a depending snapshot', async () => {
    accountActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 5678, rest: 'dummy account' });
    snapshotActions.findOne = jest.fn().mockResolvedValue('dummy snapshot');

    await deleteAccount({ id: '5678' });

    expect($.logAndExitHasDependingEntry).toHaveBeenCalledWith(
      'delete',
      'account',
      5678
    );
  });

  it('exits with a message when there is an sql engine error', async () => {
    accountActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await deleteAccount({ id: '1234' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'delete',
      'account',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

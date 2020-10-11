jest.mock('../../../cli-helpers/processUtil');
jest.mock('../../../../entity/Account/accountActions');

import { deleteAccount } from './deleteAccount';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { accountActions } from '../../../../entity/Account/accountActions';

describe('deleteAccount', () => {
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

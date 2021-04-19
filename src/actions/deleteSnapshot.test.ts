jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Snapshot/snapshotActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';
import { secondVolksbankSnapshot } from './__fixtures__/snapshotFixtures';
import { deleteSnapshot } from './deleteSnapshot';

describe('deleteSnapshot', () => {
  it('deletes the snapshot in the DB if successful', async () => {
    snapshotActions.findOne = jest
      .fn()
      .mockResolvedValue(secondVolksbankSnapshot);

    await deleteSnapshot({ id: '3' });

    expect($.logSuccess).toHaveBeenCalledWith(
      'deleted',
      'snapshot',
      'with id 3'
    );
  });

  it('exits with a message when there is an sql engine error', async () => {
    snapshotActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await deleteSnapshot({ id: '1234' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'delete',
      'snapshot',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

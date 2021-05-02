jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Snapshot/snapshotActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import {
  firstVolksbankSnapshot,
  secondVolksbankSnapshot,
  firstSparkasseSnapshot
} from './__fixtures__/snapshotFixtures';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';
import { Snapshot } from '../entity/Snapshot/Snapshot-d';
import { viewSnapshots } from './viewSnapshots';
import { getDate } from '../utils/getDate';
import { viewAccounts } from './viewAccounts';

describe('viewSnapshots', () => {
  beforeEach(jest.clearAllMocks);

  it('shows all snapshots that were found', async () => {
    snapshotActions.findAll = jest
      .fn()
      .mockResolvedValue([firstVolksbankSnapshot, secondVolksbankSnapshot]);

    await viewSnapshots({ accountId: '7' });

    expect(snapshotActions.findAll).toHaveBeenCalledWith({
      relations: ['account'],
      where: { accountId: 7 }
    });
    expect($.logList).toHaveBeenCalledWith(expect.anything(), 'snapshots', {
      accountId: '7'
    });
    const loggedArray: Snapshot[] = ($.logList as any).mock.calls[0][0];
    expect(loggedArray).toHaveLength(2);
    const loggedArrayBalances = loggedArray.map((snapshot) => snapshot.balance);
    expect(loggedArrayBalances).toEqual(['1324.68', '1922.67']);
  });

  it('only logs dateTime, balance, accountCode and accountId', async () => {
    snapshotActions.findAll = jest
      .fn()
      .mockResolvedValue([firstVolksbankSnapshot, secondVolksbankSnapshot]);

    await viewSnapshots({ accountId: '7' });

    const expectedLoggedArray = [
      {
        id: 2,
        dateTime: getDate('2021-01-27 15:17'),
        balance: '1324.68',
        accountCode: 'VBGOE',
        accountId: 7
      },
      {
        id: 3,
        dateTime: getDate('2021-03-12 14:38'),
        balance: '1922.67',
        accountCode: 'VBGOE',
        accountId: 7
      }
    ];
    const loggedArray: Snapshot[] = ($.logList as any).mock.calls[0][0];
    expect(loggedArray).toEqual(expectedLoggedArray);
  });

  it('can also be called with an empty map of options', async () => {
    snapshotActions.findAll = jest
      .fn()
      .mockResolvedValue([
        firstVolksbankSnapshot,
        secondVolksbankSnapshot,
        firstSparkasseSnapshot
      ]);

    await viewSnapshots({});

    const loggedArray: Snapshot[] = ($.logList as any).mock.calls[0][0];
    expect(loggedArray).toHaveLength(3);
  });

  it('exits with a message if there is an sql engine error', async () => {
    snapshotActions.findAll = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await viewSnapshots({});

    expect(snapshotActions.findAll).toHaveBeenCalled();
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'view',
      'snapshots',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Account/accountActions');
jest.mock('../entity/Snapshot/snapshotActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { accountActions } from '../entity/Account/accountActions';
import { dummyVolksbank } from './__fixtures__/accountFixtures';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';
import {
  firstVolksbankSnapshotWithoutId,
  firstVolksbankSnapshot
} from './__fixtures__/snapshotFixtures';
import { addSnapshot } from './addSnapshot';
import { Snapshot } from '../entity/Snapshot/Snapshot-d';
import { validateModelObject } from '../validations/validateModelObject';
import { snapshotValidatorMap } from '../entity/Snapshot/snapshotValidatorMap';

describe('addSnapshot', () => {
  beforeEach(jest.resetAllMocks);

  const snapshotInput = {
    id: '2',
    dateTime: '2021-01-27 15:17',
    balance: '1324.68',
    accountId: '7',
    description: 'Just a snapshot'
  };

  it('adds a snapshot to DB if successful', async () => {
    snapshotActions.create = jest
      .fn()
      .mockResolvedValue(firstVolksbankSnapshot);
    accountActions.findOne = jest.fn().mockResolvedValue(dummyVolksbank);

    await addSnapshot(snapshotInput);

    expect(snapshotActions.create).toHaveBeenCalledWith(
      firstVolksbankSnapshotWithoutId
    );
    expect(accountActions.findOne).toHaveBeenCalledWith(dummyVolksbank.id);
    expect($.logSuccess).toHaveBeenCalledWith('added', 'snapshot', 'with id 2');
  });

  it('exits with "not found" message when related account is not found', async () => {
    accountActions.findOne = jest.fn().mockResolvedValue(null);

    await addSnapshot(snapshotInput);

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('account', '7');
  });

  it('exits with failure when validation fails', async () => {
    const badSnapshotInput = { ...snapshotInput, balance: 'Muuuuuch moneys' };
    const badSnapshot: Snapshot = {
      ...firstVolksbankSnapshotWithoutId,
      balance: 'Muuuuuch moneys'
    };
    const { value: expectedMessageMap } = validateModelObject(
      badSnapshot,
      snapshotValidatorMap
    );
    accountActions.findOne = jest.fn().mockResolvedValue(dummyVolksbank);

    await addSnapshot(badSnapshotInput);

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'add',
      'snapshot',
      expectedMessageMap
    );
  });

  it('exits with message if there is an sql engine error', async () => {
    accountActions.findOne = jest.fn().mockResolvedValue(dummyVolksbank);
    snapshotActions.create = jest.fn().mockImplementation(async () => {
      throw new Error(
        "Help, I've forgotten to switch on the SQL database server!"
      );
    });

    await addSnapshot(snapshotInput);

    expect(snapshotActions.create).toHaveBeenCalledWith(
      firstVolksbankSnapshotWithoutId
    );
    expect(accountActions.findOne).toHaveBeenCalledWith(dummyVolksbank.id);
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'add',
      'snapshot',
      "Help, I've forgotten to switch on the SQL database server!"
    );
  });
});

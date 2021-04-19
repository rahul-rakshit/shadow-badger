jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Snapshot/snapshotActions');
jest.mock('../entity/Account/accountActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';
import { secondVolksbankSnapshot } from './__fixtures__/snapshotFixtures';
import { editSnapshot } from './editSnapshot';
import { validateModelObject } from '../validations/validateModelObject';
import { snapshotValidatorMap } from '../entity/Snapshot/snapshotValidatorMap';
import { accountActions } from '../entity/Account/accountActions';

describe('editSnapshot', () => {
  it('updates the snapshot in the DB if successful', async () => {
    snapshotActions.findOne = jest
      .fn()
      .mockResolvedValue(secondVolksbankSnapshot);
    snapshotActions.edit = jest
      .fn()
      .mockResolvedValue({ ...secondVolksbankSnapshot, balance: '1922.99' });

    const editSnapshotArgs = {
      id: '3',
      balance: '1922.99'
    };
    await editSnapshot(editSnapshotArgs);

    expect(snapshotActions.edit).toHaveBeenCalledWith({
      ...secondVolksbankSnapshot,
      balance: '1922.99'
    });
    expect($.logSuccess).toHaveBeenCalledWith(
      'edited',
      'snapshot',
      'with id 3'
    );
  });

  it('exits with a failure when provided id is invalid', async () => {
    snapshotActions.findOne = jest.fn().mockResolvedValue(null);

    await editSnapshot({ id: '9999', balance: '1234.56' });

    expect(snapshotActions.findOne).toHaveBeenCalledWith(
      9999,
      expect.anything()
    );
    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'snapshot',
      '9999'
    );
  });

  it('exits with a failure when the update fails validation', async () => {
    snapshotActions.findOne = jest
      .fn()
      .mockResolvedValue(secondVolksbankSnapshot);
    const invalidNewSnapshot = {
      ...secondVolksbankSnapshot,
      balance: 'mucho dinero'
    };
    const { value: messageMap } = validateModelObject(
      invalidNewSnapshot,
      snapshotValidatorMap
    );

    await editSnapshot({ id: '3', balance: 'mucho dinero' });

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'edit',
      'snapshot',
      messageMap
    );
  });

  it('can update optional fields (eg. description) to ""', async () => {
    snapshotActions.findOne = jest
      .fn()
      .mockResolvedValue(secondVolksbankSnapshot);
    const snapshotWithResetDescription = {
      ...secondVolksbankSnapshot,
      description: ''
    };
    snapshotActions.edit = jest
      .fn()
      .mockResolvedValue(snapshotWithResetDescription);

    const editSnapshotArgs = {
      id: '3',
      description: ''
    };
    await editSnapshot(editSnapshotArgs);

    expect(snapshotActions.edit).toHaveBeenCalledWith(
      snapshotWithResetDescription
    );
    expect($.logSuccess).toHaveBeenCalledWith(
      'edited',
      'snapshot',
      'with id 3'
    );
  });

  it("can't update snapshot if passed accountId is invalid", async () => {
    snapshotActions.findOne = jest
      .fn()
      .mockResolvedValue(secondVolksbankSnapshot);
    accountActions.findOne = jest.fn().mockResolvedValue(null);

    await editSnapshot({ id: '3', accountId: '9999' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('account', '9999');
  });

  it('exits with a message when there is an sql engine error', async () => {
    snapshotActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await editSnapshot({ id: '1234', balance: '1234' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'edit',
      'snapshot',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

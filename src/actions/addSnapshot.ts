import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { accountActions } from '../entity/Account/accountActions';
import { Snapshot } from '../entity/Snapshot/Snapshot-d';
import { getDate } from '../utils/getDate';
import { validateModelObject } from '../validations/validateModelObject';
import { snapshotValidatorMap } from '../entity/Snapshot/snapshotValidatorMap';
import { failed } from '../types-d';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';

export async function addSnapshot(opts: {
  dateTime: string;
  balance: string;
  accountId: string;
  description?: string;
}) {
  const accountId = Number(opts.accountId);
  try {
    const account = await accountActions.findOne(accountId);
    if (!account) $.logAndExitNotFoundMessage('account', opts.accountId);

    const newSnapshot: Snapshot = {
      dateTime: getDate(opts.dateTime),
      balance: opts.balance,
      description: opts.description ?? '',
      account
    };

    const validation = validateModelObject<Snapshot>(
      newSnapshot,
      snapshotValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Snapshot>('add', 'snapshot', messageMap);
    } else {
      const { id } = await snapshotActions.create(newSnapshot);
      $.logSuccess('added', 'snapshot', `with id ${id}`);
    }
  } catch (error) {
    $.logAndExitOnSqlEngineError('add', 'snapshot', error.message);
  }
}

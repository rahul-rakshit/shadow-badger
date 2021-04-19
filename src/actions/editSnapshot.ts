import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';
import { isNullish } from '../utils/isNullish';
import { getDate } from '../utils/getDate';
import { accountActions } from '../entity/Account/accountActions';
import { Snapshot } from '../entity/Snapshot/Snapshot-d';
import { snapshotValidatorMap } from '../entity/Snapshot/snapshotValidatorMap';
import { validateModelObject } from '../validations/validateModelObject';
import { failed } from '../types-d';

export async function editSnapshot(opts: {
  id: string;
  dateTime?: string;
  balance?: string;
  description?: string;
  accountId?: string;
}) {
  const idString = opts.id;
  const id = Number(idString);

  try {
    const foundSnapshot = await snapshotActions.findOne(id, {
      relations: ['account']
    });
    if (!foundSnapshot) $.logAndExitNotFoundMessage('snapshot', idString);
    const snapshot = foundSnapshot as Snapshot;

    if (!isNullish(opts.dateTime)) {
      snapshot.dateTime = getDate(opts.dateTime ?? '');
    }
    if (!isNullish(opts.balance)) snapshot.balance = opts.balance;
    if (!isNullish(opts.description)) snapshot.description = opts.description;

    if (opts.accountId) {
      const accountId = Number(opts.accountId);
      const foundAccount = await accountActions.findOne(accountId);
      if (!foundAccount) $.logAndExitNotFoundMessage('account', opts.accountId);
      else snapshot.account = foundAccount;
    }

    const validation = validateModelObject<Snapshot>(
      snapshot,
      snapshotValidatorMap
    );

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Snapshot>('edit', 'snapshot', messageMap);
    }

    await snapshotActions.edit(snapshot);

    $.logSuccess('edited', 'snapshot', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('edit', 'snapshot', error.message);
  }
}

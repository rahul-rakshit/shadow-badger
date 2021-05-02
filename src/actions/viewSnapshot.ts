import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';
import { Snapshot } from '../entity/Snapshot/Snapshot-d';
import { getDate } from '../utils/getDate';
import { parseDefinedOpts } from '../utils/parseDefinedOpts';
export async function viewSnapshot(opts: {
  id?: string;
  dateTime?: string;
  balance?: string;
  description?: string;
  accountId?: string;
}) {
  const id = Number(opts.id);
  const dateTime = opts.dateTime ? getDate(opts.dateTime) : undefined;
  const balance = opts.balance;
  const description = opts.description;
  const accountId = opts.accountId ? Number(opts.accountId) : undefined;

  if (!opts.id && !dateTime && !balance && !description) {
    $.logAndExitNoFilterCriteria();
  }

  try {
    const foundSnapshot = id
      ? await snapshotActions.findOne(id, {
          relations: ['account']
        })
      : await snapshotActions.findOne(undefined, {
          relations: ['account'],
          where: parseDefinedOpts({ dateTime, balance, description, accountId })
        });

    if (!foundSnapshot) $.logAndExitNotFoundMessage('snapshot', opts.id);

    $.logObject(foundSnapshot as Snapshot, 'snapshot');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'snapshot', error.message);
  }
}

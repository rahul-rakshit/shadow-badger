import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { parseDefinedOpts } from '../utils/parseDefinedOpts';
import { getDate } from '../utils/getDate';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';

export async function viewSnapshots(opts: {
  dateTime?: string;
  balance?: string;
  description?: string;
  accountId?: string;
}) {
  const searchOptions = parseDefinedOpts({
    ...opts,
    dateTime: opts.dateTime ? getDate(opts.dateTime) : undefined,
    accountId: opts.accountId ? Number(opts.accountId) : undefined
  });

  try {
    const allSnapshots = await snapshotActions.findAll({
      relations: ['account'],
      where: searchOptions
    });
    if (allSnapshots.length === 0) $.logAndExitNotFoundMessage('snapshot');

    const loggable = allSnapshots.map((snapshot) => ({
      id: snapshot.id,
      dateTime: snapshot.dateTime?.toISOString(),
      balance: snapshot.balance,
      accountCode: snapshot.account?.code,
      accountId: snapshot.account?.id
    }));
    $.logList(loggable, 'snapshots', opts);
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'snapshots', error.message);
  }
}

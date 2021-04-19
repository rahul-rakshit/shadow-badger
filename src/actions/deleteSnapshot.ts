import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';

export async function deleteSnapshot({ id: idString }: { id: string }) {
  try {
    const id = Number(idString);
    const foundSnapshot = await snapshotActions.findOne(id);
    if (!foundSnapshot) $.logAndExitNotFoundMessage('snapshot', idString);

    await snapshotActions.delete(id);
    $.logSuccess('deleted', 'snapshot', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('delete', 'snapshot', error.message);
  }
}

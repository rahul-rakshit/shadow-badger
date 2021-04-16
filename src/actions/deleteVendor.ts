import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { vendorActions } from '../entity/Vendor/vendorActions';

export async function deleteVendor({ id: idString }: { id: string }) {
  try {
    const id = Number(idString);
    const foundVendor = await vendorActions.findOne(id);
    if (!foundVendor) $.logAndExitNotFoundMessage('vendor', idString);

    await vendorActions.delete(id);
    $.logSuccess('deleted', 'vendor', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('delete', 'vendor', error.message);
  }
}

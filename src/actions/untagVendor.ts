import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { vendorActions } from '../entity/Vendor/vendorActions';
import { Vendor } from '../entity/Vendor/Vendor-d';
import { untag } from '../utils/untag';

export async function untagVendor(opts: { id: string; tags: string }) {
  const idString = opts.id;
  const id = Number(idString);
  const tagsToRemove = opts.tags;

  try {
    const foundVendor = await vendorActions.findOne(id);
    if (!foundVendor) $.logAndExitNotFoundMessage('vendor', idString);
    const vendor = foundVendor as Vendor;

    vendor.tags = untag(vendor.tags ?? [], tagsToRemove);

    await vendorActions.edit(vendor);

    $.logSuccess('removed tag from', 'vendor', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('update tags of', 'vendor', error.message);
  }
}

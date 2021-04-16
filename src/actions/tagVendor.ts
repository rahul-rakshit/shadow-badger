import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { vendorActions } from '../entity/Vendor/vendorActions';
import { Vendor } from '../entity/Vendor/Vendor-d';
import { tag } from '../utils/tag';

export async function tagVendor(opts: { id: string; tags: string }) {
  const idString = opts.id;
  const id = Number(idString);

  try {
    const foundVendor = await vendorActions.findOne(id);
    if (!foundVendor) $.logAndExitNotFoundMessage('vendor', idString);
    const vendor = foundVendor as Vendor;

    vendor.tags = tag(opts.tags, vendor.tags);

    await vendorActions.edit(vendor);
    $.logSuccess('updated tags of', 'vendor', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('update tags of', 'vendor', error.message);
  }
}

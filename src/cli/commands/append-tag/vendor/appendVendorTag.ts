import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { Vendor } from '../../../../entity/Vendor/Vendor-d';
import { tagify } from '../../../../utils/tagify';

export async function appendVendorTag(opts: { id: string; tags: string }) {
  const idString = opts.id;
  const id = Number(idString);

  try {
    const foundVendor = await vendorActions.findOne(id);
    if (!foundVendor) $.logAndExitNotFoundMessage('vendor', idString);
    const vendor = foundVendor as Vendor;

    vendor.tags = tagify(opts.tags, vendor.tags);

    await vendorActions.edit(vendor);
    $.logSuccess('updated tags of', 'vendor', `with id ${id}`);
  } catch (error) {
    $.logAndExitOnSqlEngineError('update tags of', 'vendor', error.message);
  }
}

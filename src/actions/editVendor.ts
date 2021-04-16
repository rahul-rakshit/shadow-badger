import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { vendorActions } from '../entity/Vendor/vendorActions';
import { Vendor } from '../entity/Vendor/Vendor-d';
import { isNullish } from '../utils/isNullish';
import { tagify } from '../utils/tagify';
import { validateModelObject } from '../validations/validateModelObject';
import { vendorValidatorMap } from '../entity/Vendor/vendorValidatorMap';
import { failed } from '../types-d';

export async function editVendor(opts: {
  id: string;
  name?: string;
  coordinates?: string;
  address?: string;
  description?: string;
  tags?: string;
}) {
  const idString = opts.id;
  const id = Number(idString);
  const { name, coordinates, address, description, tags } = opts;

  try {
    const foundVendor = await vendorActions.findOne(id);
    if (!foundVendor) $.logAndExitNotFoundMessage('vendor', idString);
    const vendor = foundVendor as Vendor;

    if (name !== undefined) vendor.name = name;
    if (coordinates !== undefined) vendor.coordinates = coordinates;
    if (address !== undefined) vendor.address = address;
    if (description !== undefined) vendor.description = description;
    if (!isNullish(tags)) vendor.tags = tagify(opts.tags, vendor.tags);
    const validation = validateModelObject<Vendor>(vendor, vendorValidatorMap);

    if (failed(validation)) {
      const messageMap = validation.value;
      $.logAndExitOnValidationFailure<Vendor>('edit', 'vendor', messageMap);
    } else {
      await vendorActions.edit(vendor);
      $.logSuccess('edited', 'vendor', `with id ${id}`);
    }
  } catch (error) {
    $.logAndExitOnSqlEngineError('edit', 'vendor', error.message);
  }
}

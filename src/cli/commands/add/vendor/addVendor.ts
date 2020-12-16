import { Vendor } from '../../../../entity/Vendor/Vendor-d';
import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { vendorValidatorMap } from '../../../../entity/Vendor/vendorValidatorMap';
import { failed } from '../../../../types-d';

export async function addVendor(opts: {
  name: string;
  address?: string;
  coordinates?: string;
  description?: string;
}) {
  const newVendor: Vendor = { ...opts };
  if (opts.description === undefined) newVendor.description = '';
  if (opts.address === undefined) newVendor.address = '';
  if (opts.coordinates === undefined) newVendor.coordinates = '';
  const validation = validateModelObject<Vendor>(newVendor, vendorValidatorMap);
  if (failed(validation)) {
    const messageMap = validation.value;
    $.logAndExitOnValidationFailure<Vendor>('add', 'vendor', messageMap);
  } else {
    try {
      const { id } = await vendorActions.create(newVendor);
      $.logSuccess('added', 'vendor', `with id ${id}`);
    } catch (error) {
      $.logAndExitOnSqlEngineError('add', 'vendor', error.message);
    }
  }
}

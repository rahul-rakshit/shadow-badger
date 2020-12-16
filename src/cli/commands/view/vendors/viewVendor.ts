import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { parseDefinedOpts } from '../../../../utils/parseDefinedOpts';
import { Vendor } from '../../../../entity/Vendor/Vendor-d';

export async function viewVendor(opts: {
  id?: string;
  name?: string;
  coordinates?: string;
  address?: string;
  description?: string;
}) {
  const { name, coordinates, address, description } = opts;
  const idString = opts.id;
  const id = Number(idString);

  if (!idString && !name && !coordinates && !address && !description) {
    $.logAndExitNoFilterCriteria();
  }

  try {
    const foundVendor = id
      ? await vendorActions.findOne(id)
      : await vendorActions.findOne(undefined, {
          where: parseDefinedOpts({ name, coordinates, address, description })
        });

    if (!foundVendor) $.logAndExitNotFoundMessage('vendor', opts.id);

    $.logObject(foundVendor as Vendor, 'vendor');
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'vendor', error.message);
  }
}

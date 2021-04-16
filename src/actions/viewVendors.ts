import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { vendorActions } from '../entity/Vendor/vendorActions';

export async function viewVendors(opts: { name?: string; address?: string }) {
  try {
    const allVendors = await vendorActions.findAll({ where: opts });
    if (allVendors.length === 0) $.logAndExitNotFoundMessage('vendor');

    const loggable = allVendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      address: vendor.address
    }));

    $.logList(loggable, 'vendors', opts);
  } catch (error) {
    $.logAndExitOnSqlEngineError('view', 'vendors', error.message);
  }
}

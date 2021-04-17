jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Vendor/vendorActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { Vendor } from '../entity/Vendor/Vendor-d';
import { vendorActions } from '../entity/Vendor/vendorActions';
import { untagVendor } from './untagVendor';

describe('untagVendor', () => {
  it('removes tag from vendor in DB if successful', async () => {
    const rewe: Vendor = {
      id: 1,
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191',
      tags: ['supermarket', 'gas_station']
    };
    vendorActions.findOne = jest.fn().mockResolvedValue(rewe);

    const untagVendorOptions = { id: '1', tags: 'gas_station' };
    await untagVendor(untagVendorOptions);

    const updatedRewe = { ...rewe, tags: ['supermarket'] };
    expect(vendorActions.edit).toHaveBeenCalledWith(updatedRewe);
    expect($.logSuccess).toHaveBeenCalledWith(
      'removed tag from',
      'vendor',
      'with id 1'
    );
  });
});

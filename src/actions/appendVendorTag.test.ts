import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { Vendor } from '../entity/Vendor/Vendor-d';
import { vendorActions } from '../entity/Vendor/vendorActions';
import { appendVendorTag } from './appendVendorTag';

jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Vendor/vendorActions');

describe('appendVendorTag', () => {
  it('appends vendor tags to vendor in DB if successful', async () => {
    const rewe: Vendor = {
      id: 1,
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191',
      tags: ['Supermarket']
    };
    vendorActions.findOne = jest.fn().mockResolvedValue(rewe);

    const appendTagsOptions = { id: '1', tags: 'Food, Spinach' };
    await appendVendorTag(appendTagsOptions);

    const updatedRewe = { ...rewe, tags: ['Supermarket', 'Food', 'Spinach'] };
    expect(vendorActions.edit).toHaveBeenCalledWith(updatedRewe);
    expect($.logSuccess).toHaveBeenCalledWith(
      'updated tags of',
      'vendor',
      'with id 1'
    );
  });
});

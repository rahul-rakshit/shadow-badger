jest.mock('../../../../entity/Vendor/vendorActions');
jest.mock('../../../cli-helpers/processUtil');

import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { deleteVendor } from './deleteVendor';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

describe('deleteVendor', () => {
  it('deletes the vendor in the DB if successful', async () => {
    vendorActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 1234, rest: 'dummy vendor' });

    await deleteVendor({ id: '1234' });

    expect($.logSuccess('deleted', 'vendor'));
  });

  it("exits with a failure when the passed vendor's id is invalid", async () => {
    vendorActions.findOne = jest.fn().mockResolvedValue(null);

    await deleteVendor({ id: '1234' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('vendor', '1234');
  });

  it('exits with message when there is an sql engine error', async () => {
    vendorActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await deleteVendor({ id: '1234' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'delete',
      'vendor',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

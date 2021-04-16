jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Vendor/vendorActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { vendorActions } from '../entity/Vendor/vendorActions';
import { viewVendors } from './viewVendors';

describe('viewVendors', () => {
  const vendorsListWithoutCoordinates = [
    { id: 1, name: 'first', address: 'street 1' },
    { id: 2, name: 'second', address: 'street 1' },
    { id: 3, name: 'third', address: 'street 1' }
  ];
  const vendorsList = vendorsListWithoutCoordinates.map((vendor) => ({
    ...vendor,
    coordinates: '12.34, 56.78'
  }));

  it('shows all vendors that were found', async () => {
    vendorActions.findAll = jest.fn().mockResolvedValue(vendorsList);

    await viewVendors({ address: 'street 1' });

    expect(vendorActions.findAll).toHaveBeenCalledWith({
      where: { address: 'street 1' }
    });
    expect($.logList).toHaveBeenCalledWith(
      vendorsListWithoutCoordinates,
      'vendors',
      { address: 'street 1' }
    );
  });

  it('can also be called with an empty map of options', async () => {
    vendorActions.findAll = jest.fn().mockResolvedValue(vendorsList);

    await viewVendors({});

    expect(vendorActions.findAll).toHaveBeenCalledWith({ where: {} });
    expect($.logList).toHaveBeenCalledWith(
      vendorsListWithoutCoordinates,
      'vendors',
      {}
    );
  });

  it('exits with message if the is an sql engine error', async () => {
    vendorActions.findAll = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await viewVendors({});

    expect(vendorActions.findAll).toHaveBeenCalledWith({ where: {} });
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'view',
      'vendors',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

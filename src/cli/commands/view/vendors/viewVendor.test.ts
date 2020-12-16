jest.mock('../../../../entity/Vendor/vendorActions');
jest.mock('../../../cli-helpers/processUtil');

import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { viewVendor } from './viewVendor';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { Vendor } from '../../../../entity/Vendor/Vendor-d';

describe('viewVendor', () => {
  describe('when id is provided', () => {
    it('logs the object when the entry is found', async () => {
      const rewe = {
        id: 1234,
        name: 'Rewe Pappelallee',
        address: 'Pappelallee 47, 10437 Berlin',
        coordinates: '52.5476, 13.4191'
      };
      vendorActions.findOne = jest.fn().mockResolvedValue(rewe);

      await viewVendor({ id: '1234' });

      expect(vendorActions.findOne).toHaveBeenCalledWith(1234);
      expect($.logObject).toHaveBeenCalledWith(rewe, 'vendor');
    });

    it('exits with a message when provided id is invalid', async () => {
      vendorActions.findOne = jest.fn().mockResolvedValue(null);

      await viewVendor({ id: '9999' });

      expect(vendorActions.findOne).toHaveBeenCalledWith(9999);
      expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
        'vendor',
        '9999'
      );
    });
  });

  describe('when is is not provided', () => {
    it('tries to find a vendor with the provided options', async () => {
      await viewVendor({
        name: 'Rewe Grellstr',
        address: 'Grellstraße 75, 10409 Berlin'
      });

      expect(vendorActions.findOne).toHaveBeenCalledWith(undefined, {
        where: {
          name: 'Rewe Grellstr',
          address: 'Grellstraße 75, 10409 Berlin'
        }
      });
    });

    it('logs the entry when found', async () => {
      const rewe: Vendor = {
        id: 1234,
        name: 'Rewe Pappelallee',
        address: 'Pappelallee 47, 10437 Berlin',
        coordinates: '52.5476, 13.4191'
      };
      vendorActions.findOne = jest.fn().mockResolvedValue(rewe);

      await viewVendor({ address: 'Pappelallee 47, 10437 Berlin' });

      expect(vendorActions.findOne).toHaveBeenCalledWith(undefined, {
        where: { address: 'Pappelallee 47, 10437 Berlin' }
      });
      expect($.logObject).toHaveBeenCalledWith(rewe, 'vendor');
    });

    it('exits with a message when no filters are provided', async () => {
      await viewVendor({});

      expect($.logAndExitNoFilterCriteria).toHaveBeenCalled();
    });

    it('exits with a message if the is an sql engine error', async () => {
      vendorActions.findOne = jest.fn().mockImplementation(async () => {
        throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
      });

      await viewVendor({ id: '1234' });

      expect(vendorActions.findOne).toHaveBeenCalledWith(1234);
      expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
        'view',
        'vendor',
        'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
      );
    });
  });
});

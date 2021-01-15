jest.mock('../../../cli-helpers/processUtil');
jest.mock('../../../../entity/Vendor/vendorActions');

import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { editVendor } from './editVendor';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { vendorValidatorMap } from '../../../../entity/Vendor/vendorValidatorMap';
import { Vendor } from '../../../../entity/Vendor/Vendor-d';

describe('editVendor', () => {
  it('updates the vendor in the DB if successful', async () => {
    const rewe: Vendor = {
      id: 1,
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191',
      tags: ['Supermarket']
    };
    vendorActions.findOne = jest.fn().mockResolvedValue(rewe);
    const updatedRewe = { ...rewe, description: 'A modern supermarket' };

    const editVendorInput = { ...updatedRewe, id: '1', tags: 'Supermarket' };
    await editVendor(editVendorInput);

    expect(vendorActions.edit).toHaveBeenCalledWith(updatedRewe);
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'vendor', 'with id 1');
  });

  it('can update optional fields to empty string', async () => {
    const rewe = {
      id: 1,
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191',
      description: 'A modern supermarket',
      tags: []
    };
    vendorActions.findOne = jest.fn().mockResolvedValue(rewe);
    const updatedReweInput = {
      ...rewe,
      description: '',
      tags: 'supermarket,food',
      id: '1'
    };
    const updatedRewe = {
      ...rewe,
      description: '',
      tags: ['supermarket', 'food']
    };

    await editVendor(updatedReweInput);

    expect(vendorActions.edit).toHaveBeenCalledWith(updatedRewe);
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'vendor', 'with id 1');
  });

  it("exits with a failure when the passed vendor's id is invalid", async () => {
    vendorActions.findOne = jest.fn().mockResolvedValue(null);
    const vendorToEdit = {
      id: '1234',
      name: 'non-existent shop',
      address: 'Underwater Town, 12345 Atlantis',
      coordinates: '0, 0',
      tags: 'diagon alley'
    };

    await editVendor(vendorToEdit);

    expect(vendorActions.findOne).toHaveBeenCalledWith(1234);
    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith('vendor', '1234');
  });

  it('exits with a failure if the update fails validation', async () => {
    const rewe = {
      id: 1,
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191',
      tags: ['supermarket']
    };
    vendorActions.findOne = jest.fn().mockResolvedValue(rewe);
    const updateWithBadCoordinates = {
      ...rewe,
      coordinates: 'badCoordinates'
    };
    const { value: messageMap } = validateModelObject(
      updateWithBadCoordinates,
      vendorValidatorMap
    );

    const editVendorInput = {
      ...updateWithBadCoordinates,
      id: '1',
      tags: 'supermarket'
    };
    await editVendor(editVendorInput);

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'edit',
      'vendor',
      messageMap
    );
  });

  it('exits with message when there is an sql engine error', async () => {
    vendorActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });

    await editVendor({ id: '1234', description: 'WAT' });

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'edit',
      'vendor',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

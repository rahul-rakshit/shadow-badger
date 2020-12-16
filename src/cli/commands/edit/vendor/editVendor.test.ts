jest.mock('../../../cli-helpers/processUtil');
jest.mock('../../../../entity/Vendor/vendorActions');

import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { editVendor } from './editVendor';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { vendorValidatorMap } from '../../../../entity/Vendor/vendorValidatorMap';

describe('editVendor', () => {
  it('updates the vendor in the DB if successful', async () => {
    const rewe = {
      id: 1,
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191'
    };
    vendorActions.findOne = jest.fn().mockResolvedValue(rewe);
    const updatedRewe = { ...rewe, description: 'A modern supermarket' };

    await editVendor({ ...updatedRewe, id: '1' });

    expect(vendorActions.edit).toHaveBeenCalledWith(updatedRewe);
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'vendor', 'with id 1');
  });

  it('can update optional fields to empty string', async () => {
    const rewe = {
      id: 1,
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191',
      description: 'A modern supermarket'
    };
    vendorActions.findOne = jest.fn().mockResolvedValue(rewe);
    const updatedRewe = { ...rewe, description: '' };

    await editVendor({ ...updatedRewe, id: '1' });

    expect(vendorActions.edit).toHaveBeenCalledWith(updatedRewe);
    expect($.logSuccess).toHaveBeenCalledWith('edited', 'vendor', 'with id 1');
  });

  it("exits with a failure when the passed vendor's id is invalid", async () => {
    vendorActions.findOne = jest.fn().mockResolvedValue(null);
    const vendorToEdit = {
      id: '1234',
      name: 'non-existent shop',
      address: 'Underwater Town, 12345 Atlantis',
      coordinates: '0, 0'
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
      coordinates: '52.5476, 13.4191'
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

    await editVendor({ ...updateWithBadCoordinates, id: '1' });

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

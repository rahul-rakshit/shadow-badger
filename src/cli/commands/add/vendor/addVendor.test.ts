jest.mock('../../../cli-helpers/processUtil');
jest.mock('../../../../entity/Vendor/vendorActions');

import { vendorActions } from '../../../../entity/Vendor/vendorActions';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { addVendor } from './addVendor';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { vendorValidatorMap } from '../../../../entity/Vendor/vendorValidatorMap';

describe('addVendor', () => {
  it('adds a vendor to DB if successful', async () => {
    vendorActions.create = jest.fn().mockResolvedValue({ id: '🙃' });
    const rewe = {
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191'
    };

    await addVendor(rewe);

    const reweWithEmptyFields = { ...rewe, description: '', tags: [] };
    expect(vendorActions.create).toHaveBeenCalledWith(reweWithEmptyFields);
    expect($.logSuccess).toHaveBeenCalledWith('added', 'vendor', 'with id 🙃');
  });

  it('adds vendor with empty address, coordinates, description and tags if undefined', async () => {
    vendorActions.create = jest.fn().mockResolvedValue({ id: 'xyz' });
    const iceCreamMan = { name: 'ice cream man' };

    await addVendor(iceCreamMan);

    const iceCreamManWithEmptyOptionalFields = {
      ...iceCreamMan,
      address: '',
      coordinates: '',
      description: '',
      tags: []
    };
    expect(vendorActions.create).toHaveBeenCalledWith(
      iceCreamManWithEmptyOptionalFields
    );
  });

  it('exits with failure when validation fails', async () => {
    const iceCreamMan = {
      name: 'Ice Cream Man',
      address: 'Nowhere Street, 12345 Atlantis',
      coordinates: 'incorrect, coordinates'
    };
    const { value: messageMap } = validateModelObject(
      { ...iceCreamMan, tags: [] },
      vendorValidatorMap
    );

    await addVendor(iceCreamMan);

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'add',
      'vendor',
      messageMap
    );
  });

  it('exits with message if the is an sql engine error', async () => {
    vendorActions.create = jest.fn().mockImplementation(async () => {
      throw new Error('AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa');
    });
    const rewe = {
      name: 'Rewe Pappelallee',
      address: 'Pappelallee 47, 10437 Berlin',
      coordinates: '52.5476, 13.4191'
    };

    await addVendor(rewe);

    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'add',
      'vendor',
      'AAAAAAAAaaaaaaaAAAAAAAAaaaaaaaaa'
    );
  });
});

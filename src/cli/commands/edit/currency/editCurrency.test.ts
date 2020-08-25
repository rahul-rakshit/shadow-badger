jest.mock('../../../../entity/Currency/currencyActions');
jest.mock('../../../cli-helpers/processUtil');

import { editCurrency } from './editCurrency';
import { currencyActions } from '../../../../entity/Currency/currencyActions';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { currencyValidatorMap } from '../../../../entity/Currency/currencyValidatorMap';
import { processUtil } from '../../../cli-helpers/processUtil';

describe('editCurrency', () => {
  it("exits with a failure when the passed currency's id is invalid", async () => {
    currencyActions.findOne = jest.fn().mockResolvedValue(null);
    const currencyToEdit = { id: '1234', name: 'banana', code: 'BAN' };

    await editCurrency(currencyToEdit);

    expect(currencyActions.findOne).toHaveBeenCalledWith(1234);
    expect(processUtil.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'currency',
      '1234'
    );
  });

  it('exits with a failure if the update fails validation', async () => {
    const gbpWithWrongName = {
      id: 1,
      name: 'United Kingdom Pound',
      code: 'GBP',
      symbol: '£'
    };
    currencyActions.findOne = jest.fn().mockResolvedValue(gbpWithWrongName);
    const gbpUpdate = {
      ...gbpWithWrongName,
      name: 'Great Britain Pound',
      code: 'gbp'
    };
    const { value: messageMap } = validateModelObject(
      gbpUpdate,
      currencyValidatorMap
    );

    await editCurrency({ ...gbpUpdate, id: '1' });

    expect(processUtil.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'edit',
      'currency',
      messageMap
    );
  });

  it('updates the currency in the DB if successful', async () => {
    const gbpWithWrongName = {
      id: 1,
      name: 'United Kingdom Pound',
      code: 'GBP',
      symbol: '£'
    };
    currencyActions.findOne = jest.fn().mockResolvedValue(gbpWithWrongName);
    const gbpUpdate = {
      ...gbpWithWrongName,
      name: 'Great Britain Pound',
      code: 'GBP'
    };

    await editCurrency({ ...gbpUpdate, id: '1' });

    expect(currencyActions.edit).toHaveBeenCalledWith(gbpUpdate);
    expect(processUtil.logSuccess).toHaveBeenCalledWith(
      'edited',
      'currency',
      'with id 1'
    );
  });

  it('can update optional fields to empty string', async () => {
    const currencyWithBadDescription = {
      id: 2,
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      description: 'The currency of all EU member states'
    };
    currencyActions.findOne = jest
      .fn()
      .mockResolvedValue(currencyWithBadDescription);
    const currencyWithResetDescription = {
      ...currencyWithBadDescription,
      description: ''
    };

    await editCurrency({ ...currencyWithResetDescription, id: '2' });

    expect(currencyActions.edit).toHaveBeenCalledWith(
      currencyWithResetDescription
    );
    expect(processUtil.logSuccess).toHaveBeenCalledWith(
      'edited',
      'currency',
      'with id 2'
    );
  });
});

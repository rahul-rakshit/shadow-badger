jest.mock('../../../cli-helpers/processUtil');
jest.mock('../../../../entity/Category/categoryActions');

import { categoryActions } from '../../../../entity/Category/categoryActions';
import { editCategory } from './editCategory';
import { processUtil as $ } from '../../../cli-helpers/processUtil';
import { validateModelObject } from '../../../../validations/validateModelObject';
import { categoryValidatorMap } from '../../../../entity/Category/categoryValidatorMap';

describe('editCategory', () => {
  it("exits with a failure when the passed category's id is invalid", async () => {
    categoryActions.findOne = jest.fn().mockResolvedValue(null);
    const categoryToEdit = { id: '1234', name: 'Peach', code: 'PCH' };

    await editCategory(categoryToEdit);

    expect(categoryActions.findOne).toHaveBeenCalledWith(1234);
    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'category',
      '1234'
    );
  });

  it('exits with a failure if the update fails validation', async () => {
    const catWithTypo = {
      id: 1,
      name: 'Grocries',
      code: 'GRC'
    };
    categoryActions.findOne = jest.fn().mockResolvedValue(catWithTypo);
    const catUpdate = {
      ...catWithTypo,
      name: 'Groceries',
      code: 'grc'
    };
    const { value: messageMap } = validateModelObject(
      catUpdate,
      categoryValidatorMap
    );

    await editCategory({ ...catUpdate, id: '1' });

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'edit',
      'category',
      messageMap
    );
  });

  it('updates the currency in the DB if successful', async () => {
    const catWithTypo = {
      id: 1,
      name: 'Grrceries',
      code: 'GRC'
    };
    categoryActions.edit = jest.fn().mockResolvedValue(catWithTypo);
    const catWithoutTypo = {
      ...catWithTypo,
      name: 'Groceries'
    };

    await editCategory({ ...catWithoutTypo, id: '1' });

    expect(categoryActions.edit).toHaveBeenCalledWith(catWithoutTypo);
    expect($.logSuccess).toHaveBeenCalledWith(
      'edited',
      'category',
      'with id 1'
    );
  });

  it('can update optional fields to empty string', async () => {
    const categoryWithBadDescription = {
      id: 2,
      name: 'Groceries',
      code: 'GRC',
      description: 'food'
    };
    categoryActions.findOne = jest
      .fn()
      .mockResolvedValue(categoryWithBadDescription);
    const categoryWithResetDescription = {
      ...categoryWithBadDescription,
      description: ''
    };

    await editCategory({ ...categoryWithResetDescription, id: '2' });

    expect(categoryActions.edit).toHaveBeenCalledWith(
      categoryWithResetDescription
    );
    expect($.logSuccess).toHaveBeenCalledWith(
      'edited',
      'category',
      'with id 2'
    );
  });

  it('exits with message when there is an sql engine error', async () => {
    categoryActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('Help, the sql engine is over heating!!!');
    });

    await editCategory({ id: '1234', code: 'WAT' });

    expect(
      $.logAndExitOnSqlEngineError(
        'edit',
        'category',
        'Help, the sql engine is over heating!!!'
      )
    );
  });
});

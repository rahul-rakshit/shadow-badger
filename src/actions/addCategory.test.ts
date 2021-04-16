jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Category/categoryActions');

import { validateModelObject } from '../validations/validateModelObject';
import { categoryValidatorMap } from '../entity/Category/categoryValidatorMap';
import { addCategory } from './addCategory';
import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { categoryActions } from '../entity/Category/categoryActions';

describe('addCategory', () => {
  beforeEach(jest.resetAllMocks);

  it('exits with failure when validation fails', async () => {
    const categoryToAdd = {
      name: 'Fake category with incorrect code',
      code: 'CODE',
      description: 'Code has 4 chars but should have 3'
    };
    const { value: messageMap } = validateModelObject(
      categoryToAdd,
      categoryValidatorMap
    );

    await addCategory(categoryToAdd);

    expect($.logAndExitOnValidationFailure).toHaveBeenCalledWith(
      'add',
      'category',
      messageMap
    );
  });

  it('adds a category to the DB if successful', async () => {
    categoryActions.create = jest.fn().mockResolvedValue({ id: '🍅' });
    const categoryToAdd = {
      name: 'Groceries',
      code: 'GRC',
      description: 'Groceries'
    };

    await addCategory(categoryToAdd);

    expect(categoryActions.create).toHaveBeenCalledWith(categoryToAdd);
    expect($.logSuccess).toHaveBeenCalledWith(
      'added',
      'category',
      'with id 🍅'
    );
  });

  it('auto-adds optional fields (eg. description) as empty strings', async () => {
    const rent = {
      name: 'Rent',
      code: 'RNT'
    };
    const rentWithEmptyDescription = { ...rent, description: '' };

    await addCategory(rent);

    expect(categoryActions.create).toHaveBeenCalledWith(
      rentWithEmptyDescription
    );
  });

  it('exits with message if there is an sql engine error', async () => {
    categoryActions.create = jest.fn().mockImplementation(async () => {
      throw new Error('Mystery SQL error');
    });
    const categoryToAdd = {
      name: 'Groceries',
      code: 'GRC',
      description: 'Groceries'
    };

    await addCategory(categoryToAdd);

    expect(
      $.logAndExitOnSqlEngineError('add', 'category', 'Mystery SQL error')
    );
  });
});

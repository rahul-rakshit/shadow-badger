jest.mock('../../../../entity/Category/categoryActions');
jest.mock('../../../cli-helpers/processUtil');

import { categoryActions } from '../../../../entity/Category/categoryActions';
import { viewCategories } from './viewCategories';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

describe('viewCategories', () => {
  const category = {
    name: 'Special category',
    code: 'SPC',
    description: 'A category with some extra nonsense fields'
  };

  it('shows all categories that were found', async () => {
    categoryActions.findAll = jest
      .fn()
      .mockResolvedValue([{ id: 1, name: 'A', code: 'AAA' }]);

    await viewCategories({ name: 'A' });

    expect(categoryActions.findAll).toHaveBeenCalledWith({
      where: { name: 'A' }
    });
    expect($.logList).toHaveBeenCalledWith(
      [{ id: 1, name: 'A', code: 'AAA' }],
      'categories',
      { name: 'A' }
    );
  });

  it('only calls logList with id, name and code', async () => {
    const categoryWithExtraFields = {
      ...category,
      a: 'hello',
      b: 'goodbye',
      asdf: 'fdsa'
    };
    categoryActions.findAll = jest
      .fn()
      .mockResolvedValue([categoryWithExtraFields]);

    await viewCategories(categoryWithExtraFields);

    expect(categoryActions.findAll).toHaveBeenCalledWith({
      where: categoryWithExtraFields
    });
    expect($.logList([categoryWithExtraFields], 'categories', category));
  });

  it('can also be called with an empty list of options', async () => {
    const allCategories = [
      { id: 1, name: 'A', code: 'AAA' },
      {
        id: 2,
        name: 'B',
        code: 'BBB'
      }
    ];
    categoryActions.findAll = jest.fn().mockResolvedValue(allCategories);

    await viewCategories({});

    expect(categoryActions.findAll).toHaveBeenCalledWith({ where: {} });
    expect($.logList).toHaveBeenCalledWith(allCategories, 'categories', {});
  });

  it('exits with message if there is an sql engine error', async () => {
    categoryActions.findAll = jest.fn().mockImplementation(async () => {
      throw new Error('SQL only works when it sunny');
    });

    await viewCategories({});

    expect(categoryActions.findAll).toHaveBeenCalledWith({ where: {} });
    expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
      'view',
      'categories',
      'SQL only works when it sunny'
    );
  });
});

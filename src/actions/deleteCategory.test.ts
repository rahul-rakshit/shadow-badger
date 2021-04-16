jest.mock('../cli/cli-helpers/processUtil');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { categoryActions } from '../entity/Category/categoryActions';
import { deleteCategory } from './deleteCategory';

describe('deleteCategory', () => {
  it("exits with a failure when the passed currency's id is invalid", async () => {
    categoryActions.findOne = jest.fn().mockResolvedValue(null);

    await deleteCategory({ id: '1234' });

    expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
      'category',
      '1234'
    );
  });

  it('deletes the currency in the DB if successful', async () => {
    categoryActions.findOne = jest
      .fn()
      .mockResolvedValue({ id: 1234, rest: 'dummy category' });

    await deleteCategory({ id: '1234' });

    expect($.logSuccess('deleted', 'category'));
  });

  it('exits with message when there is an sql engine error', async () => {
    categoryActions.findOne = jest.fn().mockImplementation(async () => {
      throw new Error("It is the year 1973 and SQL hasn't yet been invented.");
    });

    await deleteCategory({ id: '1234' });

    expect(
      $.logAndExitOnSqlEngineError(
        'delete',
        'category',
        "It is the year 1973 and SQL hasn't yet been invented."
      )
    );
  });
});

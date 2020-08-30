jest.mock('../../../../entity/Category/categoryActions');
jest.mock('../../../cli-helpers/processUtil');

import { categoryActions } from '../../../../entity/Category/categoryActions';
import { viewCategory } from './viewCategory';
import { processUtil as $ } from '../../../cli-helpers/processUtil';

describe('viewCategory', () => {
  describe('when id is provided', () => {
    it('exits with a message when provided id is invalid', async () => {
      categoryActions.findOne = jest.fn().mockResolvedValue(null);

      await viewCategory({ id: '9999' });

      expect(categoryActions.findOne).toHaveBeenCalledWith(9999);
      expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
        'category',
        '9999'
      );
    });

    it('logs the object when the entry is found', async () => {
      const dummyCategory = {
        id: '1234',
        name: 'Peach',
        code: 'PCH'
      };
      categoryActions.findOne = jest.fn().mockResolvedValue(dummyCategory);

      await viewCategory({ id: '1234' });

      expect(categoryActions.findOne).toHaveBeenCalledWith(1234);
      expect($.logObject(dummyCategory, 'category'));
    });
  });

  describe('when id is not provided', () => {
    it('tries to find a category with the provided options', async () => {
      await viewCategory({ name: 'Dummy category', code: 'CAT' });

      expect(categoryActions.findOne).toHaveBeenCalledWith(undefined, {
        where: {
          name: 'Dummy category',
          code: 'CAT'
        }
      });
    });

    it('exits with a message when no filters are provided', async () => {
      await viewCategory({});

      expect($.logAndExitNoFilterCriteria).toHaveBeenCalled();
    });

    it('exits with a  message if there is an sql engine error', async () => {
      categoryActions.findOne = jest.fn().mockImplementation(async () => {
        throw new Error('Help, operating system is not defined!');
      });

      await viewCategory({ id: '1234' });

      expect(categoryActions.findOne).toHaveBeenCalledWith(1234);
      expect(
        $.logAndExitOnSqlEngineError(
          'view',
          'category',
          'Help, operating system is not defined!'
        )
      );
    });
  });
});

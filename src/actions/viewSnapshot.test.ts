jest.mock('../cli/cli-helpers/processUtil');
jest.mock('../entity/Snapshot/snapshotActions');

import { processUtil as $ } from '../cli/cli-helpers/processUtil';
import { snapshotActions } from '../entity/Snapshot/snapshotActions';
import { firstVolksbankSnapshot } from './__fixtures__/snapshotFixtures';
import { viewSnapshot } from './viewSnapshot';

describe('viewSnapshot', () => {
  describe('when id is provided', () => {
    it('logs the object when the entry is found', async () => {
      snapshotActions.findOne = jest
        .fn()
        .mockResolvedValue(firstVolksbankSnapshot);

      await viewSnapshot({ id: '2' });

      expect(snapshotActions.findOne).toHaveBeenCalledWith(2, {
        relations: ['account']
      });
      expect($.logObject).toHaveBeenCalledWith(
        firstVolksbankSnapshot,
        'snapshot'
      );
    });

    it('exits with a message when provided id is invalid', async () => {
      snapshotActions.findOne = jest.fn().mockResolvedValue(null);

      await viewSnapshot({ id: '1234' });

      expect(snapshotActions.findOne).toHaveBeenCalledWith(1234, {
        relations: ['account']
      });
      expect($.logAndExitNotFoundMessage).toHaveBeenCalledWith(
        'snapshot',
        '1234'
      );
    });

    describe('when id is not provided', () => {
      it('logs the entry when found', async () => {
        snapshotActions.findOne = jest
          .fn()
          .mockResolvedValue(firstVolksbankSnapshot);

        await viewSnapshot({ dateTime: '2021-01-27 15:17' });

        expect(snapshotActions.findOne).toHaveBeenCalledWith(undefined, {
          relations: ['account'],
          where: { dateTime: new Date(Date.parse('2021-01-27 15:17')) }
        });
      });

      it('tries to find a snapshot with the provided options', async () => {
        await viewSnapshot({
          dateTime: '2021-03-07 12:34',
          balance: '1234.56'
        });

        expect(snapshotActions.findOne).toHaveBeenCalledWith(undefined, {
          relations: ['account'],
          where: {
            dateTime: new Date(Date.parse('2021-03-07 12:34')),
            balance: '1234.56'
          }
        });
      });

      it('exits with a message when no filters are found', async () => {
        await viewSnapshot({});

        expect($.logAndExitNoFilterCriteria).toHaveBeenCalled();
      });

      it('exits with a message if there is an sqll engine error', async () => {
        snapshotActions.findOne = jest.fn().mockImplementation(async () => {
          throw new Error(
            'Ummmm, have you tried switching it off and on again?'
          );
        });

        await viewSnapshot({ id: '1357' });

        expect($.logAndExitOnSqlEngineError).toHaveBeenCalledWith(
          'view',
          'snapshot',
          'Ummmm, have you tried switching it off and on again?'
        );
      });
    });
  });
});

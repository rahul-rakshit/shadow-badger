import { Snapshot } from '../../entity/Snapshot/Snapshot-d';
import { getDate } from '../../utils/getDate';
import { dummyVolksbank } from './accountFixtures';

export const firstVolksbankSnapshotWithoutId: Snapshot = {
  dateTime: getDate('2021-01-27 15:17'),
  balance: '1324.68',
  description: '',
  account: dummyVolksbank
};

export const firstVolksbankSnapshot: Snapshot = {
  id: 2,
  ...firstVolksbankSnapshotWithoutId
};

export const secondVolksbankSnapshot: Snapshot = {
  id: 3,
  dateTime: getDate('2021-03-12 14:38'),
  balance: '1922.67',
  description: '',
  accountId: dummyVolksbank.id,
  account: dummyVolksbank
};

import { getDate } from '../../utils/getDate';
import { Transaction } from '../../entity/Transaction/Transaction-d';
import { dummyLandlord, dummyLidl } from './vendorFixtures';
import { dummyVolksbank, dummySparkasse } from './accountFixtures';
import { dummyRent, dummyGroceries } from './categoryFixtures';

export const dummyTransactions: Transaction[] = [
  {
    id: 8,
    dateTime: getDate('2017/02/02'),
    amount: '724.94',
    description: 'February rent',
    tags: ['rent', 'apartment'],
    account: dummyVolksbank,
    accountId: dummyVolksbank.id,
    category: dummyRent,
    categoryId: dummyRent.id,
    vendor: dummyLandlord,
    vendorId: dummyLandlord.id
  },
  {
    id: 13,
    dateTime: getDate('2017/02/03'),
    amount: '32.42',
    description: 'Some veggies and cheese',
    tags: ['supermarket'],
    account: dummySparkasse,
    accountId: dummySparkasse.id,
    category: dummyGroceries,
    categoryId: dummyGroceries.id,
    vendor: dummyLidl,
    vendorId: dummyLidl.id
  },
  {
    id: 14,
    dateTime: getDate('2017/02/03'),
    amount: '0.92',
    description: 'Woopsie, I forgot to buy milk',
    tags: ['groceries'],
    account: dummySparkasse,
    accountId: dummySparkasse.id,
    category: dummyGroceries,
    categoryId: dummyGroceries.id,
    vendor: dummyLidl,
    vendorId: dummyLidl.id
  }
];

export const transactionLog = [
  {
    id: 8,
    dateTime: getDate('2017/02/02').toISOString(),
    amount: '724.94',
    account: dummyVolksbank.code,
    category: dummyRent.code,
    vendor: dummyLandlord.name
  },
  {
    id: 13,
    dateTime: getDate('2017/02/03').toISOString(),
    amount: '32.42',
    account: dummySparkasse.code,
    category: dummyGroceries.code,
    vendor: dummyLidl.name
  },
  {
    id: 14,
    dateTime: getDate('2017/02/03').toISOString(),
    amount: '0.92',
    account: dummySparkasse.code,
    category: dummyGroceries.code,
    vendor: dummyLidl.name
  }
];

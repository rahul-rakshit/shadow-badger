import { Account } from '../../entity/Account/Account-d';
import { Currency } from '../../entity/Currency/Currency-d';
import { getDate } from '../../utils/getDate';
import { Category } from '../../entity/Category/Category-d';
import { Vendor } from '../../entity/Vendor/Vendor-d';
import { Transaction } from '../../entity/Transaction/Transaction-d';

export const dummyEuro: Currency = {
  id: 5,
  name: 'Euro',
  code: 'EUR',
  symbol: '€',
  description: 'The currency of the European Union'
};

export const dummySparkasse: Account = {
  id: 1,
  name: 'Sparkasse Kassel',
  description: 'Ein altes Konto, dass ich noch rumfliegen habe',
  opened: getDate('1994/06/28'),
  closed: null,
  currency: dummyEuro,
  currencyId: dummyEuro.id
};

export const dummyVolksbank: Account = {
  id: 7,
  name: 'Volksbank Göttingen',
  description: '',
  opened: getDate('2003/06/17'),
  closed: null,
  currency: dummyEuro,
  currencyId: dummyEuro.id
};

export const dummyGroceries: Category = {
  id: 2,
  code: 'GRC',
  description: 'Groceries'
};

export const dummyRent: Category = {
  id: 4,
  code: 'RNT',
  description: 'Rent'
};

export const dummyLandlord: Vendor = {
  id: 9,
  name: 'Landlord',
  coordinates: '',
  address: '',
  description: 'Mein Vermieter'
};

export const dummyLidl: Vendor = {
  id: 11,
  name: 'Lidl Prenzlauer Allee',
  address: 'Prenzlauer Allee 44, 10405 Berlin, Germany',
  description: 'Big on British, Lidl on price',
  coordinates: '52.53629, 13.42295'
};

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

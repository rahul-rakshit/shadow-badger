import { Account } from '../../entity/Account/Account-d';
import { Currency } from '../../entity/Currency/Currency-d';
import { getDate } from '../../utils/getDate';
import { Category } from '../../entity/Category/Category-d';
import { Vendor } from '../../entity/Vendor/Vendor-d';
import { Transaction } from '../../entity/Transaction/Transaction-d';

export const viewTransactionsDummyEuro: Currency = {
  id: 5,
  name: 'Euro',
  code: 'EUR',
  symbol: '€',
  description: 'The currency of the European Union'
};

export const viewTransactionsDummySparkasse: Account = {
  id: 1,
  name: 'Sparkasse Kassel',
  description: 'Ein altes Konto, dass ich noch rumfliegen habe',
  opened: getDate('1994/06/28'),
  closed: null,
  currency: viewTransactionsDummyEuro,
  currencyId: viewTransactionsDummyEuro.id
};

export const viewTransactionsDummyVolksbank: Account = {
  id: 7,
  name: 'Volksbank Göttingen',
  description: '',
  opened: getDate('2003/06/17'),
  closed: null,
  currency: viewTransactionsDummyEuro,
  currencyId: viewTransactionsDummyEuro.id
};

export const viewTransactionsDummyGroceries: Category = {
  id: 2,
  code: 'GRC',
  description: 'Groceries'
};

export const viewTransactionsDummyRent: Category = {
  id: 4,
  code: 'RNT',
  description: 'Rent'
};

export const viewTransactionsDummyLandlord: Vendor = {
  id: 9,
  name: 'Landlord',
  coordinates: '',
  address: '',
  description: 'Mein Vermieter'
};

export const viewTransactionsDummyLidl: Vendor = {
  id: 11,
  name: 'Lidl Prenzlauer Allee',
  address: 'Prenzlauer Allee 44, 10405 Berlin, Germany',
  description: 'Big on British, Lidl on price',
  coordinates: '52.53629, 13.42295'
};

export const viewTransactionsDummyTransactions: Transaction[] = [
  {
    id: 8,
    dateTime: getDate('2017/02/02'),
    amount: '724.94',
    description: 'February rent',
    account: viewTransactionsDummyVolksbank,
    accountId: viewTransactionsDummyVolksbank.id,
    category: viewTransactionsDummyRent,
    categoryId: viewTransactionsDummyRent.id,
    vendor: viewTransactionsDummyLandlord,
    vendorId: viewTransactionsDummyLandlord.id
  },
  {
    id: 13,
    dateTime: getDate('2017/02/03'),
    amount: '32.42',
    description: 'Some veggies and cheese',
    account: viewTransactionsDummySparkasse,
    accountId: viewTransactionsDummySparkasse.id,
    category: viewTransactionsDummyGroceries,
    categoryId: viewTransactionsDummyGroceries.id,
    vendor: viewTransactionsDummyLidl,
    vendorId: viewTransactionsDummyLidl.id
  },
  {
    id: 14,
    dateTime: getDate('2017/02/03'),
    amount: '0.92',
    description: 'Woopsie, I forgot to buy milk',
    account: viewTransactionsDummySparkasse,
    accountId: viewTransactionsDummySparkasse.id,
    category: viewTransactionsDummyGroceries,
    categoryId: viewTransactionsDummyGroceries.id,
    vendor: viewTransactionsDummyLidl,
    vendorId: viewTransactionsDummyLidl.id
  }
];

export const viewTransactionsLog = [
  {
    id: 8,
    dateTime: getDate('2017/02/02').toISOString(),
    amount: '724.94',
    account: viewTransactionsDummyVolksbank.code,
    category: viewTransactionsDummyRent.code,
    vendor: viewTransactionsDummyLandlord.name
  },
  {
    id: 13,
    dateTime: getDate('2017/02/03').toISOString(),
    amount: '32.42',
    account: viewTransactionsDummySparkasse.code,
    category: viewTransactionsDummyGroceries.code,
    vendor: viewTransactionsDummyLidl.name
  },
  {
    id: 14,
    dateTime: getDate('2017/02/03').toISOString(),
    amount: '0.92',
    account: viewTransactionsDummySparkasse.code,
    category: viewTransactionsDummyGroceries.code,
    vendor: viewTransactionsDummyLidl.name
  }
];

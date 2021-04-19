import { Account } from '../../entity/Account/Account-d';
import { getDate } from '../../utils/getDate';
import { dummyEuro } from './currencyFixtures';

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

import { Currency } from '../Currency/Currency-d';
import { DbCoreFields } from '../DbCoreFields-d';

interface AccountFields {
  name?: string;
  code?: string;
  description?: string;
}

interface AccountRelationFields {
  currency?: Currency;
  currencyId?: number;
}

export type Account = { id?: number } & AccountFields &
  AccountRelationFields &
  DbCoreFields;

import { DbCoreFields } from '../DbCoreFields-d';

interface CurrencyDomainFields {
  name?: string;
  code?: string;
  symbol?: string;
}

export type Currency = { id?: number } & CurrencyDomainFields & DbCoreFields;

import { Currency } from '../Currency/Currency-d';

export interface Account {
  id?: number;
  name?: string;
  code?: string;
  currency?: Currency;
}

import { Currency } from './Currency-d';
import { EntitySchema } from 'typeorm';

export const currencySchema = new EntitySchema<Currency>({
  name: 'currency',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: { type: 'varchar' },
    code: { type: 'varchar' },
    symbol: { type: 'varchar' }
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['code']
    }
  ]
});

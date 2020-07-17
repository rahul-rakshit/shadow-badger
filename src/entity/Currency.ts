import { EntitySchema } from 'typeorm';

export interface Currency {
  id?: string;
  name?: string;
  code?: string;
  symbol?: string;
}

export const CurrencySchema = new EntitySchema<Currency>({
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

import { Currency } from './Currency-d';
import { EntitySchema } from 'typeorm';
import { schemaCoreColumns, idColumn } from '../schemaColumns';

export const currencySchema = new EntitySchema<Currency>({
  name: 'currency',
  columns: {
    ...idColumn,
    name: { type: 'varchar' },
    code: { type: 'varchar' },
    symbol: { type: 'varchar' },
    ...schemaCoreColumns
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['code']
    }
  ]
});

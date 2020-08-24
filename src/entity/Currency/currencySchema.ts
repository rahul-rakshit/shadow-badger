import { Currency } from './Currency-d';
import { EntitySchema } from 'typeorm';
import { schemaCoreColumns, idColumn } from '../schemaColumns';

export const currencySchema = new EntitySchema<Currency>({
  name: 'currency',
  columns: {
    ...idColumn,
    name: { type: String },
    code: { type: String },
    symbol: { type: String },
    description: { type: String, nullable: true },
    ...schemaCoreColumns
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['code']
    }
  ]
});

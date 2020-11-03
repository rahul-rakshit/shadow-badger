import { EntitySchema } from 'typeorm';
import { Account } from './Account-d';
import { idColumn, schemaCoreColumns } from '../schemaColumns';

export const accountSchema = new EntitySchema<Account>({
  name: 'account',
  columns: {
    ...idColumn,
    name: { type: String },
    code: { type: String },
    description: { type: String },
    opened: { type: Date, nullable: true },
    closed: { type: Date, nullable: true },
    ...schemaCoreColumns
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['code']
    }
  ],
  relations: {
    currency: {
      type: 'many-to-one',
      target: 'currency',
      joinColumn: true,
      cascade: true
    }
  }
});

import { EntitySchema } from 'typeorm';
import { Transaction } from './Transaction-d';
import { idColumn, schemaCoreColumns } from '../schemaColumns';

const manyToOneProperties = {
  type: 'many-to-one',
  joinColumn: true,
  cascade: true
} as const;

export const transactionSchema = new EntitySchema<Transaction>({
  name: 'transaction',
  columns: {
    ...idColumn,
    dateTime: { type: Date },
    amount: { type: String },
    description: { type: String },
    tags: { type: 'simple-array' },
    accountId: { type: Number },
    categoryId: { type: Number },
    vendorId: { type: Number },
    ...schemaCoreColumns
  },
  relations: {
    account: {
      target: 'account',
      ...manyToOneProperties
    },
    category: {
      target: 'category',
      ...manyToOneProperties
    },
    vendor: {
      target: 'vendor',
      ...manyToOneProperties
    }
  }
});

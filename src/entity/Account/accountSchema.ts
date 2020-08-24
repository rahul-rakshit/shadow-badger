import { EntitySchema } from 'typeorm';
import { Account } from './Account-d';

export const accountSchema = new EntitySchema<Account>({
  name: 'account',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: { type: String },
    code: { type: String }
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

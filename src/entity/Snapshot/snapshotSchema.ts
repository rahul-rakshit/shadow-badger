import { EntitySchema } from 'typeorm';
import { Snapshot } from './Snapshot-d';
import { idColumn, schemaCoreColumns } from '../schemaColumns';

export const snapshotSchema = new EntitySchema<Snapshot>({
  name: 'snapshot',
  columns: {
    ...idColumn,
    dateTime: { type: Date },
    balance: { type: String },
    description: { type: String },
    accountId: { type: Number },
    ...schemaCoreColumns
  },
  relations: {
    account: {
      type: 'many-to-one',
      target: 'account',
      joinColumn: true,
      cascade: true
    }
  }
});

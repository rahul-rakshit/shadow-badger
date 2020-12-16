import { EntitySchema } from 'typeorm';
import { Vendor } from './Vendor-d';
import { idColumn, schemaCoreColumns } from '../schemaColumns';

export const vendorSchema = new EntitySchema<Vendor>({
  name: 'vendor',
  columns: {
    ...idColumn,
    name: { type: String },
    address: { type: String },
    description: { type: String },
    coordinates: { type: String },
    ...schemaCoreColumns
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['name']
    }
  ]
});

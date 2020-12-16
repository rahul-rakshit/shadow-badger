import { EntitySchema } from 'typeorm';
import { Category } from './Category-d';
import { idColumn, schemaCoreColumns } from '../schemaColumns';

export const categorySchema = new EntitySchema<Category>({
  name: 'category',
  columns: {
    ...idColumn,
    name: { type: String },
    code: { type: String },
    description: { type: String },
    ...schemaCoreColumns
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['name', 'code']
    }
  ]
});

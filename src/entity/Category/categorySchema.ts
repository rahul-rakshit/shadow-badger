import { EntitySchema } from 'typeorm';
import { Category } from './Category-d';

export const categorySchema = new EntitySchema<Category>({
  name: 'category',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: { type: 'varchar' },
    code: { type: 'varchar' },
    description: { type: 'varchar' }
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['name', 'code']
    }
  ]
});

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
    name: { type: String },
    code: { type: String },
    description: { type: String }
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['name', 'code']
    }
  ]
});

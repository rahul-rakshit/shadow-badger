import { EntitySchema } from 'typeorm';
import { ModelValidatorMap } from '../validations/validations-d';
import { required } from '../validations/validationBuilders/required';
import { combine } from '../validations/combine';
import { exactLength } from '../validations/validationBuilders/exactLength';
import { allCaps } from '../validations/validationBuilders/allCaps';
import { generateActionsWrapper } from './actionsWrapper/generateActionsWrapper';

export interface Category {
  id?: string;
  name?: string;
  code?: string;
  description?: string;
}

export const CategorySchema = new EntitySchema<Category>({
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

export const categoryValidatorMap: ModelValidatorMap<Category> = {
  name: required(),
  code: combine(required(), exactLength(3), allCaps()),
  description: required()
};

export const categoryActions = generateActionsWrapper<Category>(CategorySchema);

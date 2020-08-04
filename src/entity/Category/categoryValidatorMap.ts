import { required } from '../../validations/validationBuilders/required';
import { allCaps } from '../../validations/validationBuilders/allCaps';
import { exactLength } from '../../validations/validationBuilders/exactLength';
import { combine } from '../../validations/combine';
import { Category } from './Category-d';
import { ModelValidatorMap } from '../../validations/validations-d';

export const categoryValidatorMap: ModelValidatorMap<Category> = {
  name: required(),
  code: combine(required(), exactLength(3), allCaps()),
  description: required()
};

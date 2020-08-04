import { required } from '../../validations/validationBuilders/required';
import { allCaps } from '../../validations/validationBuilders/allCaps';
import { combine } from '../../validations/combine';
import { exactLength } from '../../validations/validationBuilders/exactLength';
import { Currency } from './Currency-d';
import { ModelValidatorMap } from '../../validations/validations-d';

export const currencyValidatorMap: ModelValidatorMap<Currency> = {
  name: required(),
  code: combine(required(), exactLength(3), allCaps()),
  symbol: required()
};

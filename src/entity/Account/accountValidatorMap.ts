import { ModelValidatorMap } from '../../validations/validations-d';
import { Account } from './Account-d';
import { required } from '../../validations/validationBuilders/required';
import { combine } from '../../validations/combine';
import { exactLength } from '../../validations/validationBuilders/exactLength';
import { allCaps } from '../../validations/validationBuilders/allCaps';
import { validDate } from '../../validations/validationBuilders/validDate';

export const accountValidatorMap: ModelValidatorMap<Account> = {
  name: required(),
  code: combine(required(), exactLength(4), allCaps()),
  currency: required(),
  opened: validDate(),
  closed: validDate()
};

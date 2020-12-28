import { ModelValidatorMap } from '../../validations/validations-d';
import { Transaction } from './Transaction-d';
import { required } from '../../validations/validationBuilders/required';
import { combine } from '../../validations/combine';
import { validNumber } from '../../validations/validationBuilders/validNumber';
import { validDate } from '../../validations/validationBuilders/validDate';

export const transactionValidatorMap: ModelValidatorMap<Transaction> = {
  dateTime: combine(required(), validDate()),
  amount: combine(required(), validNumber())
};

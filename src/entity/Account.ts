import { EntitySchema } from 'typeorm';
import { ModelValidatorMap } from '../validations/validations-d';
import { required } from '../validations/validationBuilders/required';
import { combine } from '../validations/combine';
import { exactLength } from '../validations/validationBuilders/exactLength';
import { allCaps } from '../validations/validationBuilders/allCaps';
import { generateActionsWrapper } from './actionsWrapper/generateActionsWrapper';
import { Currency } from './Currency';

export interface Account {
  id?: string;
  name?: string;
  code?: string;
  currency?: Currency;
}

export const AccountSchema = new EntitySchema<Account>({
  name: 'account',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: { type: 'varchar' },
    code: { type: 'varchar' }
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['code']
    }
  ],
  relations: {
    currency: {
      type: 'many-to-one',
      target: 'currency',
      joinColumn: true,
      cascade: true
    }
  }
});

export const accountValidatorMap: ModelValidatorMap<Account> = {
  name: required(),
  code: combine(required(), exactLength(4), allCaps()),
  currency: required()
};

export const accountActions = generateActionsWrapper<Account>(AccountSchema);

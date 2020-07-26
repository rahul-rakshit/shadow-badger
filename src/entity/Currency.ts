import { EntitySchema } from 'typeorm';
import { ModelValidatorMap } from '../validations/validations-d';
import { required } from '../validations/validationBuilders/required';
import { combine } from '../validations/combine';
import { exactLength } from '../validations/validationBuilders/exactLength';
import { allCaps } from '../validations/validationBuilders/allCaps';
import { generateActionsWrapper } from './actionsWrapper/generateActionsWrapper';

export interface Currency {
  id?: string;
  name?: string;
  code?: string;
  symbol?: string;
}

export const CurrencySchema = new EntitySchema<Currency>({
  name: 'currency',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    name: { type: 'varchar' },
    code: { type: 'varchar' },
    symbol: { type: 'varchar' }
  },
  uniques: [
    {
      name: 'UNIQUE_TEST',
      columns: ['code']
    }
  ]
});

export const currencyValidatorMap: ModelValidatorMap<Currency> = {
  name: required(),
  code: combine(required(), exactLength(3), allCaps()),
  symbol: required()
};

export const currencyActions = generateActionsWrapper<Currency>(CurrencySchema);

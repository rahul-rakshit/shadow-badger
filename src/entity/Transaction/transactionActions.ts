import { generateActionsWrapper } from '../generateActionsWrapper';
import { Transaction } from './Transaction-d';
import { transactionSchema } from './transactionSchema';

export const transactionActions = generateActionsWrapper<Transaction>(
  transactionSchema
);

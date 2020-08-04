import { currencySchema } from './currencySchema';
import { generateActionsWrapper } from '../generateActionsWrapper';
import { Currency } from './Currency-d';

export const currencyActions = generateActionsWrapper<Currency>(currencySchema);

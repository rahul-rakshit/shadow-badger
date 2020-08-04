import { accountSchema } from './accountSchema';
import { Account } from './Account-d';
import { generateActionsWrapper } from '../generateActionsWrapper';

export const accountActions = generateActionsWrapper<Account>(accountSchema);

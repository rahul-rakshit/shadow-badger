import { categorySchema } from './categorySchema';
import { Category } from './Category-d';
import { generateActionsWrapper } from '../generateActionsWrapper';

export const categoryActions = generateActionsWrapper<Category>(categorySchema);

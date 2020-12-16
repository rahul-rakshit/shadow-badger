import { generateActionsWrapper } from '../generateActionsWrapper';
import { Vendor } from './Vendor-d';
import { vendorSchema } from './vendorSchema';

export const vendorActions = generateActionsWrapper<Vendor>(vendorSchema);

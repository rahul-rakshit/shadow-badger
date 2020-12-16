import { ModelValidatorMap } from '../../validations/validations-d';
import { Vendor } from './Vendor-d';
import { validCoordinates } from '../../validations/validationBuilders/validCoordinates';
import { required } from '../../validations/validationBuilders/required';

export const vendorValidatorMap: ModelValidatorMap<Vendor> = {
  name: required(),
  coordinates: validCoordinates()
};

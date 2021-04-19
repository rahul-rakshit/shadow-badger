import { ModelValidatorMap } from '../../validations/validations-d';
import { Snapshot } from './Snapshot-d';
import { validDate } from '../../validations/validationBuilders/validDate';
import { validNumber } from '../../validations/validationBuilders/validNumber';

export const snapshotValidatorMap: ModelValidatorMap<Snapshot> = {
  dateTime: validDate(),
  balance: validNumber()
};

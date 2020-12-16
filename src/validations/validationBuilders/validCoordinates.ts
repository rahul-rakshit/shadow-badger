import { Either, asSuccess, asFailure } from '../../types-d';
import { ValidationFunction, Field } from '../validations-d';

const errorMessage = 'Coordinates are not valid';

export function validCoordinates(): ValidationFunction {
  return function (val?: Field): Either<string, true> {
    if (val === '') return asSuccess(true);

    if (typeof val !== 'string') return asFailure(errorMessage);

    const coordinatesArray = val.split(',');
    const latitude = Number(coordinatesArray[0]);
    const longitude = Number(coordinatesArray[1]);

    if (coordinatesArray.length !== 2) return asFailure(errorMessage);
    if (isNaN(latitude) || isNaN(longitude)) return asFailure(errorMessage);
    if (Math.abs(latitude) > 90) return asFailure(errorMessage);
    if (Math.abs(longitude) > 180) return asFailure(errorMessage);

    return asSuccess(true);
  };
}

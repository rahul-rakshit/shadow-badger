import { Either } from '../types-d';

export type Field = string | number | Date;

export type ValidationFunction = (val?: Field) => Either<string, true>;
export type ModelValidatorMap<M> = {
  [key in keyof M]?: ValidationFunction;
} & {
  __doc?: (val?: M) => Either<string, true>;
};
export type ModelValidationMessageMap<M> = { [key in keyof M]?: string };
export type ModelValidation<M> = Either<ModelValidationMessageMap<M>, true>;

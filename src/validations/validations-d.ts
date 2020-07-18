import { Either } from '../types-d';

export type ValidationFunction = (val?: string) => Either<string, true>;

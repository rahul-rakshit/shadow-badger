import { isNullish } from './isNullish';

export function parseDefinedOpts<O>(opts: O) {
  return Object.entries(opts).reduce<Partial<O>>(
    (accumulator, [key, value]) => {
      if (isNullish(value)) return accumulator;
      else return { ...accumulator, [key]: value };
    },
    {}
  );
}

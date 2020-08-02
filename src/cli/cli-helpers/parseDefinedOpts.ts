export function parseDefinedOpts<O>(opts: O) {
  return Object.entries(opts).reduce<Partial<O>>(
    (accumulator, [key, value]) => {
      if (!value) return accumulator;
      else return { ...accumulator, [key]: value };
    },
    {}
  );
}

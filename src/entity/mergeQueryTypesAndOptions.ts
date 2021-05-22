import { isNullish } from '../utils/isNullish';

export function mergeQueryTypesAndOptions<T>(
  options: T,
  queryTypes: Partial<{ [key in keyof T]: string }>,
  operators: { [key: string]: (input: string) => any }
) {
  const mergedOptions: Partial<{ [key in keyof T]: any }> = {};

  Object.keys(options).forEach((key) => {
    const potentialQueryType = queryTypes[key as keyof T];
    const option = options[key as keyof T];
    if (isNullish(potentialQueryType)) {
      mergedOptions[key as keyof T] = option;
    } else {
      const query = (operators as any)[potentialQueryType] as (
        input: string
      ) => any;
      mergedOptions[key as keyof T] = query((option as unknown) as string);
    }
  });

  return mergedOptions;
}

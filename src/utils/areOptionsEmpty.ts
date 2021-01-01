import { parseDefinedOpts } from './parseDefinedOpts';

export function areOptionsEmpty(options: object) {
  return Object.keys(parseDefinedOpts(options)).length === 0;
}

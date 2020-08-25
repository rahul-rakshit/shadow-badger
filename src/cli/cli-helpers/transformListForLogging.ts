import { boldify } from './boldify';

export function transformListForLogging(list: any[]) {
  if (list.length === 0) return list;

  const headers = Object.keys(list[0]).map(boldify);
  const data = list.map((row) => Object.values(row));

  return [headers, ...data];
}

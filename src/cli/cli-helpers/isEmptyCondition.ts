export function isEmptyCondition(object: object) {
  return Object.values(object).every((val: any) => val === undefined);
}

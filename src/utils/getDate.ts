export function getDate(dateInput: string): Date {
  const epochTime = Date.parse(dateInput);
  return new Date(epochTime);
}

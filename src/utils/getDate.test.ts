import { getDate } from './getDate';

describe('getDate', () => {
  const refDate = new Date('2020-06-12T00:00:00.000Z');

  it('returns a Date object for a valid date (YYYY/MM/DD) string', () => {
    const dateInput = '2020/06/12';

    const extractedDate = getDate(dateInput);

    expect(extractedDate).toEqual(refDate);
  });

  it('also supposed YYYY-MM-DD format', () => {
    const dateInput = '2020-06-12';

    const extractedDate = getDate(dateInput);

    expect(extractedDate).toEqual(refDate);
  });

  it('also supports full ISO date format', () => {
    const dateInput = '2020-06-12T00:00:00.000Z';

    const extractedDate = getDate(dateInput);

    expect(extractedDate).toEqual(refDate);
  });

  it('returns an invalid date if the date is invalid', () => {
    const dateInput = 'dingdong';

    const extractedDate = getDate(dateInput);

    expect(Number(extractedDate)).toBeNaN();
  });

  it('returns an invalid date if the date is empty string', () => {
    const dateInput = '';

    const extractedDate = getDate(dateInput);

    expect(Number(extractedDate)).toBeNaN();
  });

  it('returns an invalid date if the date is nullish', () => {
    const dateInput = undefined;

    const extractedDate = getDate(dateInput as any);

    expect(Number(extractedDate)).toBeNaN();
  });
});

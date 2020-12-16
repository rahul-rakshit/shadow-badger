import { validCoordinates } from './validCoordinates';

describe('validCoordinates returns a function that', () => {
  const coordinatesErrorMessage = 'Coordinates are not valid';

  it('passes validation if the coordinates are valid', () => {
    const goodCoordinates = '52.5076, 13.3909';

    const validate = validCoordinates();
    const validation = validate(goodCoordinates);

    expect(validation).toHaveSucceeded();
  });

  it('passes validation if input is an empty string', () => {
    const validate = validCoordinates();
    const validation = validate('');

    expect(validation).toHaveSucceeded();
  });

  it("fails validation if there aren't exactly 2 coordinates", () => {
    const threeCoordinates = '1.11, 2.22, 3.33';

    const validate = validCoordinates();
    const validation = validate(threeCoordinates);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(coordinatesErrorMessage);
  });

  it("fails validation if coordinates aren't valid numbers", () => {
    const threeCoordinates = 'apple, banana';

    const validate = validCoordinates();
    const validation = validate(threeCoordinates);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(coordinatesErrorMessage);
  });

  it("fails validation if latitude isn't between -90 and 90", () => {
    const coordinatesWithBadLatitude = '-100, 50';

    const validate = validCoordinates();
    const validation = validate(coordinatesWithBadLatitude);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(coordinatesErrorMessage);
  });

  it("fails validation if longitude isn't between -180 and 180", () => {
    const coordinatesWithBadLongitude = '-50, -200';

    const validate = validCoordinates();
    const validation = validate(coordinatesWithBadLongitude);

    expect(validation).toHaveFailed();
    expect(validation.value).toEqual(coordinatesErrorMessage);
  });
});

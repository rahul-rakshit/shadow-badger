import { tagify } from './tagify';

describe('tagify', () => {
  it('converts a comma-separated string into an array of tags', () => {
    const inputString = 'fruits,vegetables,cheeses';

    const tagsList = tagify(inputString);

    expect(tagsList).toEqual(['fruits', 'vegetables', 'cheeses']);
  });

  it('appends new tags to previous tags if provided', () => {
    const previousTags = ['bus'];
    const inputString = 'car,bicycle,motorcycle';

    const tagsList = tagify(inputString, previousTags);

    expect(tagsList).toEqual(['bus', 'car', 'bicycle', 'motorcycle']);
  });

  it('ensures there are no duplicates', () => {
    const previousTags = ['onion'];
    const inputString = 'garlic,hing,onion';

    const tagsList = tagify(inputString, previousTags);

    expect(tagsList).toEqual(['onion', 'garlic', 'hing']);
  });

  it('removes leading and trailing spaces', () => {
    const previousTags = ['  boat', 'dingy'];
    const inputString = 'ship , canoe, boat';

    const tagsList = tagify(inputString, previousTags);

    expect(tagsList).toEqual(['boat', 'dingy', 'ship', 'canoe']);
  });

  it('removes empty strings from tagsList', () => {
    const inputString = '   ';

    const tagsList = tagify(inputString);

    expect(tagsList).toEqual([]);
  });

  it('treats an undefined input as no input as well', () => {
    const inputString = undefined;

    const tagsList = tagify(inputString);

    expect(tagsList).toEqual([]);
  });
});

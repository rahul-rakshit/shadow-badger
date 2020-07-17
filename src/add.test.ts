import { add } from './add';

describe('add', () => {
  it('can add two numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});

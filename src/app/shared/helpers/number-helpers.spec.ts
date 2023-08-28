import { getRandomNumber } from '@shared/helpers/number-helpers';

describe('getRandomNumber', () => {
  it('should return a random number between provided min and max values', () => {
    const min = 1;
    const max = 10;
    const possibleResults: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = getRandomNumber(min, max);
    expect(possibleResults).toContain(result);
  });
});

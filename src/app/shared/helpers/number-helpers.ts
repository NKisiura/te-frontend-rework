/**
 * Function returns a random number between provided min and max values.
 *
 * @param min - Minimum value of the random number.
 * @param max - Maximum value of the random number.
 * @example
 * const randomNumber = getRandomNumber(1, 100);
 */
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

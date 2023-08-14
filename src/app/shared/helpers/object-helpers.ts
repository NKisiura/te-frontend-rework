/**
 * ## Function removes properties that start with '_'.
 *
 * Takes an input object and returns a new object after recursively removing properties that start with '_'. Recursively processes nested objects and arrays.
 * <br>
 * @example
 * const inputObject = {
 *   _privateProp: 'private value',
 *   publicProp: 'public value',
 *   nestedObj: {
 *     _nestedPrivateProp: 'nested private value',
 *     nestedPublicProp: 'nested public value',
 *   },
 * };
 *
 * const result = deleteObjectServicePropertiesRecursively(inputObject);
 *
 * console.log(result);
 * // Output: { publicProp: 'public value', nestedObj: { nestedPublicProp: 'nested public value' } }
 */
export const deleteObjectServicePropertiesRecursively = (
  object: object
): object => {
  const handleArrayRecursively = (value: unknown[]): unknown[] => {
    return value.map((item: unknown) => {
      if (Array.isArray(item)) {
        return handleArrayRecursively(item);
      }

      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        return deleteObjectServicePropertiesRecursively(item);
      }

      return item;
    });
  };

  return Object.entries(object).reduce(
    (
      newObject: { [key: string]: unknown },
      [key, value]: [string, unknown]
    ) => {
      if (!key.startsWith('_')) {
        if (Array.isArray(value)) {
          return {
            ...newObject,
            [key]: handleArrayRecursively(value),
          };
        }

        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          return {
            ...newObject,
            [key]: deleteObjectServicePropertiesRecursively(value),
          };
        }

        return { ...newObject, [key]: value };
      }

      return { ...newObject };
    },
    {}
  );
};

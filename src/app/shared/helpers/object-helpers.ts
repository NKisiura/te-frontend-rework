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
 * const result = deleteObjectPrivatePropertiesRecursively(inputObject);
 *
 * console.log(result);
 * // Output: { publicProp: 'public value', nestedObj: { nestedPublicProp: 'nested public value' } }
 */
export const deleteObjectPrivatePropertiesRecursively = (
  object: object
): object => {
  const handleArrayRecursively = (value: unknown[]): unknown[] => {
    return value.map((item: unknown) => {
      if (Array.isArray(item)) {
        return handleArrayRecursively(item);
      }

      if (typeof item === 'object' && item !== null) {
        return deleteObjectPrivatePropertiesRecursively(item);
      }

      return item;
    });
  };

  const newObject: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(object)) {
    if (key.startsWith('_')) {
      continue;
    }

    if (Array.isArray(value)) {
      newObject[key] = handleArrayRecursively(value);
    } else if (typeof value === 'object' && value !== null) {
      newObject[key] = deleteObjectPrivatePropertiesRecursively(value);
    } else {
      newObject[key] = value;
    }
  }

  return newObject;
};

import { deleteObjectServicePropertiesRecursively } from '@shared/helpers/object-helpers';

describe('deleteObjectServicePropertiesRecursively', () => {
  it('should remove properties starting with "_" from a simple object', () => {
    const input = {
      _privateProp: 'value1',
      publicProp: 'value2',
    };
    const expectedOutput = {
      publicProp: 'value2',
    };

    const result = deleteObjectServicePropertiesRecursively(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should recursively remove properties starting with "_" from nested objects', () => {
    const input = {
      publicProp: 'value1',
      nested: {
        _privateNestedProp: 'value2',
        publicNestedProp: 'value3',
        anotherNested: {
          _privateNestedProp: 'value4',
          publicNestedProp: 'value5',
        },
      },
    };
    const expectedOutput = {
      publicProp: 'value1',
      nested: {
        publicNestedProp: 'value3',
        anotherNested: {
          publicNestedProp: 'value5',
        },
      },
    };

    const result = deleteObjectServicePropertiesRecursively(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should recursively remove properties starting with "_" from arrays', () => {
    const input = {
      publicProp: 'value1',
      arrayProp: [
        {
          _privateArrayProp: 'value2',
          publicArrayProp: 'value3',
          publicArrayProp2: { publicObjectProp: 'value4' },
        },
        {
          _privateArrayProp: 'value5',
          publicArrayProp: 'value6',
          publicArrayProp2: { publicObjectProp: 'value7' },
        },
      ],
    };
    const expectedOutput = {
      publicProp: 'value1',
      arrayProp: [
        {
          publicArrayProp: 'value3',
          publicArrayProp2: { publicObjectProp: 'value4' },
        },
        {
          publicArrayProp: 'value6',
          publicArrayProp2: { publicObjectProp: 'value7' },
        },
      ],
    };
    const result = deleteObjectServicePropertiesRecursively(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should recursively remove properties starting with "_" from a matrix nested inside an object', () => {
    const input = {
      matrixProp: [
        [
          {
            prop1: 'value1',
            _serviceProp1: 'value2',
            prop2: {
              prop1: 'value1',
              _serviceProp1: 'value2',
              prop2: [{ prop1: 'value3', _serviceProp1: 'value4' }],
            },
          },
        ],
        [
          {
            prop1: 'value1',
            _serviceProp1: 'value2',
            prop2: {
              prop1: 'value1',
              _serviceProp1: 'value2',
              prop2: [{ prop1: 'value3', _serviceProp1: 'value4' }],
            },
          },
        ],
      ],
    };
    const expectedOutput = {
      matrixProp: [
        [
          {
            prop1: 'value1',
            prop2: {
              prop1: 'value1',
              prop2: [{ prop1: 'value3' }],
            },
          },
        ],
        [
          {
            prop1: 'value1',
            prop2: {
              prop1: 'value1',
              prop2: [{ prop1: 'value3' }],
            },
          },
        ],
      ],
    };

    const result = deleteObjectServicePropertiesRecursively(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should not modify the input object', () => {
    const input = {
      _privateProp: 'value1',
      publicProp: 'value2',
    };

    const result = deleteObjectServicePropertiesRecursively(input);
    expect(input).toEqual({ _privateProp: 'value1', publicProp: 'value2' });
    expect(result).not.toBe(input);
  });
});

import { Pipe, PipeTransform } from '@angular/core';

/**
 * ## Filters an array of objects based on a specific property's value.
 *
 * The `FilterByPropertyPipe` used to filter an array of objects
 * based on a specific property and a search query. It performs a case-insensitive
 * search for the specified property's value within the provided search query.
 *
 * ### The `FilterByPropertyPipe` requires two arguments:
 * * property - The property of the objects to filter by. Only properties of type string or number are allowed.
 * * searchQuery - The search query used to filter the array based on the specified property.
 * <br>
 * @example
 * //component
 * const searchQuery = 'john';
 * const user = [
 *   { name: 'John Doe', email: 'johndoe@example.com' },
 *   { name: 'Jane Doe', email: 'janedoe@example.com' },
 * ];
 *
 * //template
 * <div *ngFor="let user of users | filterByProperty : 'name' : searchQuery">
 *   {{ user.name }} - {{ user.email }}
 * </div>
 */
@Pipe({
  name: 'filterByProperty',
  standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
  public transform<T>(array: T[], property: keyof T, searchQuery: string): T[] {
    if (!array || !property || !searchQuery) {
      return array;
    }

    return array.filter((item: T) => {
      const propertyValue: T[keyof T] = item[property];
      if (
        typeof propertyValue === 'string' ||
        typeof propertyValue === 'number'
      ) {
        return propertyValue
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim());
      }
      return false;
    });
  }
}

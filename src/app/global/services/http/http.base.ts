import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DTO } from '../../entity/DTO';

export class HttpBase {
  constructor(private httpClient: HttpClient) {}

  protected getOne<T extends DTO>(
    url: string,
    entityType: { new (): T },
    params?: { [param: string]: string }
  ): Observable<T> {
    return this.httpClient.get(url, { params: params }).pipe(
      map((dto: any) => {
        const entity: T = new entityType();
        entity.populateFromDTO(dto);
        return entity;
      }),
      catchError(error => throwError(error))
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpBase {
  constructor(private httpClient: HttpClient) {}

  protected getOne<T>(
    url: string,
    params?: { [param: string]: string }
  ): Observable<T> {
    return this.httpClient.get<T>(url, { params: params });
  }
}

import { Injectable } from '@angular/core';
import { HttpBase } from './http.base';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { SessionParams } from '@shared/types/session-params.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends HttpBase {
  private readonly URL_SESSION_PARAMS: string;

  constructor(httpClient: HttpClient) {
    super(httpClient);

    this.URL_SESSION_PARAMS = environment.APP_MAIN_LINK + 'session-params.json';
  }

  public getSessionParams(): Observable<SessionParams> {
    return super.getOne<SessionParams>(this.URL_SESSION_PARAMS);
  }
}

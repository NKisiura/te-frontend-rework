import { Injectable } from '@angular/core';
import { HttpBase } from '@shared/services/http/http.base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionParams } from '@shared/types/session-params.interface';

@Injectable()
export class SessionParamsService extends HttpBase {
  private readonly URL_SESSION_PARAMS = 'session-params.json';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getSessionParams(): Observable<SessionParams> {
    return super.getOne<SessionParams>(this.URL_SESSION_PARAMS);
  }
}

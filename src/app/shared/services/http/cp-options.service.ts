import { Injectable } from '@angular/core';
import { HttpBase } from '@shared/services/http/http.base';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CpOption } from '@shared/types/cp-option.interface';

@Injectable()
export class CpOptionsService extends HttpBase {
  private readonly URL_CP_OPTIONS = 'cp-options.json';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getCpOptions(): Observable<CpOption[]> {
    return super.getAll<CpOption>(this.URL_CP_OPTIONS);
  }
}

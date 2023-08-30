import { Injectable } from '@angular/core';
import { HttpBase } from '@shared/services/http/http.base';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { CpOption } from '@shared/types/cp-option.interface';

@Injectable()
export class CpOptionsService extends HttpBase {
  private readonly URL_CP_OPTIONS: string;

  constructor(httpClient: HttpClient) {
    super(httpClient);

    this.URL_CP_OPTIONS = environment.APP_MAIN_LINK + 'cp-options.json';
  }

  public getCpOptions(): Observable<CpOption[]> {
    return super.getAll<CpOption>(this.URL_CP_OPTIONS);
  }
}

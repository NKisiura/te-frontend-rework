import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteObjectServicePropertiesRecursively } from '@shared/helpers/object-helpers';

@Injectable()
export class RequestPayloadServicePropertiesCleanerInterceptor
  implements HttpInterceptor
{
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestWithoutServiceProperties =
      this.cleanRequestServiceProperties(req);
    return next.handle(requestWithoutServiceProperties);
  }

  private cleanRequestServiceProperties(
    req: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    const payload = req.body;

    if (payload && typeof payload === 'object') {
      const payloadWithoutServiceProperties =
        deleteObjectServicePropertiesRecursively(payload);
      return req.clone({ body: payloadWithoutServiceProperties });
    }

    return req;
  }
}

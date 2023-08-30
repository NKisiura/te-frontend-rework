import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteObjectPrivatePropertiesRecursively } from '@shared/helpers/object-helpers';

@Injectable()
export class RequestPayloadPrivatePropertiesCleanerInterceptor
  implements HttpInterceptor
{
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestWithoutPrivateProperties =
      this.cleanRequestPrivateProperties(req);
    return next.handle(requestWithoutPrivateProperties);
  }

  private cleanRequestPrivateProperties(
    req: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    const payload = req.body;

    if (payload && typeof payload === 'object') {
      const payloadWithoutPrivateProperties =
        deleteObjectPrivatePropertiesRecursively(payload);
      return req.clone({ body: payloadWithoutPrivateProperties });
    }

    return req;
  }
}

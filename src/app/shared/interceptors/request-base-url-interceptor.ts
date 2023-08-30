import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

export class RequestBaseUrlInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isNeedToIgnoreRequest(req)) {
      return next.handle(req);
    }
    return next.handle(this.getModifiedRequest(req));
  }

  private isNeedToIgnoreRequest(req: HttpRequest<unknown>): boolean {
    return req.urlWithParams.includes('http');
  }

  private getModifiedRequest(req: HttpRequest<unknown>): HttpRequest<unknown> {
    return req.clone({
      url: environment.APP_MAIN_LINK + req.url,
    });
  }
}

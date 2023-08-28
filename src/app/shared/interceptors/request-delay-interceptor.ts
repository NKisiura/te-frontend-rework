import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { getRandomNumber } from '@shared/helpers/number-helpers';

export class RequestDelayInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const randomDelay = getRandomNumber(300, 1000);
    return next.handle(req).pipe(delay(randomDelay));
  }
}

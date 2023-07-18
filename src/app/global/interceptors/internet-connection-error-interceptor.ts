import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  InternetConnectionService,
  InternetConnectionState,
} from '@global/services/internet-connection.service';

@Injectable({
  providedIn: 'root',
})
export class InternetConnectionErrorInterceptor implements HttpInterceptor {
  public isConnected = true;

  constructor(
    private readonly internetConnectionService: InternetConnectionService
  ) {
    this.internetConnectionService
      .monitor()
      .subscribe((connectionState: InternetConnectionState) => {
        this.isConnected = connectionState.hasInternetConnection;
      });
  }

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleRequestError(error))
      );
  }

  private handleRequestError(error: HttpErrorResponse): Observable<never> {
    if (!this.isConnected) {
      // TODO: change alert on toaster message
      alert('You are offline');
    }
    return throwError(() => error);
  }
}

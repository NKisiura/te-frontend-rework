import { Injectable } from '@angular/core';
import { SessionService } from '../../../../global/services/http/session.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { sessionParamsActions } from './session-params.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BackendErrorResponse } from '../../../../global/types/backend-error-response.interface';
import { SessionParams } from '../../../../global/types/session-params.interface';

@Injectable()
export class SessionParamsEffect {
  public getSessionParams = createEffect(() => {
    return this.actions$.pipe(
      ofType(sessionParamsActions.getSessionParams),
      exhaustMap(() =>
        this.sessionService.getSessionParams().pipe(
          map((sessionParams: SessionParams) =>
            sessionParamsActions.getSessionParamsSuccess({ sessionParams })
          ),
          catchError((error: BackendErrorResponse) =>
            of(sessionParamsActions.getSessionParamsFailure({ error: error }))
          )
        )
      )
    );
  });

  constructor(
    private readonly sessionService: SessionService,
    private readonly actions$: Actions
  ) {}
}

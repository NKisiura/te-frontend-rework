import { Injectable } from '@angular/core';
import { SessionParamsService } from '@shared/services/http/session-params.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { sessionParamsActions } from './session-params.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BackendErrorResponse } from '@shared/types/backend-error-response.interface';
import { SessionParams } from '@shared/types/session-params.interface';

@Injectable()
export class SessionParamsEffect {
  public getSessionParams = createEffect(() => {
    return this.actions$.pipe(
      ofType(sessionParamsActions.getSessionParams),
      exhaustMap(() =>
        this.sessionParamsService.getSessionParams().pipe(
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
    private readonly sessionParamsService: SessionParamsService,
    private readonly actions$: Actions
  ) {}
}

import { Injectable } from '@angular/core';
import { CpOptionsService } from '@shared/services/http/cp-options.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { cpOptionsActions } from '@pages/dashboard/state/cp-options/cp-options.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BackendErrorResponse } from '@shared/types/backend-error-response.interface';
import { CpOption } from '@shared/types/cp-option.interface';

@Injectable()
export class CpOptionsEffect {
  public getCpOptions = createEffect(() => {
    return this.actions$.pipe(
      ofType(cpOptionsActions.getCpOptions),
      exhaustMap(() =>
        this.cpOptionsService.getCpOptions().pipe(
          map((cpOptions: CpOption[]) =>
            cpOptionsActions.getCpOptionsSuccess({ cpOptions })
          ),
          catchError((error: BackendErrorResponse) =>
            of(cpOptionsActions.getCpOptionsFailure({ error: error }))
          )
        )
      )
    );
  });

  constructor(
    private readonly cpOptionsService: CpOptionsService,
    private readonly actions$: Actions
  ) {}
}

import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { filter, first, tap } from 'rxjs';
import { selectSessionParamsLoaded } from '@pages/dashboard/state/session-params/session-params.selector';
import { sessionParamsActions } from '@pages/dashboard/state/session-params/session-params.actions';

export const sessionParamsResolver: ResolveFn<boolean> = () => {
  const store: Store = inject(Store);
  return store.select(selectSessionParamsLoaded).pipe(
    tap((isLoaded: boolean) => {
      if (!isLoaded) {
        store.dispatch(sessionParamsActions.getSessionParams());
      }
    }),
    filter(Boolean),
    first()
  );
};

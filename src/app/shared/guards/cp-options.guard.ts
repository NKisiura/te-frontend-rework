import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { selectCpOptionsLoaded } from '@pages/dashboard/state/cp-options/cp-options.selector';
import { first, tap } from 'rxjs';
import { cpOptionsActions } from '@pages/dashboard/state/cp-options/cp-options.actions';
/**
 * ## Guard will load cpOptions before allowing access to route
 */
export const cpOptionsGuard: CanActivateFn = () => {
  const store: Store = inject(Store);

  return store.select(selectCpOptionsLoaded).pipe(
    tap(isLoaded => {
      if (!isLoaded) {
        store.dispatch(cpOptionsActions.getCpOptions());
      }
    }),
    first(Boolean)
  );
};

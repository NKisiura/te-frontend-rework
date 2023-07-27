import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { filter, first, tap } from 'rxjs';
import { selectSessionParamsLoaded } from '@pages/dashboard/state/session-params/session-params.selector';
import { sessionParamsActions } from '@pages/dashboard/state/session-params/session-params.actions';

/**
 * ## Used to fetch session-parameters before navigating to a route
 *
 * The `sessionParamsResolver` used to fetch session-parameters before navigating to a route.
 * It ensures that the required session-parameters are loaded before allowing users to access the route's content.
 *
 * ### The `sessionParamsResolver`: doesn't require any additional configuration.
 * <br>
 * @example
 * //router-module
 * const routes: Routes = [
 *   {
 *     path: 'your-path',
 *     loadChildren: () => import('./your/path/yourModule.module').then(m => m.YourModule),
 *     resolve: {
 *       sessionParams: sessionParamsResolver,
 *     },
 *   },
 * ];
 */
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

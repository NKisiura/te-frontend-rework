import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs';
import {
  selectPermissionsSet,
  selectSessionParamsLoaded,
} from '@pages/dashboard/state/session-params/session-params.selector';
import { sessionParamsActions } from '@pages/dashboard/state/session-params/session-params.actions';

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const permissions: string[] = route.data['permissions'] || [];
  const store: Store = inject(Store);

  return store.select(selectSessionParamsLoaded).pipe(
    tap(isLoaded => {
      if (!isLoaded) {
        store.dispatch(sessionParamsActions.getSessionParams());
      }
    }),
    filter(Boolean),
    switchMap(() =>
      store.select(selectPermissionsSet).pipe(
        filter(Boolean),
        map((permissionsSet: Set<string>) =>
          permissions.every(permission => permissionsSet.has(permission))
        )
      )
    )
  );
};

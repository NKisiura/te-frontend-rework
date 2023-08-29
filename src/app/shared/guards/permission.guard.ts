import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs';
import {
  selectPermissionsSet,
  selectSessionParamsLoaded,
} from '@pages/dashboard/state/session-params/session-params.selector';
import { sessionParamsActions } from '@pages/dashboard/state/session-params/session-params.actions';

/**
 * ## Guard protects routes based on specific permissions
 *
 * The `permissionGuard` is a guard function designed to control access to specific routes based on user permissions.
 * It ensures that users have the required permissions before allowing them to navigate to certain routes within the application.
 *
 * ### The `permissionGuard` requires permissions for each guarded route using the data property:
 * - `permissions: string[]` - array should contain the permission strings necessary for access to the route (see example).
 * <br>
 * @example
 * //router-module
 * const routes: Routes = [
 *   {
 *     path: 'your-path',
 *     component: YourComponent,
 *     canActivate: [permissionGuard],
 *     data: {
 *       permissions: ['read.YOUR-PERMISSION-NAME'],
 *     },
 *   },
 * ];
 */
export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const requiredProjectPermissions: string[] = route.data['permissions'] || [];
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
        map((userPermissionsSet: Set<string>) =>
          requiredProjectPermissions.every(projectPermission =>
            userPermissionsSet.has(projectPermission)
          )
        )
      )
    )
  );
};

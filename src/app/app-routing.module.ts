import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sessionParamsResolver } from '@shared/resolvers/session-params.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        mod => mod.DashboardModule
      ),
    resolve: {
      sessionParams: sessionParamsResolver,
    },
  },
  {
    path: 'opened',
    loadComponent: () =>
      import(
        '@shared/components/modal-container/modal-container.component'
      ).then(mod => mod.ModalContainerComponent),
    outlet: 'modal',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

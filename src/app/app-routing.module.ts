import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionGuard } from '@shared/guards/permission.guard';
import { cpOptionsGuard } from '@shared/guards/cp-options.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@pages/dashboard/dashboard.module').then(
        mod => mod.DashboardModule
      ),
    canActivate: [permissionGuard, cpOptionsGuard],
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

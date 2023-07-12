import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sessionParamsResolver } from '@global/resolvers/session-params.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    resolve: {
      sessionParams: sessionParamsResolver,
    },
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

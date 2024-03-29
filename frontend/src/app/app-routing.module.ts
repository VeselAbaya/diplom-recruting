import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    paramsInheritanceStrategy: 'always',
    enableTracing: false,
    relativeLinkResolution: 'legacy',
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { onSameUrlNavigation: 'reload', paramsInheritanceStrategy: 'always', enableTracing: false, relativeLinkResolution: 'legacy' }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

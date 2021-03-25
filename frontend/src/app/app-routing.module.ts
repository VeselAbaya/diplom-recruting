import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ProfileGuard } from '@modules/profile/profile.guard';

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
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard, ProfileGuard],
    canDeactivate: [ProfileGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'requests',
    loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
      enableTracing: false,
      relativeLinkResolution: 'legacy'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

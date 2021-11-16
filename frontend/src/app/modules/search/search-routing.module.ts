import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from '@modules/search/search.component';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { SearchResultComponent } from '@modules/search/search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: '',
        component: SearchResultComponent
      },
      {
        path: ':id',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
        canActivate: [ProfileGuard],
        canDeactivate: [ProfileGuard],
        runGuardsAndResolvers: 'always'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}

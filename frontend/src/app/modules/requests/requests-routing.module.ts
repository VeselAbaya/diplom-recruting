import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from '@modules/requests/requests.component';
import { RequestsTabComponent } from '@modules/requests/requests-tab/requests-tab.component';
import { RequestsResolver } from '@modules/requests/requests.resolver';
import { RelationRequestType } from '@modules/requests/relation-request-type.enum';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RelationRequestType.ToMe
      },
      {
        path: ':requestType',
        component: RequestsTabComponent,
        resolve: {
          relationRequests: RequestsResolver
        },
        runGuardsAndResolvers: 'always'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide: RequestsResolver, useClass: RequestsResolver}
  ]
})
export class RequestsRoutingModule {
}

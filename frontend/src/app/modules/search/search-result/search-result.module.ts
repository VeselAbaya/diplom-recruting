import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultListComponent } from './search-result-list/search-result-list.component';
import { SearchResultGraphComponent } from './search-result-graph/search-result-graph.component';
import { UserCardComponent } from './search-result-list/user-card/user-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { SearchResultComponent } from './search-result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { HourlyModule } from '@shared/components/hourly/hourly.module';
import {
  RelationsListDialogComponent
} from './search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { RelationsModule } from '@shared/components/relations/relations.module';
import { MatDialogModule } from '@angular/material/dialog';
import {
  CreateRelationDialogComponent
} from './search-result-list/user-card/create-relation-dialog/create-relation-dialog.component';
import { RouterModule } from '@angular/router';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NetworkGraphComponent } from './search-result-graph/network-graph/network-graph.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RelationTypeModule } from '@shared/pipes/relation-type/relation-type.module';
import { FullNameModule } from '@shared/pipes/full-name/full-name.module';
import { IsBidirectionalModule } from '@shared/pipes/is-bidirectional/is-bidirectional.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { HiddenScrollWrapperModule } from '@shared/components/hidden-scroll-wrapper/hidden-scroll-wrapper.module';
import { NodeHTMLIdPipe } from './search-result-graph/node-html-id.pipe';
import { OnlyInBrowserModule } from '@shared/directives/only-in-browser/only-in-browser.module';

@NgModule({
  declarations: [
    SearchResultListComponent,
    SearchResultGraphComponent,
    UserCardComponent,
    SearchResultComponent,
    RelationsListDialogComponent,
    CreateRelationDialogComponent,
    NetworkGraphComponent,
    NodeHTMLIdPipe
  ], imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    AvatarModule,
    HourlyModule,
    RelationsModule,
    MatDialogModule,
    RouterModule,
    NgxGraphModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RelationTypeModule,
    FullNameModule,
    IsBidirectionalModule,
    OverlayModule,
    HiddenScrollWrapperModule,
    OnlyInBrowserModule
  ],
  exports: [SearchResultListComponent, SearchResultGraphComponent, SearchResultComponent]
})
export class SearchResultModule {
}

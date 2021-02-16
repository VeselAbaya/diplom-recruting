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
import { RelationsListDialogComponent } from './search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { RelationsModule } from '@shared/components/relations/relations.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateRelationDialogComponent } from './search-result-list/user-card/create-relation-dialog/create-relation-dialog.component';
import { EditRelationsDialogComponent } from './search-result-list/user-card/edit-relations-dialog/edit-relations-dialog.component';

@NgModule({
  declarations: [
    SearchResultListComponent,
    SearchResultGraphComponent,
    UserCardComponent,
    SearchResultComponent,
    RelationsListDialogComponent,
    CreateRelationDialogComponent,
    EditRelationsDialogComponent
  ],
  imports: [
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
    MatDialogModule
  ],
  exports: [SearchResultListComponent, SearchResultGraphComponent, SearchResultComponent]
})
export class SearchResultModule { }
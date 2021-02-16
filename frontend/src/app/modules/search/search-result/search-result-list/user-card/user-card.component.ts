import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelationsListDialogComponent } from '@modules/search/search-result/search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { CreateRelationDialogComponent } from '@modules/search/search-result/search-result-list/user-card/create-relation-dialog/create-relation-dialog.component';
import { EditRelationsDialogComponent } from '@modules/search/search-result/search-result-list/user-card/edit-relations-dialog/edit-relations-dialog.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  constructor(private readonly dialog: MatDialog) {
  }

  openRelationsListDialog(): void {
    this.dialog.open(RelationsListDialogComponent);
  }

  openCreateRelationDialog(): void {
    this.dialog.open(CreateRelationDialogComponent);
  }

  openEditRelationsDialog(): void {
    this.dialog.open(EditRelationsDialogComponent);
  }
}

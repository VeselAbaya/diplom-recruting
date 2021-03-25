import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelationsListDialogComponent } from '@modules/search/search-result/search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { CreateRelationDialogComponent } from '@modules/search/search-result/search-result-list/user-card/create-relation-dialog/create-relation-dialog.component';
import { EditRelationsDialogComponent } from '@modules/search/search-result/search-result-list/user-card/edit-relations-dialog/edit-relations-dialog.component';
import { AuthService } from '@core/services/auth/auth.service';
import { take, tap } from 'rxjs/operators';
import { MessagesService } from '@shared/components/messages/messages.service';
import { IUserListItem } from '@monorepo/types/with-notification.interface';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { SearchService } from '@modules/search/search.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: IUserListItem;

  constructor(public readonly messages: MessagesService,
              public readonly auth: AuthService,
              public readonly profileGuard: ProfileGuard,
              public readonly search: SearchService,
              private readonly dialog: MatDialog) {}

  openRelationsListDialog(): void {
    this.dialog.open(RelationsListDialogComponent);
  }

  openCreateRelationDialog(): void {
    this.auth.user$.pipe(
      take(1),
      tap(fromUser => this.dialog.open(CreateRelationDialogComponent, {
        data: {fromUser, toUser: this.user}
      }))
    ).subscribe();
  }

  openEditRelationsDialog(): void {
    this.dialog.open(EditRelationsDialogComponent);
  }
}

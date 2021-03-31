import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelationsListDialogComponent } from '@modules/search/search-result/search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { CreateRelationDialogComponent } from '@modules/search/search-result/search-result-list/user-card/create-relation-dialog/create-relation-dialog.component';
import { EditRelationsDialogComponent } from '@modules/search/search-result/search-result-list/user-card/edit-relations-dialog/edit-relations-dialog.component';
import { AuthService } from '@core/services/auth/auth.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { MessagesService } from '@shared/components/messages/messages.service';
import { IUserListItem } from '@monorepo/types/with-notification.interface';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { SearchService } from '@modules/search/search.service';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { RelationsService } from '@modules/search/relations.service';
import { forkJoin, Observable, of } from 'rxjs';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';

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
              private readonly relations: RelationsService,
              private readonly dialog: MatDialog) {}

  openRelationsListDialog(): void {
    this.openRelationsDialog(this.search.selectedUser$, RelationsListDialogComponent);
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
    this.openRelationsDialog(this.auth.user$, RelationsListDialogComponent);
  }

  private openRelationsDialog(user$: Observable<IUserDto | null>,
                              DialogComponent: typeof EditRelationsDialogComponent |
                                               typeof RelationsListDialogComponent): void {
    user$.pipe(
      take(1),
      isNotNullOrUndefined(),
      switchMap(selectedUser => forkJoin([
        of(selectedUser),
        this.relations.getRelationsBetweenUsers(selectedUser.id, this.user.id)
      ]))
    ).subscribe(([selectedUser, relations]) => this.dialog.open(DialogComponent, {
      data: {
        fromUser: selectedUser,
        toUser: this.user,
        relations
      }
    }));
  }
}

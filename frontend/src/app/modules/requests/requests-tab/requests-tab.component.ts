import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelationRequestType } from '@modules/requests/relation-request-type.enum';
import { CdkScrollable } from '@angular/cdk/overlay';
import { RequestsService } from '@modules/requests/requests.service';
import { ErrorsService } from '@core/services/errors.service';
import { distinctUntilChanged, map, pluck, switchMap, take } from 'rxjs/operators';
import { RelationsFacade } from '@shared/components/relations/relations.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { Observable } from 'rxjs';
import { IUpdateRelationRequestDto } from '@monorepo/types/relations/update-relation-request.dto.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { MessagesService } from '@shared/components/messages/messages.service';
import { IGetRelationRequestsDto } from '@monorepo/types/relations/get-relation-requests.dto.interface';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';

@Component({
  selector: 'app-requests-tab',
  templateUrl: './requests-tab.component.html',
  styleUrls: ['./requests-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsTabComponent extends OnDestroyMixin {
  readonly RelationRequestTypeEnum = RelationRequestType;
  @ViewChild(CdkScrollable, { static: true }) relationRequestsContainer: CdkScrollable | null = null;
  selectedRelationsBlockIndex: number | null = null;

  constructor(public readonly route: ActivatedRoute,
              public readonly requests: RequestsService,
              public readonly facade: RelationsFacade,
              public readonly auth: AuthService,
              private readonly messages: MessagesService,
              private readonly router: Router,
              private readonly errors: ErrorsService,
              private readonly snackbar: MatSnackBar) {
    super();
    this.route.params.pipe(
      untilComponentDestroyed(this),
      map(params => params.requestType),
      distinctUntilChanged()
    ).subscribe(() => {
      this.selectedRelationsBlockIndex = null;
      this.facade.select(null);
    });
  }

  onRelationRequestSelect(relationsBlockIndex: number,
                          { toUser, fromUser }: IGetRelationRequestsDto,
                          relation: IRelationshipDto,
                          el: HTMLElement): void {
    this.facade.select(relation);
    if (this.selectedRelationsBlockIndex === relationsBlockIndex) {
      return;
    }

    if (this.relationRequestsContainer) {
      const styles = getComputedStyle(el);
      const openedHeight = parseInt(styles.getPropertyValue('--opened-height'), 10);
      const closedHeight = parseInt(styles.getPropertyValue('--closed-height'), 10);
      const openedClosedHeightDelta = openedHeight - closedHeight;
      const offsetTop = this.selectedRelationsBlockIndex !== null && relationsBlockIndex > this.selectedRelationsBlockIndex
        ? el.offsetTop - openedClosedHeightDelta
        : el.offsetTop;
      this.relationRequestsContainer.scrollTo({
        top: offsetTop + openedHeight / 2 - (el.parentElement?.offsetHeight || 0) / 2,
        behavior: 'smooth'
      });
    }

    this.auth.user$.pipe(
      take(1),
      isNotNullOrUndefined(),
      map(user => user.id !== toUser.id ? toUser : fromUser)
    ).subscribe(receiverUser => this.messages.openChatWithUser(receiverUser));

    this.selectedRelationsBlockIndex = relationsBlockIndex;
  }

  onRelationRequestChange(updateDto: IUpdateRelationRequestDto): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requests.update(requestId, updateDto)),
    ).subscribe({
      next: () => {
        this.snackbar.open('Request has been updated', 'Close', { panelClass: 'primary' });
        this.router.navigate(['.'], { relativeTo: this.route });
      },
      error: this.errors.handle
    });
  }

  onDeclineClick(): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requests.decline(requestId))
    ).subscribe(({
      next: () => {
        this.snackbar.open('Request has been declined', 'Close', { panelClass: 'primary' });
        this.selectedRelationsBlockIndex = null;
        this.router.navigate(['.'], { relativeTo: this.route });
      },
      error: this.errors.handle
    }));
  }

  onReopenClick(): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requests.reopen(requestId))
    ).subscribe({
      next: () => {
        this.snackbar.open('Request has been reopened', 'Close', { panelClass: 'primary' });
        this.router.navigate(['.'], { relativeTo: this.route });
      },
      error: this.errors.handle
    });
  }

  onCreateRelationClick(): void {
    this.selectedRequestId$.pipe(
      switchMap(requestId => this.requests.accept(requestId))
    ).subscribe({
      next: () => {
        this.snackbar.open('Relationship has been created', 'Close', { panelClass: 'primary' });
        this.router.navigate(['.'], { relativeTo: this.route });
      },
      error: this.errors.handle
    });
  }

  private get selectedRequestId$(): Observable<string> {
    return this.facade.selected$.pipe(
      take(1),
      isNotNullOrUndefined(),
      pluck('id')
    );
  }
}

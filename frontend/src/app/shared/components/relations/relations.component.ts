import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter, HostBinding,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { CdkScrollable } from '@angular/cdk/overlay';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StartDateRequiredIfHasEndDate } from '@shared/components/relations/start-date-required-if-has-end-date.validator';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';
import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { IRelationBase } from '@monorepo/types/relations/relation.base.interface';
import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { IRelationRequestUserDto } from '@monorepo/types/relations/relation-request-user.dto.interface';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RelationsComponent extends OnDestroyMixin {
  RelationType = RelationType;
  form = new FormGroup({
    type: new FormControl(null, Validators.required),
    startAt: new FormControl(null, Validators.required),
    endAt: new FormControl(null),
    description: new FormControl(''),
    comment: new FormControl('')
  }, StartDateRequiredIfHasEndDate);

  @Input() fromUser!: IRelationRequestUserDto;
  @Input() toUser!: IRelationRequestUserDto;
  @Input() @HostBinding('class.show-form') showForm = false;
  @Input() showComment = true;
  @Input() set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  _selectedRelationId?: string;
  @Input() set selectedRelationId(relationId: string | undefined) {
    this._selectedRelationId = relationId;
    this.updateFormWithSelectedRelation();

  }

  private _relations: IRelationshipDto[] = [];
  @Input() set relations(newRequests: IRelationshipDto[]) {
    this._relations = newRequests;
    this.updateFormWithSelectedRelation();
  }
  get relations(): IRelationshipDto[] {
    return this._relations;
  }

  @Output() readonly formSubmit = new Subject<ICreateRelationDto>();
  @Output() readonly relationSelect = new EventEmitter<IRelationshipDto>();

  @ViewChild('arrowsWrapper', {read: CdkScrollable, static: true}) arrowsWrapper: CdkScrollable | null = null;

  constructor(public readonly elRef: ElementRef) {
    super();
  }

  onRelationSelect(request: IRelationshipDto, arrowWrapperEl: HTMLElement): void {
    this.form.reset(request, {emitEvent: false});
    this.relationSelect.next(request);

    if (!this.arrowsWrapper) {
      console.error('Something went wrong: can not scroll to clicked relation');
    } else {
      this.arrowsWrapper.scrollTo({
        top: arrowWrapperEl.offsetTop + arrowWrapperEl.offsetHeight / 2 - (arrowWrapperEl.parentElement?.offsetHeight || 0) / 2,
        behavior: 'smooth'
      });
    }
  }

  onSubmit(): void {
    if (this.toUser) {
      this.formSubmit.next({
        ...(this.form.value as IRelationBase),
        fromUserId: this.fromUser.id,
        toUserId: this.toUser.id,
      });
    }
  }

  private updateFormWithSelectedRelation(): void {
    const selectedRequest = this._relations.find(rel => rel.id === this._selectedRelationId);
    if (selectedRequest) {
      this.form.reset(selectedRequest, {emitEvent: false});
    }
  }
}

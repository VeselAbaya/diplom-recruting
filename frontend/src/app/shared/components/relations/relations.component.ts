import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/overlay';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StartDateRequiredIfHasEndDate } from '@shared/components/relations/start-date-required-if-has-end-date.validator';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class RelationsComponent {
  RelationType = RelationType;
  @Input() showForm = false;
  @Input() showComment = true;
  @Input() set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  @ViewChild('arrowsWrapper', {read: CdkScrollable, static: true}) arrowsWrapper: CdkScrollable | null = null;

  form = new FormGroup({
    type: new FormControl(Validators.required),
    start: new FormControl(null),
    end: new FormControl(null),
    description: new FormControl(''),
    comment: new FormControl('')
  }, StartDateRequiredIfHasEndDate);

  selectedI = 5;

  constructor(public readonly elRef: ElementRef) {}

  onRelationSelect(arrowWrapperEl: HTMLElement): void {
    if (!this.arrowsWrapper) {
      console.error('Something went wrong: can not scroll to clicked relation');
    } else {
      this.arrowsWrapper.scrollTo({
        top: arrowWrapperEl.offsetTop + arrowWrapperEl.offsetHeight / 2 - (arrowWrapperEl.parentElement?.offsetHeight || 0) / 2,
        behavior: 'smooth'
      });
    }
  }
}

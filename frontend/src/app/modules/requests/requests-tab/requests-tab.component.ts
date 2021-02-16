import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelationRequestTypeEnum } from '@modules/requests/relation-request-type.enum';
import { CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'app-requests-tab',
  templateUrl: './requests-tab.component.html',
  styleUrls: ['./requests-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsTabComponent {
  readonly RelationRequestTypeEnum = RelationRequestTypeEnum;
  @ViewChild(CdkScrollable, {static: true}) relationRequestsContainer: CdkScrollable | null = null;
  selectedIndex: number | null = null;

  constructor(public readonly route: ActivatedRoute) {}

  onRelationRequestSelect(i: number, el: HTMLElement): void {
    if (this.selectedIndex === i) {
      return;
    }

    if (this.relationRequestsContainer) {
      const styles = getComputedStyle(el);
      const openedHeight = parseInt(styles.getPropertyValue('--opened-height'), 10);
      const closedHeight = parseInt(styles.getPropertyValue('--closed-height'), 10);
      const openedClosedHeightDelta = openedHeight - closedHeight;
      const offsetTop = this.selectedIndex !== null && i > this.selectedIndex ? el.offsetTop - openedClosedHeightDelta : el.offsetTop;
      this.relationRequestsContainer.scrollTo({
        top: offsetTop + openedHeight / 2 - (el.parentElement?.offsetHeight || 0) / 2,
        behavior: 'smooth'
      });
    }

    this.selectedIndex = i;
  }
}

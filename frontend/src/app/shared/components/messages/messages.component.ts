import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MessagesService } from '@shared/components/messages/messages.service';
import { AuthService } from '@core/services/auth/auth.service';
import { CdkScrollable } from '@angular/cdk/overlay';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { debounceTime, filter, map, pairwise, take } from 'rxjs/operators';
import { merge } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined/is-not-null-or-undefined';

let isChatOpenedFirstTime = true;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent extends OnDestroyMixin implements AfterViewInit {
  @ViewChildren('messageEl') messagesQuery!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild(CdkScrollable) messagesContainer: CdkScrollable | null = null;
  @ViewChild('messageTextarea') messageTextarea!: ElementRef<HTMLTextAreaElement>;
  text = '';
  private isUserScrolledToBottom = true;

  constructor(public readonly auth: AuthService,
              public readonly messages: MessagesService,
              private readonly focusMonitor: FocusMonitor) {
    super();
  }

  ngAfterViewInit(): void {
    this.initAutoScrollingToBottom();
    this.initTextFieldAutofocusOnChatOpening();
  }

  private initAutoScrollingToBottom(): void {
    this.messagesContainer?.elementScrolled().pipe(
      debounceTime(50),
      map(event => event.target as HTMLElement)
    ).subscribe(el => {
      const threshold = 40;
      const currentPosition = el.scrollTop + el.offsetHeight;
      this.isUserScrolledToBottom = el.scrollHeight - currentPosition <= threshold;
    });

    merge(
      this.messages.receiverUser$,
      this.messages.list$.pipe(filter(() => this.isUserScrolledToBottom))
    ).pipe(
      untilComponentDestroyed(this)
    ).subscribe(() => this.scrollBottom());
  }

  private initTextFieldAutofocusOnChatOpening(): void {
    this.messages.receiverUser$.pipe(
      isNotNullOrUndefined(),
      pairwise(),
      filter(([u1, u2]) => u1.id !== u2.id),
      untilComponentDestroyed(this),
    ).subscribe(() => this.focusMessageField());

    if (isChatOpenedFirstTime) {
      this.focusMessageField();
      isChatOpenedFirstTime = false;
    }
  }

  onSendMessage(): void {
    if (this.text.trim() === '') {
      return;
    }

    this.messages.send(this.text).subscribe(() => {
      this.text = '';
      this.scrollBottom();
    });
  }

  focusMessageField(): void {
    this.focusMonitor.focusVia(this.messageTextarea.nativeElement, null);
  }

  onTextareaKeyPress(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  private scrollBottom(): void {
    if (this.messagesContainer) {
      this.messagesQuery.changes.pipe(
        take(1)
      ).subscribe(() => this.messagesContainer?.scrollTo({ bottom: 0, behavior: 'smooth' }));
      setTimeout(() => this.messagesQuery.notifyOnChanges());
    }
  }
}

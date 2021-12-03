import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MessagesService } from '@shared/components/messages/messages.service';
import { AuthService } from '@core/services/auth/auth.service';
import { CdkScrollable } from '@angular/cdk/overlay';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent extends OnDestroyMixin implements AfterViewInit {
  @ViewChildren('message') messagesQuery!: QueryList<HTMLDivElement>;
  @ViewChild(CdkScrollable) messagesContainer: CdkScrollable | null = null;
  text = '';
  isLoading = false;
  private isUserScrolledToBottom = true;

  constructor(public readonly auth: AuthService,
              public readonly messages: MessagesService,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
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

  onSendMessage(): void {
    if (this.text.trim() === '') {
      return;
    }

    this.isLoading = true;
    this.messages.send(this.text).pipe(
      take(1)
    ).subscribe(() => {
      this.text = '';
      this.isLoading = false;
      this.cdr.markForCheck();
      this.scrollBottom();
    });
  }

  onTextareaKeyPress(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  private scrollBottom(): void {
    if (this.messagesContainer) {
      this.messagesQuery.changes.pipe(take(1)).subscribe(queryList => {
        this.messagesContainer?.scrollTo({bottom: 0, behavior: 'smooth'});
      });
      setTimeout(() => this.messagesQuery.notifyOnChanges());
    }
  }
}

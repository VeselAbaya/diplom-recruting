import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _pendingCount = 0;
  readonly active$: Observable<boolean>;

  private readonly active = new BehaviorSubject<boolean>(false);

  constructor() {
    this.active$ = this.active;
  }

  on(): void {
    this._pendingCount += 1;
    this.active.next(true);
  }

  off(): void {
    this._pendingCount = Math.max(this._pendingCount - 1, 0);
    if (this._pendingCount === 0) {
      this.active.next(false);
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// TODO It's needed to use stack inside that service, to hide loading only when All pending activities resolves
//      e.g. on() --> -100ms- -100ms- -100ms- -100ms- --> off()      (1)
//           on() --> -100ms- -100ms- --> off()                      (2)
//      in such situation after off() call on (2) row in LoadingService#active$ will be false
//      in spite of pending request that we started on (1) row
@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    readonly active$: Observable<boolean>;

    private readonly active = new BehaviorSubject<boolean>(false);

    constructor() {
        this.active$ = this.active;
    }

    on(): void {
        this.active.next(true);
    }

    off(): void {
        this.active.next(false);
    }
}

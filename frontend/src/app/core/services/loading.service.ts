import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

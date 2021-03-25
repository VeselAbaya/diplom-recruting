import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { IRelationRequestDto } from '@monorepo/types/relations/relation-request.dto.interface';

@Injectable({
  providedIn: 'root'
})
export class RelationsFacade {
  private readonly selectedRequest = new BehaviorSubject<IRelationRequestDto | null>(null);
  readonly selectedRequest$ = this.selectedRequest.pipe(distinctUntilChanged());

  select(request: IRelationRequestDto | null): void {
    this.selectedRequest.next(request);
  }
}

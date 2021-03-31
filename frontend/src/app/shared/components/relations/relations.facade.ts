import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';

@Injectable({
  providedIn: 'root'
})
export class RelationsFacade {
  private readonly selected = new BehaviorSubject<IRelationshipDto | null>(null);
  readonly selected$ = this.selected.pipe(distinctUntilChanged());

  select(request: IRelationshipDto | null): void {
    this.selected.next(request);
  }
}

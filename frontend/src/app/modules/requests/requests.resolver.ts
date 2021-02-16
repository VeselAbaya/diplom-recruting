import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { IRelationRequestDto } from '@monorepo/types/relations/relation-request.dto.interface';
import { Observable, of } from 'rxjs';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';

export class RequestsResolver implements Resolve<IRelationRequestDto[]> {
  resolve(route: ActivatedRouteSnapshot): Observable<IRelationRequestDto[]> {
    return of(new Array<IRelationRequestDto>(10).fill({
      id: 0,
      declined: false,
      type: RelationType.WorksWith,
      start: 19343423,
      end: null,
      comment: 'Comment',
      description: 'Description',
      toUser: {id: 0},
      fromUser: {id: 0}
    }));
  }
}

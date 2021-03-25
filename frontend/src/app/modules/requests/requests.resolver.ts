import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RelationRequestType } from '@modules/requests/relation-request-type.enum';
import { RequestsService } from '@modules/requests/requests.service';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { IGetRelationRequestsDto } from '@monorepo/types/relations/get-relation-requests.dto.interface';

@Injectable()
export class RequestsResolver implements Resolve<IGetRelationRequestsDto[]> {
  constructor(private readonly requests: RequestsService, private readonly auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGetRelationRequestsDto[]> {
    switch (route.params.requestType) {
      case RelationRequestType.ToMe:
        return this.auth.user$.pipe(
          take(1),
          switchMap(user => this.requests.get({
            toUserId: user?.id,
            declined: false
          }))
        );

      case RelationRequestType.FromMe:
        return this.auth.user$.pipe(
          take(1),
          switchMap(user => this.requests.get({
            fromUserId: user?.id,
            declined: false
          }))
        );

      case RelationRequestType.Declined:
        return this.requests.get({declined: true});

      default: return of([]);
    }
  }
}

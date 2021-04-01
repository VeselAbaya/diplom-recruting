import { Injectable } from '@angular/core';
import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Path } from '@monorepo/routes';
import { IRelationRequestDto } from '@monorepo/types/relations/relation-request.dto.interface';
import { IGetRelationRequestsParamsDto } from '@monorepo/types/relations/get-relation-requests-params.dto.interface';
import { prepareGetParams } from '@shared/utils/prepare-get-params.util';
import { IGetRelationRequestsDto } from '@monorepo/types/relations/get-relation-requests.dto.interface';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { IUpdateRelationRequestDto } from '@monorepo/types/relations/update-relation-request.dto.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private readonly list = new BehaviorSubject<IGetRelationRequestsDto[]>([]);
  readonly list$ = this.list.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient) {}

  createRelationRequest(relationDto: ICreateRelationDto): Observable<IRelationRequestDto> {
    return this.http.post<IRelationRequestDto>(Path.relationRequests(), relationDto);
  }

  get(params: IGetRelationRequestsParamsDto): Observable<IGetRelationRequestsDto[]> {
    return this.http.get<IGetRelationRequestsDto[]>(Path.relationRequests(), {params: prepareGetParams(params)}).pipe(
      tap(res => this.list.next(res))
    );
  }

  update(requestId: string, updateDto: IUpdateRelationRequestDto): Observable<IRelationRequestDto> {
    return this.http.patch<IRelationRequestDto>(Path.relationRequests.request(requestId), updateDto);
  }

  decline(requestId: string): Observable<IRelationRequestDto> {
    return this.http.patch<IRelationRequestDto>(Path.relationRequests.decline(requestId), {});
  }

  accept(requestId: string): Observable<IRelationRequestDto> {
    return this.http.delete<IRelationRequestDto>(Path.relationRequests.accept(requestId));
  }

  reopen(requestId: string): Observable<IRelationRequestDto> {
    return this.http.patch<IRelationRequestDto>(Path.relationRequests.reopen(requestId), {});
  }
}

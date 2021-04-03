import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { Path } from '@monorepo/routes';
import { IGraphDto } from '@monorepo/types/relations/graph.dto.interface';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { prepareGetParams } from '@shared/utils/prepare-get-params.util';
import { IGraphSearchParamsDto } from '@monorepo/types/relations/graph-search-params.dto.interface';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { IUpdateRelationshipDto } from '@monorepo/types/relationships/update-relationship.dto.interface';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {
  private readonly result = new BehaviorSubject<IGraphDto | null>(null);
  readonly result$ = this.result.pipe(distinctUntilChanged());

  private readonly userFirstLevelRelationTypes = new BehaviorSubject<RelationType[]>([]);
  readonly userFirstLevelRelationTypes$ = this.userFirstLevelRelationTypes.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient) {}

  getRelationsBetweenUsers(userId1: string, userId2: string): Observable<IRelationshipDto[]> {
    return this.http.get<IRelationshipDto[]>(Path.relationships.ofUsers(userId1, userId2));
  }

  getGraph(params: IGraphSearchParamsDto): Observable<IGraphDto> {
    return this.http.get<IGraphDto>(Path.relationships.graph(), {params: prepareGetParams(params)}).pipe(
      tap(graph => this.result.next(graph))
    );
  }

  getUserRelationTypes(userId: string): Observable<RelationType[]> {
    return this.http.get<RelationType[]>(Path.relationships.userRelationTypes(userId)).pipe(
      tap(relationTypes => this.userFirstLevelRelationTypes.next(relationTypes))
    );
  }

  updateRelation(id: string, patchDto: IUpdateRelationshipDto): Observable<IRelationshipDto> {
    return this.http.patch<IRelationshipDto>(Path.relationships.relationship(id), patchDto);
  }
}

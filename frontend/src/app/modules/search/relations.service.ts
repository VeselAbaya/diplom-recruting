import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { Path } from '@monorepo/routes';
import { IGraphDto } from '@monorepo/types/relations/graph.dto.interface';
import { distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import {
  getParamsWithoutNilsAndEmptyStringsOrArrays
} from '@shared/utils/get-params-without-nils-and-empty-strings-or-arrays/get-params-without-nils-and-empty-strings-or-arrays.util';
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

  private readonly isLoading = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient) {
  }

  getRelationsBetweenUsers(userId1: string, userId2: string): Observable<IRelationshipDto[]> {
    return this.http.get<IRelationshipDto[]>(Path.relationships.ofUsers(userId1, userId2));
  }

  getGraph(params: IGraphSearchParamsDto): Observable<IGraphDto> {
    this.isLoading.next(true);
    return this.http.get<IGraphDto>(Path.relationships.graph(), { params: getParamsWithoutNilsAndEmptyStringsOrArrays(params) }).pipe(
      tap(graph => this.result.next(graph)),
      finalize(() => this.isLoading.next(false))
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

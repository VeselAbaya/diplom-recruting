import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { Path } from '@monorepo/routes';
import { IGraphDto } from '@monorepo/types/relations/graph.dto.interface';
import { SearchService } from '@modules/search/search.service';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { prepareGetParams } from '@shared/utils/prepareGetParams.util';
import { IGraphSearchParamsDto } from '@monorepo/types/relations/graph-search-params.dto.interface';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {
  private readonly result = new BehaviorSubject<IGraphDto | null>(null);
  readonly result$ = this.result.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient, private readonly search: SearchService) {}

  getRelationsBetweenUsers(userId1: string, userId2: string): Observable<IRelationshipDto[]> {
    return this.http.get<IRelationshipDto[]>(Path.relationships.ofUsers(userId1, userId2));
  }

  getGraph(params: IGraphSearchParamsDto): Observable<IGraphDto> {
    return this.http.get<IGraphDto>(Path.relationships.graph(), {params: prepareGetParams(params)}).pipe(
      tap(graph => this.result.next(graph))
    );
  }
}

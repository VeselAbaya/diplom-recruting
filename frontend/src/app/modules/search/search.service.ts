import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnglishLevel, ISearchParamsDto } from '@monorepo/types/search/search-params.dto.interface';
import { distinctUntilChanged } from 'rxjs/operators';

export const DEFAULT_SEARCH_PARAMS: ISearchParamsDto = {
  search: '',
  rateRange: {min: 0, max: null},
  networkSize: 1,
  experience: 0,
  english: EnglishLevel.A1,
  workSchedule: null,
  workType: null
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly params = new BehaviorSubject<ISearchParamsDto>(DEFAULT_SEARCH_PARAMS);
  readonly params$ = this.params.pipe(distinctUntilChanged());

  setParams(newParams: ISearchParamsDto): void {
    this.params.next(newParams);
  }
}

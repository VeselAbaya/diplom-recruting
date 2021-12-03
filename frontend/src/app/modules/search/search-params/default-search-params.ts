import { EnglishLevel, ISearchParamsDto } from '@monorepo/types/search/search-params.dto.interface';
import { LIMITS } from '@monorepo/types/pagination/limits';

export const DEFAULT_SEARCH_PARAMS: Required<ISearchParamsDto> = {
  search: '',
  hourlyRateMin: 0,
  hourlyRateMax: null,
  networkSize: 1,
  relationTypes: [],
  experience: 0,
  english: EnglishLevel.A1,
  workSchedule: null,
  workType: null,
  page: 0,
  limit: LIMITS[0],
  fromUserId: ''
};

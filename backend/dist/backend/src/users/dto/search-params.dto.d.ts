import { EnglishLevel, ISearchParamsDto, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
export declare class SearchParamsDto implements ISearchParamsDto {
    page: number;
    limit: number;
    search?: string;
    hourlyRateMin?: number;
    hourlyRateMax?: number;
    networkSize?: 1 | 2 | 3 | 4 | 5;
    experience?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    english?: EnglishLevel;
    workSchedule?: WorkSchedule;
    workType?: WorkType;
}

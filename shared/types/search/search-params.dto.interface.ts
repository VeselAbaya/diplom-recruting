import { IPaginationParamsDto } from '../pagination/pagination-params.dto.interface';

export enum EnglishLevel { // must be a number enum to compare english levels
  A1,
  A2,
  B1,
  B2,
  C1,
  C2
}

export enum WorkSchedule {
  Full = 'full',
  Part = 'part'
}

export enum WorkType {
  Office = 'office',
  Remote = 'remote'
}

export interface ISearchParamsDto extends IPaginationParamsDto {
  search?: string;
  hourlyRateMin?: number;
  hourlyRateMax?: number | null;
  networkSize?: 1 | 2 | 3 | 4 | 5;
  experience?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  english?: EnglishLevel | null;
  workSchedule?: WorkSchedule | null;
  workType?: WorkType | null;
  fromUserId?: string;
}

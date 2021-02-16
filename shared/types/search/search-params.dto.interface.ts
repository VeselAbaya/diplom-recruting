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

export interface IRateRangeDto {
  min: number;
  max: number | null;
}

export interface ISearchParamsDto {
  search: string;
  rateRange: IRateRangeDto;
  networkSize: 1 | 2 | 3 | 4 | 5;
  experience: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  english: EnglishLevel;
  workSchedule: WorkSchedule | null;
  workType: WorkType | null;
}

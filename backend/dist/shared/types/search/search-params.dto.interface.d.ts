import { IPaginationParamsDto } from '../pagination/pagination-params.dto.interface';
export declare enum EnglishLevel {
    A1 = 0,
    A2 = 1,
    B1 = 2,
    B2 = 3,
    C1 = 4,
    C2 = 5
}
export declare enum WorkSchedule {
    Full = "full",
    Part = "part"
}
export declare enum WorkType {
    Office = "office",
    Remote = "remote"
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

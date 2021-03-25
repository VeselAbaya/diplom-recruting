import { IPatchUserDto } from '@monorepo/types/user/patch-user.dto.interface';
import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
export declare class PatchUserDto implements IPatchUserDto {
    email?: string;
    firstName?: string;
    lastName?: string | null;
    phone?: string | null;
    about?: string | null;
    workSchedule?: WorkSchedule | null;
    workType?: WorkType | null;
    experience?: number | null;
    english?: EnglishLevel | null;
    keywords?: string[];
    hourlyRate?: number | null;
}

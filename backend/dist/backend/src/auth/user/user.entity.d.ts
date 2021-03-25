import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import { IUserDto } from '../../../../../../shared/types/user/user.dto.interface';
import { ExcludeFunctions } from '@shared/utils';
export declare class UserEntity implements IUserDto {
    constructor(userProps: ExcludeFunctions<UserEntity>);
    id: string;
    createdAt: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    about: string | null;
    workSchedule: WorkSchedule | null;
    workType: WorkType | null;
    experience: number | null;
    english: EnglishLevel | null;
    keywords: string[];
    hourlyRate: number | null;
    password: string;
    salt: string;
    accessToken: string | null;
    refreshToken: string | null;
    static dummy(): Omit<ExcludeFunctions<UserEntity>, 'id' | 'createdAt'>;
    validatePassword(password: string): Promise<boolean>;
}

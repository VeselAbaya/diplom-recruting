import { EnglishLevel, WorkSchedule, WorkType } from '../search/search-params.dto.interface';

export interface IUserDto {
  avatarSrc: string;
  id: string;
  createdAt: number;
  email: string;
  firstName: string;
  lastName: string | null;
  phone: string | null;
  about: string | null;
  workSchedule: WorkSchedule | null;
  workType: WorkType | null;
  experience: number | null;
  english: EnglishLevel | null;
  keywords: string[];
  hourlyRate: number | null;
}

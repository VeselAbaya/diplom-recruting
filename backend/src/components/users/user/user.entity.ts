import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { ExcludeFunctions } from '@shared/utils';
import { DEFAULT_AVATAR_URL } from '@monorepo/constants';

export class UserEntity implements IUserDto {
  constructor(userProps: ExcludeFunctions<UserEntity>) {
    for (const [key, val] of Object.entries(userProps)) {
      // @ts-ignore
      this[key] = val;
    }
  }

  id!: string;
  createdAt!: number;
  email!: string;
  firstName!: string;
  lastName = '';
  phone = '';
  about = '';
  workSchedule: WorkSchedule | null = null;
  workType: WorkType | null = null;
  experience: number | null = null;
  english: EnglishLevel| null = null;
  keywords: string[] = [];
  hourlyRate: number | null = null;
  avatarSrc = DEFAULT_AVATAR_URL;

  @Exclude()
  _keywordsStr = '';

  @Exclude()
  password!: string;

  @Exclude()
  salt!: string;

  @Exclude()
  accessToken: string | null = null;

  @Exclude()
  refreshToken: string | null = null;

  static dummy(): Omit<ExcludeFunctions<UserEntity>, 'id' | 'createdAt'> {
    return {
      avatarSrc: DEFAULT_AVATAR_URL,
      about: '',
      english: null,
      experience: null,
      hourlyRate: null,
      lastName: '',
      phone: '',
      workSchedule: null,
      workType: null,
      email: '',
      firstName: '',
      keywords: [],
      _keywordsStr: '',
      password: '',
      salt: '',
      accessToken: null,
      refreshToken: null
    };
  }

  async validatePassword(password: string): Promise<boolean> {
    return await hash(password, this.salt) === this.password;
  }
}

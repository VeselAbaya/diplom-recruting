import { IPatchUserDto } from '@monorepo/types/user/patch-user.dto.interface';
import { EnglishLevel, WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import {
  IsAlpha, IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty, IsNumber, IsNumberString,
  IsOptional,
  IsString, Max, Min, NotContains
} from 'class-validator';

export class PatchUserDto implements IPatchUserDto {
  @IsOptional()
  @IsEmail({require_tld: false})
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  lastName?: string | null;

  @IsOptional()
  @IsNumberString()
  @NotContains('-')
  @NotContains('.')
  phone?: string | null;

  @IsOptional()
  @IsString()
  about?: string | null;

  @IsOptional()
  @IsEnum(WorkSchedule)
  workSchedule?: WorkSchedule | null;

  @IsOptional()
  @IsEnum(WorkType)
  workType?: WorkType | null;

  @IsOptional()
  @IsNumber()
  @Min(-1)
  @Max(10)
  experience?: number | null;

  @IsOptional()
  @IsEnum(EnglishLevel)
  english?: EnglishLevel | null;

  @IsOptional()
  @IsArray()
  keywords?: string[];

  @IsOptional()
  @Min(0)
  hourlyRate?: number | null;
}

import {
  EnglishLevel,
  ISearchParamsDto,
  WorkSchedule, WorkType
} from '@monorepo/types/search/search-params.dto.interface';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { LIMITS } from '@monorepo/types/pagination/limits';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';

export class SearchParamsDto implements ISearchParamsDto {
  @Transform(({value}) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @Min(0)
  page = 0;

  @Transform(({value}) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit = LIMITS[0];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  hourlyRateMin?: number;

  @Transform(({value}) => value === 'null' ? null : parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @Min(0)
  hourlyRateMax?: number;

  @IsOptional()
  @IsIn([1, 2, 3])
  networkSize?: 1 | 2 | 3;

  @Transform(({value}) => value ? value.split(',') : Object.values(RelationType))
  @IsOptional()
  @IsEnum(RelationType, {each: true})
  relationTypes: RelationType[] = Object.values(RelationType);

  @IsOptional()
  @IsIn([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  experience?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @IsOptional()
  @IsEnum(EnglishLevel)
  english?: EnglishLevel;

  @IsOptional()
  @IsEnum(WorkSchedule)
  workSchedule?: WorkSchedule;

  @IsOptional()
  @IsEnum(WorkType)
  workType?: WorkType;

  @IsOptional()
  @IsUUID()
  fromUserId?: string;
}

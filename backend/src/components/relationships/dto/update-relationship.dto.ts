import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IUpdateRelationshipDto } from '@monorepo/types/relationships/update-relationship.dto.interface';

export class UpdateRelationshipDto implements IUpdateRelationshipDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  endAt?: string;

  @IsOptional()
  @IsDateString()
  startAt?: string;

  @IsString()
  comment!: string;
}

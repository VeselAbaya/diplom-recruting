import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRequestDto implements ICreateRelationDto {
  @IsString()
  comment!: string;

  @IsString()
  description!: string;

  @IsDateString()
  @IsOptional()
  endAt!: string | null;

  @IsDateString()
  startAt!: string;

  @IsUUID()
  toUserId!: string;

  @IsUUID()
  fromUserId!: string;

  @IsEnum(RelationType)
  type!: RelationType;
}

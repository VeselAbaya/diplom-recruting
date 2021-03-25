import { IGetRelationRequestsParamsDto } from '@monorepo/types/relations/get-relation-requests-params.dto.interface';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetRequestsParamsDto implements IGetRelationRequestsParamsDto {
  @IsUUID()
  @IsOptional()
  toUserId!: string;

  @IsUUID()
  @IsOptional()
  fromUserId!: string;

  @Transform(({value}) => value === 'true')
  @IsBoolean()
  declined!: boolean;
}

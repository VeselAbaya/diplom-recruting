import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { IUpdateRelationRequestDto } from '@monorepo/types/relations/update-relation-request.dto.interface';

export class UpdateRequestDto extends PartialType(CreateRequestDto) implements IUpdateRelationRequestDto {}

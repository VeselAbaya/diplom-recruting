import { CreateRequestDto } from './create-request.dto';
import { IUpdateRelationRequestDto } from '@monorepo/types/relations/update-relation-request.dto.interface';
declare const UpdateRequestDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRequestDto>>;
export declare class UpdateRequestDto extends UpdateRequestDto_base implements IUpdateRelationRequestDto {
}
export {};

import { IRelationRequestDto } from './relation-request.dto.interface';
import { IRelationRequestUserDto } from './relation-request-user.dto.interface';

export interface IGetRelationRequestsDto {
  requests: IRelationRequestDto[];
  fromUser: IRelationRequestUserDto;
  toUser: IRelationRequestUserDto;
}

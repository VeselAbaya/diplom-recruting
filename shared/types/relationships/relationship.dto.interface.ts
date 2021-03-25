import { IRelationRequestDto } from '../relations/relation-request.dto.interface';

export interface IRelationshipDto extends Omit<IRelationRequestDto, 'comment' | 'declined' | 'declinedBy'> {}

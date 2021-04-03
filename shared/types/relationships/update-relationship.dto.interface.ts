import { IRelationshipDto } from './relationship.dto.interface';

export interface IUpdateRelationshipDto extends Partial<Pick<IRelationshipDto, 'description' | 'endAt' | 'startAt'>> {
  comment: string;
}

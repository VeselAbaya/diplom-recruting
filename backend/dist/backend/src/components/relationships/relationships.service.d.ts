import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
export declare class RelationshipsService {
    create(createRelationshipDto: CreateRelationshipDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRelationshipDto: UpdateRelationshipDto): string;
    remove(id: number): string;
}

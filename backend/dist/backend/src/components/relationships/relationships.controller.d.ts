import { RelationshipsService } from './relationships.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
export declare class RelationshipsController {
    private readonly relationshipsService;
    constructor(relationshipsService: RelationshipsService);
    create(createRelationshipDto: CreateRelationshipDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRelationshipDto: UpdateRelationshipDto): string;
    remove(id: string): string;
}

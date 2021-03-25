import { UserRepository } from '@components/users/user/user.repository';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { MessageEntity } from '@components/messages/message/message.entity';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';
export declare class MessageRepository {
    private readonly users;
    private readonly db;
    constructor(users: UserRepository, db: Neo4j);
    getMessages(fromUserId: string, toUserId: string): Promise<MessageEntity[]>;
    save(message: CreateMessageDto): Promise<MessageEntity>;
}

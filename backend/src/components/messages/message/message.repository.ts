import { UserRepository } from '@components/users/user/user.repository';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageEntity } from '@components/messages/message/message.entity';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';

@Injectable()
export class MessageRepository {
  constructor(private readonly users: UserRepository, private readonly db: Neo4j) {}

  async getMessages(fromUserId: string, toUserId: string): Promise<MessageEntity[]> {
    await this.users.getUserOrThrowError(toUserId);
    const res = await this.db.write(`
      CALL {
        MATCH (m:Message {fromUserId: $fromUserId, toUserId: $toUserId})
        RETURN m
        UNION ALL
        MATCH (m:Message {fromUserId: $toUserId, toUserId: $fromUserId})
        SET m.read = true
        RETURN m
      }
      RETURN m
      ORDER BY m.createdAt
    `, {fromUserId, toUserId});
    return res.records.map(record => new MessageEntity(record.get('m').properties));
  }

  async save(message: CreateMessageDto): Promise<MessageEntity> {
    const messageCypher = `(m:Message {fromUserId: $fromUserId, toUserId: $toUserId, text: $text, read: false})`;
    const res = await this.db.write(`
      MATCH (from:User {id: $fromUserId}), (to:User {id: $toUserId})
      CREATE (from)-[:SENT]->${messageCypher}-[:RECEIVED_BY]->(to)
      SET m.id = randomUUID(), m.createdAt = timestamp()
      RETURN m
    `, message);

    const savedMessage = Neo4j.hydrateOne(res, 'm', MessageEntity);
    if (!savedMessage) {
      throw new InternalServerErrorException();
    }

    return savedMessage;
  }

  async markAsRead(messageId: string): Promise<MessageEntity> {
    const res = await this.db.write(`
      MATCH (m:Message {id: $id})
      SET m.read = true
      RETURN m
    `, {id: messageId});

    const message = Neo4j.hydrateOne(res, 'm', MessageEntity);
    if (!message) {
      throw new InternalServerErrorException();
    }

    return message;
  }
}

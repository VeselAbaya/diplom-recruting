import { Injectable } from '@nestjs/common';
import { MessageRepository } from '@components/messages/message/message.repository';
import { MessageEntity } from '@components/messages/message/message.entity';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messages: MessageRepository) {
  }

  getMessages(fromUserId: string, toUserId: string): Promise<MessageEntity[]> {
    return this.messages.getMessages(fromUserId, toUserId);
  }

  save(message: CreateMessageDto): Promise<MessageEntity> {
    return this.messages.save(message);
  }
}

import { Injectable } from '@nestjs/common';
import { MessageRepository } from '@components/messages/message/message.repository';
import { MessageEntity } from '@components/messages/message/message.entity';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';
import { Subject } from 'rxjs';

@Injectable()
export class MessagesService {
  readonly messageSaved = new Subject<MessageEntity>();

  constructor(private readonly messages: MessageRepository) {
  }

  getMessages(fromUserId: string, toUserId: string): Promise<MessageEntity[]> {
    return this.messages.getMessages(fromUserId, toUserId);
  }

  async save(message: CreateMessageDto): Promise<MessageEntity> {
    const newMessage = await this.messages.save(message);
    this.messageSaved.next(newMessage);
    return newMessage;
  }
}

import { MessageRepository } from '@components/messages/message/message.repository';
import { MessageEntity } from '@components/messages/message/message.entity';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';
export declare class MessagesService {
    private readonly messages;
    constructor(messages: MessageRepository);
    getMessages(fromUserId: string, toUserId: string): Promise<MessageEntity[]>;
    save(message: CreateMessageDto): Promise<MessageEntity>;
}

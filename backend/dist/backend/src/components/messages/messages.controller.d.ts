import { MessagesService } from './messages.service';
import { UserEntity } from '@components/users/user/user.entity';
import { MessageEntity } from '@components/messages/message/message.entity';
export declare class MessagesController {
    private readonly messages;
    constructor(messages: MessagesService);
    getMessages(user: UserEntity, toUserId: string): Promise<MessageEntity[]>;
}

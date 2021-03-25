import { IGetMessagesDto } from '@monorepo/types/message/get-messages.dto.interface';
import { UserEntity } from '@components/users/user/user.entity';
import { MessageEntity } from '@components/messages/message/message.entity';
export declare class GetMessagesDto implements IGetMessagesDto {
    constructor(fromUser: UserEntity, toUser: UserEntity, messages: MessageEntity[]);
    fromUser: UserEntity;
    toUser: UserEntity;
    messages: MessageEntity[];
    private static transformUserToPlain;
}

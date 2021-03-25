import { IMessageDto } from '@monorepo/types/message/message.dto.interface';
import { ExcludeFunctions } from '@shared/utils';
export declare class MessageEntity implements IMessageDto {
    constructor(requestProps: ExcludeFunctions<MessageEntity>);
    fromUserId: string;
    toUserId: string;
    text: string;
    createdAt: number;
    id: string;
}

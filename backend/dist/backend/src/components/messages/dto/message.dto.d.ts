import { IMessageDto } from '@monorepo/types/message/message.dto.interface';
export declare class MessageDto implements IMessageDto {
    fromUserId: string;
    toUserId: string;
    text: string;
}

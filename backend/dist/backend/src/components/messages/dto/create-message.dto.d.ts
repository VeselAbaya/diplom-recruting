import { ICreateMessageDto } from '@monorepo/types/message/create-message.dto.interface';
export declare class CreateMessageDto implements ICreateMessageDto {
    constructor(fromUserId: string, toUserId: string, text: string);
    fromUserId: string;
    toUserId: string;
    text: string;
}

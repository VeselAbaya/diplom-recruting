import { IUserDto } from '../user/user.dto.interface';
import { IMessageDto } from './message.dto.interface';
export declare type IGetMessagesUserDto = Pick<IUserDto, 'id'>;
export interface IGetMessagesDto {
    fromUser: IGetMessagesUserDto;
    toUser: IGetMessagesUserDto;
    messages: IMessageDto[];
}

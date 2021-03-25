import { ICreateMessageDto } from './create-message.dto.interface';

export interface IMessageDto extends ICreateMessageDto {
  id: string;
  createdAt: number;
}

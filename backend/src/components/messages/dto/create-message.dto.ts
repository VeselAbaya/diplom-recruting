import { IsString, IsUUID } from 'class-validator';
import { ICreateMessageDto } from '@monorepo/types/message/create-message.dto.interface';

export class CreateMessageDto implements ICreateMessageDto {
  constructor(fromUserId: string, toUserId: string, text: string) {
    this.fromUserId = fromUserId;
    this.toUserId = toUserId;
    this.text = text;
  }

  @IsUUID()
  fromUserId!: string;

  @IsUUID()
  toUserId!: string;

  @IsString()
  text!: string;
}

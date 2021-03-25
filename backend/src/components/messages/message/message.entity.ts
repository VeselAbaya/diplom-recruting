import { IMessageDto } from '@monorepo/types/message/message.dto.interface';
import { ExcludeFunctions } from '@shared/utils';

export class MessageEntity implements IMessageDto {
  constructor(requestProps: ExcludeFunctions<MessageEntity>) {
    for (const [key, val] of Object.entries(requestProps)) {
      // @ts-ignore
      this[key] = val;
    }
  }

  fromUserId!: string;
  toUserId!: string;
  text!: string;
  createdAt!: number;
  id!: string;
}

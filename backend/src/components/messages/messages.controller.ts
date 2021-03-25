import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SubPath } from '@monorepo/routes';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@components/users/user/user.decorator';
import { UserEntity } from '@components/users/user/user.entity';
import { MessageEntity } from '@components/messages/message/message.entity';

@Controller(SubPath.messages())
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  @Get()
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  getMessages(@User() user: UserEntity,
              @Param('toUser', ParseUUIDPipe) toUserId: string): Promise<MessageEntity[]> {
    return this.messages.getMessages(user.id, toUserId);
  }
}

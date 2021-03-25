import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageRepository } from '@components/messages/message/message.repository';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@components/users/users.module';
import { MessagesGateway } from '@components/messages/messages.gateway';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository, MessagesGateway],
  imports: [UsersModule, PassportModule.register({defaultStrategy: 'jwt'})],
  exports: [MessagesService]
})
export class MessagesModule {}

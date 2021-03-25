import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { UsersModule } from '../users/users.module';
import { RequestRepository } from '@components/requests/request/request.repository';
import { PassportModule } from '@nestjs/passport';
import { MessagesModule } from '@components/messages/messages.module';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService, RequestRepository],
  imports: [UsersModule, PassportModule.register({defaultStrategy: 'jwt'}), MessagesModule]
})
export class RequestsModule {}

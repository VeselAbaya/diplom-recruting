import { Module } from '@nestjs/common';
import { UserRepository } from './user/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({defaultStrategy: 'jwt'})],
  providers: [UserRepository, UsersService],
  exports: [UserRepository],
  controllers: [UsersController]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { UsersModule } from '@components/users/users.module';
import { RelationshipRepository } from '@components/relationships/relationship/relationship.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [RelationshipsController],
  providers: [RelationshipsService, RelationshipRepository],
  imports: [UsersModule, PassportModule.register({defaultStrategy: 'jwt'})]
})
export class RelationshipsModule {}

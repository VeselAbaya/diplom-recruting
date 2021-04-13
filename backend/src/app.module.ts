import { Module } from '@nestjs/common';
import { Config } from '@config';
import { Neo4jModule } from '@db/neo4j/neo4j.module';
import { AuthModule } from '@components/auth/auth.module';
import { UsersModule } from '@components/users/users.module';
import { RequestsModule } from '@components/requests/requests.module';
import { RelationshipsModule } from '@components/relationships/relationships.module';
import { MessagesModule } from '@components/messages/messages.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    Neo4jModule.forRoot(Config.DB),
    AuthModule,
    UsersModule,
    RequestsModule,
    RelationshipsModule,
    MessagesModule
  ],
  controllers: [AppController]
})
export class AppModule {}

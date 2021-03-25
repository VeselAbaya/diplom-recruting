import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { RequestEntity } from './request.entity';
import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { UserRepository } from '@components/users/user/user.repository';
import { UserEntity } from '@components/users/user/user.entity';
import { ExcludeFunctions } from '@shared/utils';
import { GetRequestsParamsDto } from '@components/requests/dto/get-requests-params.dto';
import { IRelationRequestDto } from '@monorepo/types/relations/relation-request.dto.interface';
import { GetRequestsDto } from '@components/requests/dto/get-requests.dto';
import { UpdateRequestDto } from '@components/requests/dto/update-request.dto';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';

@Injectable()
export class RequestRepository {
  constructor(private readonly db: Neo4j, private readonly users: UserRepository) {}

  async save(fromUser: UserEntity, createRelationDto: ICreateRelationDto): Promise<RequestEntity> {
    await this.users.getUserOrThrowError(createRelationDto.toUserId);

    const requestProps: Partial<ICreateRelationDto> = {
      ...RequestEntity.dummy(),
      ...createRelationDto
    };

    // TODO validation in case if we trying to create another one bidirectional Relationship between same users but
    //      with vice versa fromUserId and toUserId
    const res = await this.db.write(
      `MATCH (from:User {id: $fromUserId}), (to:User {id: $toUserId})
           CREATE (from)-[:SENT]->(r:Request)-[:RECEIVED_TO]->(to)
           SET r += $properties, r.id = randomUUID(), r.createdAt = timestamp()
           RETURN r`,
      {
        properties: requestProps,
        fromUserId: fromUser.id,
        toUserId: createRelationDto.toUserId
      }
    );

    const request = Neo4j.hydrateOne<ExcludeFunctions<RequestEntity>>(res, 'r');
    if (!request) {
      throw new InternalServerErrorException();
    }

    return new RequestEntity(request);
  }

  async get(params: GetRequestsParamsDto): Promise<GetRequestsDto[]> {
    const fromUser = params.fromUserId ? await this.users.getUserOrThrowError(params.fromUserId) : null;
    const toUser = params.toUserId ? await this.users.getUserOrThrowError(params.toUserId) : null;

    const fromUserCypher = `(from:User ${params.fromUserId ? '{id: $fromUserId}' : ''})`;
    const toUserCypher = `(to:User ${params.toUserId ? '{id: $toUserId}' : ''})`;
    const res = await this.db.write(
      `MATCH ${fromUserCypher}-[:SENT]->(r:Request {declined: $declined})-[:RECEIVED_TO]->${toUserCypher}
           RETURN from, to, collect(r) as requests`,
      params
    );

    return res.records.map(record => new GetRequestsDto({
      fromUser: fromUser || new UserEntity(record.get('from').properties),
      toUser: toUser || new UserEntity(record.get('to').properties),
      requests: record.get('requests').map(
        (requestRecord: {properties: IRelationRequestDto}) => new RequestEntity(requestRecord.properties)
      )
    }));
  }

  async update(requestId: string, updateRequestDto: UpdateRequestDto): Promise<RequestEntity> {
    const res = await this.db.write(`MATCH (r:Request {id: $id}) SET r += $properties RETURN r`, {
      id: requestId,
      properties: updateRequestDto
    });

    const savedRequest = Neo4j.hydrateOne<ExcludeFunctions<RequestEntity>>(res, 'r');
    if (!savedRequest) {
      throw new InternalServerErrorException();
    }

    return savedRequest;
  }

  async userIsSenderOfRequest(user: UserEntity, requestId: string): Promise<boolean> {
    const res = await this.db.write(
      `MATCH (:User {id: $userId})-[sent:SENT]->(:Request {id: $requestId})
           RETURN sent`,
      {userId: user.id, requestId}
    );
    return !!res.records.length;
  }

  async userIsReceiverOfRequest(user: UserEntity, requestId: string): Promise<boolean> {
    const res = await this.db.write(
      `MATCH (:Request {id: $requestId})-[received:RECEIVED_TO]->(:User {id: $userId})
           RETURN received`,
      {userId: user.id, requestId}
    );
    return !!res.records.length;
  }

  async userIsDeclinerOfRequest(user: UserEntity, requestId: string): Promise<boolean> {
    const res = await this.db.write(
      `MATCH (r:Request {id: $requestId, declinedBy: $userId})
           RETURN r`,
      {userId: user.id, requestId}
    );
    return !!res.records.length;
  }

  async decline(requestId: string, declinerId: string): Promise<RequestEntity> {
    const res = await this.db.write(
      `MATCH (r:Request {id: $id})
            SET r.declined = true, r.declinedBy = $declinerId
            RETURN r`,
      {id: requestId, declinerId}
    );

    const request = Neo4j.hydrateOne<ExcludeFunctions<RequestEntity>>(res, 'r');
    if (!request) {
      throw new InternalServerErrorException();
    }

    return request;
  }

  async reopen(requestId: string): Promise<RequestEntity> {
    const res = await this.db.write(
      `MATCH (r:Request {id: $id})
            SET r.declined = false, r.declinedBy = NULL
            RETURN r`,
      {id: requestId}
    );

    const request = Neo4j.hydrateOne<ExcludeFunctions<RequestEntity>>(res, 'r');
    if (!request) {
      throw new InternalServerErrorException();
    }

    return request;
  }

  async accept(requestId: string): Promise<RelationshipEntity> {
    const relationshipCypher = `[relationship:RELATIONSHIP {
      id: randomUUID(),
      createdAt: timestamp(),
      type: request.type,
      description: request.description,
      fromUserId: request.fromUserId,
      toUserId: request.toUserId,
      startAt: request.startAt,
      endAt: request.endAt
    }]`;

    // const createCypher = `CALL apoc.create.relationship(a, request.type, {type: request.type}, b)`;
    const res = await this.db.write(
      `MATCH (request:Request {id: $id}), (from:User {id: request.fromUserId}), (to:User {id: request.toUserId})
            CREATE (from)-${relationshipCypher}->(to)
            DETACH DELETE request
            RETURN relationship`,
      {id: requestId}
    );

    const relationship = Neo4j.hydrateOne<ExcludeFunctions<RelationshipEntity>>(res, 'relationship');
    if (!relationship) {
      throw new InternalServerErrorException();
    }

    return relationship;
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRepository = void 0;
const common_1 = require("@nestjs/common");
const neo4j_service_1 = require("../../../db/neo4j/neo4j.service");
const request_entity_1 = require("./request.entity");
const create_relation_dto_interface_1 = require("../../../../../shared/types/relations/create-relation.dto.interface");
const user_repository_1 = require("../../users/user/user.repository");
const user_entity_1 = require("../../users/user/user.entity");
const utils_1 = require("../../../shared/utils");
const get_requests_params_dto_1 = require("../dto/get-requests-params.dto");
const relation_request_dto_interface_1 = require("../../../../../shared/types/relations/relation-request.dto.interface");
const get_requests_dto_1 = require("../dto/get-requests.dto");
const update_request_dto_1 = require("../dto/update-request.dto");
const relationship_entity_1 = require("../../relationships/relationship/relationship.entity");
let RequestRepository = class RequestRepository {
    constructor(db, users) {
        this.db = db;
        this.users = users;
    }
    async save(fromUser, createRelationDto) {
        await this.users.getUserOrThrowError(createRelationDto.toUserId);
        const requestProps = Object.assign(Object.assign({}, request_entity_1.RequestEntity.dummy()), createRelationDto);
        const res = await this.db.write(`MATCH (from:User {id: $fromUserId}), (to:User {id: $toUserId})
           CREATE (from)-[:SENT]->(r:Request)-[:RECEIVED_TO]->(to)
           SET r += $properties, r.id = randomUUID(), r.createdAt = timestamp()
           RETURN r`, {
            properties: requestProps,
            fromUserId: fromUser.id,
            toUserId: createRelationDto.toUserId
        });
        const request = neo4j_service_1.Neo4j.hydrateOne(res, 'r');
        if (!request) {
            throw new common_1.InternalServerErrorException();
        }
        return new request_entity_1.RequestEntity(request);
    }
    async get(params) {
        const fromUser = params.fromUserId ? await this.users.getUserOrThrowError(params.fromUserId) : null;
        const toUser = params.toUserId ? await this.users.getUserOrThrowError(params.toUserId) : null;
        const fromUserCypher = `(from:User ${params.fromUserId ? '{id: $fromUserId}' : ''})`;
        const toUserCypher = `(to:User ${params.toUserId ? '{id: $toUserId}' : ''})`;
        const res = await this.db.write(`MATCH ${fromUserCypher}-[:SENT]->(r:Request {declined: $declined})-[:RECEIVED_TO]->${toUserCypher}
           RETURN from, to, collect(r) as requests`, params);
        return res.records.map(record => new get_requests_dto_1.GetRequestsDto({
            fromUser: fromUser || new user_entity_1.UserEntity(record.get('from').properties),
            toUser: toUser || new user_entity_1.UserEntity(record.get('to').properties),
            requests: record.get('requests').map((requestRecord) => new request_entity_1.RequestEntity(requestRecord.properties))
        }));
    }
    async update(requestId, updateRequestDto) {
        const res = await this.db.write(`MATCH (r:Request {id: $id}) SET r += $properties RETURN r`, {
            id: requestId,
            properties: updateRequestDto
        });
        const savedRequest = neo4j_service_1.Neo4j.hydrateOne(res, 'r');
        if (!savedRequest) {
            throw new common_1.InternalServerErrorException();
        }
        return savedRequest;
    }
    async userIsSenderOfRequest(user, requestId) {
        const res = await this.db.write(`MATCH (:User {id: $userId})-[sent:SENT]->(:Request {id: $requestId})
           RETURN sent`, { userId: user.id, requestId });
        return !!res.records.length;
    }
    async userIsReceiverOfRequest(user, requestId) {
        const res = await this.db.write(`MATCH (:Request {id: $requestId})-[received:RECEIVED_TO]->(:User {id: $userId})
           RETURN received`, { userId: user.id, requestId });
        return !!res.records.length;
    }
    async userIsDeclinerOfRequest(user, requestId) {
        const res = await this.db.write(`MATCH (r:Request {id: $requestId, declinedBy: $userId})
           RETURN r`, { userId: user.id, requestId });
        return !!res.records.length;
    }
    async decline(requestId, declinerId) {
        const res = await this.db.write(`MATCH (r:Request {id: $id})
            SET r.declined = true, r.declinedBy = $declinerId
            RETURN r`, { id: requestId, declinerId });
        const request = neo4j_service_1.Neo4j.hydrateOne(res, 'r');
        if (!request) {
            throw new common_1.InternalServerErrorException();
        }
        return request;
    }
    async reopen(requestId) {
        const res = await this.db.write(`MATCH (r:Request {id: $id})
            SET r.declined = false, r.declinedBy = NULL
            RETURN r`, { id: requestId });
        const request = neo4j_service_1.Neo4j.hydrateOne(res, 'r');
        if (!request) {
            throw new common_1.InternalServerErrorException();
        }
        return request;
    }
    async accept(requestId) {
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
        const res = await this.db.write(`MATCH (request:Request {id: $id}), (from:User {id: request.fromUserId}), (to:User {id: request.toUserId})
            CREATE (from)-${relationshipCypher}->(to)
            DETACH DELETE request
            RETURN relationship`, { id: requestId });
        const relationship = neo4j_service_1.Neo4j.hydrateOne(res, 'relationship');
        if (!relationship) {
            throw new common_1.InternalServerErrorException();
        }
        return relationship;
    }
};
RequestRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [neo4j_service_1.Neo4j, user_repository_1.UserRepository])
], RequestRepository);
exports.RequestRepository = RequestRepository;
//# sourceMappingURL=request.repository.js.map
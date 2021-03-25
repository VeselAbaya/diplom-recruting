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
exports.MessageRepository = void 0;
const user_repository_1 = require("../../users/user/user.repository");
const neo4j_service_1 = require("../../../db/neo4j/neo4j.service");
const common_1 = require("@nestjs/common");
const message_entity_1 = require("./message.entity");
const create_message_dto_1 = require("../dto/create-message.dto");
let MessageRepository = class MessageRepository {
    constructor(users, db) {
        this.users = users;
        this.db = db;
    }
    async getMessages(fromUserId, toUserId) {
        await this.users.getUserOrThrowError(toUserId);
        const res = await this.db.write(`
      CALL {
        MATCH (m:Message {fromUserId: $fromUserId, toUserId: $toUserId})
        RETURN m
        UNION ALL
        MATCH (m:Message {fromUserId: $toUserId, toUserId: $fromUserId})
        SET m.read = true
        RETURN m
      }
      RETURN m
      ORDER BY m.createdAt
    `, { fromUserId, toUserId });
        return res.records.map(record => new message_entity_1.MessageEntity(record.get('m').properties));
    }
    async save(message) {
        const messageCypher = `(m:Message {fromUserId: $fromUserId, toUserId: $toUserId, text: $text, read: false})`;
        const res = await this.db.write(`
      MATCH (from:User {id: $fromUserId}), (to:User {id: $toUserId})
      CREATE (from)-[:SENT]->${messageCypher}-[:RECEIVED_BY]->(to)
      SET m.id = randomUUID(), m.createdAt = timestamp()
      RETURN m
    `, message);
        const savedMessage = neo4j_service_1.Neo4j.hydrateOne(res, 'm', message_entity_1.MessageEntity);
        if (!savedMessage) {
            throw new common_1.InternalServerErrorException();
        }
        return savedMessage;
    }
};
MessageRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository, neo4j_service_1.Neo4j])
], MessageRepository);
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=message.repository.js.map
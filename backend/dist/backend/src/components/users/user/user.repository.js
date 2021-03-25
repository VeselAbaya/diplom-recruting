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
exports.UserRepository = void 0;
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const neo4j_service_1 = require("../../../db/neo4j/neo4j.service");
const signup_dto_interface_1 = require("../../../../../shared/types/auth/signup.dto.interface");
const search_params_dto_interface_1 = require("../../../../../shared/types/search/search-params.dto.interface");
const neo4j_driver_1 = require("neo4j-driver");
const pagination_interface_1 = require("../../../../../shared/types/pagination/pagination.interface");
const with_notification_interface_1 = require("../../../../../shared/types/with-notification.interface");
const user_list_item_dto_1 = require("../dto/user-list-item.dto");
const pagination_dto_1 = require("../../../shared/pagination.dto");
let UserRepository = class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async create(signUpDto) {
        var _a;
        const salt = await bcrypt_1.genSalt();
        const res = await this.db.write(`CREATE (u:User)
             SET u += $properties, u.id = randomUUID(), u.createdAt = timestamp()
             RETURN u`, {
            properties: Object.assign(Object.assign(Object.assign({}, user_entity_1.UserEntity.dummy()), signUpDto), { salt, password: await bcrypt_1.hash(signUpDto.password, salt) }),
        });
        return new user_entity_1.UserEntity((_a = res.records[0]) === null || _a === void 0 ? void 0 : _a.get('u').properties);
    }
    async save(user) {
        const res = await this.db.write(`MATCH (u:User {id: $id}) SET u += $properties RETURN u`, {
            id: user.id,
            properties: JSON.parse(JSON.stringify(user))
        });
        const savedUser = neo4j_service_1.Neo4j.hydrateOne(res, 'u', user_entity_1.UserEntity);
        if (!savedUser) {
            throw new common_1.InternalServerErrorException();
        }
        return savedUser;
    }
    async findBy(key, value) {
        const res = await this.db.read(`MATCH (u:User {${key}: $${key}}) RETURN u`, { [key]: value });
        return neo4j_service_1.Neo4j.hydrateOne(res, 'u', user_entity_1.UserEntity);
    }
    async find(searcherUserId, params) {
        var _a;
        const res = await this.db.read(`
      CALL db.index.fulltext.queryNodes("usersSearch", $search) YIELD node as u, score
      WHERE (CASE WHEN $fromUserId IS NOT NULL
                    THEN EXISTS((u)-[:RELATIONSHIP]-(:User {id: $fromUserId}))
                  ELSE true END)
        AND ($workSchedule IS NULL OR u.workSchedule = $workSchedule)
        AND ($workType IS NULL OR u.workType = $workType)
        AND (CASE WHEN u.english IS NOT NULL THEN u.english >= $english
                  ELSE $english = ${search_params_dto_interface_1.EnglishLevel.A1} END)
        AND (CASE WHEN u.hourlyRate IS NOT NULL
                    THEN $hourlyRateMin <= u.hourlyRate ${params.hourlyRateMax ? '<= $hourlyRateMax' : ''}
                  ELSE true END)
        AND ($experience = 0
             OR ($experience <> -1 AND u.experience >= $experience)
             OR ($experience = -1 AND u.experience <= 0))
        AND (CASE WHEN $fromUserId IS NOT NULL
                    THEN u.id <> $fromUserId
                  ELSE true END)
      WITH u ORDER BY score
      WITH collect(u) as users
      WITH users, size(users) as total
      UNWIND users as u
      CALL {
        WITH u
        MATCH (:User {id: $searcherUserId})<-[:RECEIVED_BY]-(m:Message {read: false, fromUserId: u.id})
        WITH collect(m) as messages
        WITH size(messages) as messagesCount
        RETURN messagesCount
      }
      CALL {
        WITH u
        MATCH (:User {id: $searcherUserId})-[relation:RELATIONSHIP]-(u)
        WITH collect(relation) as relations
        WITH size(relations) as relationsCount
        RETURN relationsCount
      }
      RETURN u, total, messagesCount, relationsCount
      SKIP $page
      LIMIT $limit`, Object.assign(Object.assign({}, params), { english: params.english || search_params_dto_interface_1.EnglishLevel.A1, hourlyRateMin: params.hourlyRateMin || 0, search: `*${params.search || ''}*~`, workSchedule: params.workSchedule || null, workType: params.workType || null, page: neo4j_driver_1.int(params.page * params.limit), limit: neo4j_driver_1.int(params.limit), fromUserId: params.fromUserId || null, searcherUserId }));
        return new pagination_dto_1.PaginationDto(res.records.map(record => new user_list_item_dto_1.UserListItemDto(record.get('u').properties, record.get('messagesCount') || 0, record.get('relationsCount') || 0)), params.limit, params.page, ((_a = res.records[0]) === null || _a === void 0 ? void 0 : _a.get('total')) || 0);
    }
    async validateUserPassword({ email, password }) {
        const user = await this.findBy('email', email);
        return user && await user.validatePassword(password) ? user : null;
    }
    async getUserOrThrowError(userId) {
        const user = await this.findBy('id', userId);
        if (!user) {
            throw new common_1.InternalServerErrorException();
        }
        return user;
    }
};
UserRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [neo4j_service_1.Neo4j])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map
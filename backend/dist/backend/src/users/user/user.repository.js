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
const neo4j_service_1 = require("../../db/neo4j/neo4j.service");
const signup_dto_interface_1 = require("../../../../shared/types/auth/signup.dto.interface");
const search_params_dto_interface_1 = require("../../../../shared/types/search/search-params.dto.interface");
const neo4j_driver_1 = require("neo4j-driver");
const pagination_interface_1 = require("../../../../shared/types/pagination/pagination.interface");
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
        const savedUser = neo4j_service_1.Neo4j.hydrateOne(res, user_entity_1.UserEntity);
        if (!savedUser) {
            throw new common_1.InternalServerErrorException();
        }
        return savedUser;
    }
    async findBy(key, value) {
        const res = await this.db.read(`MATCH (u:User {${key}: $${key}}) RETURN u`, { [key]: value });
        return neo4j_service_1.Neo4j.hydrateOne(res, user_entity_1.UserEntity);
    }
    async find(params) {
        var _a;
        const res = await this.db.read(`
      CALL db.index.fulltext.queryNodes("usersSearch", $search) YIELD node as u, score
      WHERE ($workSchedule IS NULL OR u.workSchedule = $workSchedule)
        AND ($workType IS NULL OR u.workType = $workType)
        AND (u.english >= $english OR (NOT EXISTS(u.english) AND $english = ${search_params_dto_interface_1.EnglishLevel.A1}))
        AND ($hourlyRateMin <= u.hourlyRate ${params.hourlyRateMax ? '<= $hourlyRateMax' : ''}
             OR NOT EXISTS (u.hourlyRate))
        AND ($experience = 0
             OR ($experience <> -1 AND u.experience >= $experience)
             OR ($experience = -1 AND u.experience <= 0))
      WITH u ORDER BY score
      WITH collect(u) as users
      WITH users, size(users) as total
      UNWIND users as u
      RETURN u, total
      SKIP $page
      LIMIT $limit`, Object.assign(Object.assign({}, params), { english: params.english || search_params_dto_interface_1.EnglishLevel.A1, hourlyRateMin: params.hourlyRateMin || 0, search: `${params.search || '*'}~`, workSchedule: params.workSchedule || null, workType: params.workType || null, page: neo4j_driver_1.int(params.page * params.limit), limit: neo4j_driver_1.int(params.limit) }));
        return {
            items: res.records.map(record => new user_entity_1.UserEntity(record.get('u').properties)),
            page: params.page,
            limit: params.limit,
            total: ((_a = res.records[0]) === null || _a === void 0 ? void 0 : _a.get('total')) || 0
        };
    }
    async validateUserPassword({ email, password }) {
        const user = await this.findBy('email', email);
        return user && await user.validatePassword(password) ? user : null;
    }
};
UserRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [neo4j_service_1.Neo4j])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map
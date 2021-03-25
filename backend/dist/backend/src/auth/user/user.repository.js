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
const utils_1 = require("../../shared/utils");
let UserRepository = class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async create(signUpDto) {
        const salt = await bcrypt_1.genSalt();
        const res = await this.db.write(`CREATE (u:User)
             SET u += $properties, u.id = randomUUID(), u.createdAt = timestamp()
             RETURN u`, {
            properties: Object.assign(Object.assign(Object.assign({}, user_entity_1.UserEntity.dummy()), signUpDto), { salt, password: await bcrypt_1.hash(signUpDto.password, salt) }),
        });
        const newUser = this.hydrate(res);
        return newUser ? new user_entity_1.UserEntity(newUser) : null;
    }
    async save(user) {
        await this.db.write(`MATCH (u:User {id: $id}) SET u += $properties RETURN u`, {
            id: user.id,
            properties: JSON.parse(JSON.stringify(user))
        });
        return user;
    }
    async findBy(key, value) {
        const res = await this.db.read(`MATCH (u:User {${key}: $${key}}) RETURN u`, { [key]: value });
        const user = this.hydrate(res);
        return user ? new user_entity_1.UserEntity(user) : null;
    }
    hydrate(res) {
        if (!res.records.length) {
            return null;
        }
        return res.records[0].get('u').properties;
    }
    async validateUserPassword({ email, password }) {
        const user = await this.findBy('email', email);
        return user && await user.validatePassword(password) ? user : null;
    }
};
UserRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [neo4j_service_1.Neo4jService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map
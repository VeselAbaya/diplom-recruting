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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4j = void 0;
const common_1 = require("@nestjs/common");
const neo4j_injection_tokens_1 = require("./neo4j.injection-tokens");
const neo4j_driver_1 = require("neo4j-driver");
let Neo4j = class Neo4j {
    constructor(config, driver) {
        this.config = config;
        this.driver = driver;
    }
    static hydrateOne(res, cypherAlias, Type) {
        if (!res.records.length) {
            return null;
        }
        const raw = res.records[0].get(cypherAlias).properties;
        return Type ? new Type(raw) : raw;
    }
    static getMatchParams(paramsObj) {
        return Object.entries(paramsObj).reduce((paramStrings, [key, value]) => {
            if (value !== null && value !== undefined) {
                paramStrings.push(`${key} : $${key}`);
            }
            return paramStrings;
        }, []).join(',');
    }
    read(cypher, params, database) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j_driver_1.session.READ,
        }).run(cypher, params);
    }
    write(cypher, params, database) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j_driver_1.session.WRITE,
        }).run(cypher, params);
    }
    onApplicationShutdown() {
        this.driver.close();
    }
};
Neo4j = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(neo4j_injection_tokens_1.NEO4J_CONFIG)),
    __param(1, common_1.Inject(neo4j_injection_tokens_1.NEO4J_DRIVER)),
    __metadata("design:paramtypes", [Object, Object])
], Neo4j);
exports.Neo4j = Neo4j;
//# sourceMappingURL=neo4j.service.js.map
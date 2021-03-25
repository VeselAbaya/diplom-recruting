"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Neo4jModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jModule = void 0;
const neo4j_driver_1 = require("neo4j-driver");
const common_1 = require("@nestjs/common");
const neo4j_service_1 = require("./neo4j.service");
const neo4j_injection_tokens_1 = require("./neo4j.injection-tokens");
let Neo4jModule = Neo4jModule_1 = class Neo4jModule {
    static forRoot(config) {
        return {
            module: Neo4jModule_1,
            global: true,
            providers: [
                neo4j_service_1.Neo4j,
                {
                    provide: neo4j_injection_tokens_1.NEO4J_CONFIG,
                    useValue: config
                },
                {
                    provide: neo4j_injection_tokens_1.NEO4J_DRIVER,
                    useFactory: async () => {
                        const driver = neo4j_driver_1.default.driver(`${config.scheme}://${config.host}:${config.port}`, neo4j_driver_1.default.auth.basic(config.username, config.password), { disableLosslessIntegers: true });
                        await driver.verifyConnectivity();
                        return driver;
                    }
                }
            ]
        };
    }
};
Neo4jModule = Neo4jModule_1 = __decorate([
    common_1.Module({
        exports: [neo4j_service_1.Neo4j]
    })
], Neo4jModule);
exports.Neo4jModule = Neo4jModule;
//# sourceMappingURL=neo4j.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const _config_1 = require("./config");
const neo4j_module_1 = require("./db/neo4j/neo4j.module");
const auth_module_1 = require("./components/auth/auth.module");
const users_module_1 = require("./components/users/users.module");
const requests_module_1 = require("./components/requests/requests.module");
const relationships_module_1 = require("./components/relationships/relationships.module");
const messages_module_1 = require("./components/messages/messages.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            neo4j_module_1.Neo4jModule.forRoot(_config_1.Config.DB),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            requests_module_1.RequestsModule,
            relationships_module_1.RelationshipsModule,
            messages_module_1.MessagesModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
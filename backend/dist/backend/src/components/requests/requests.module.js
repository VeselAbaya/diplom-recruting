"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsModule = void 0;
const common_1 = require("@nestjs/common");
const requests_service_1 = require("./requests.service");
const requests_controller_1 = require("./requests.controller");
const users_module_1 = require("../users/users.module");
const request_repository_1 = require("./request/request.repository");
const passport_1 = require("@nestjs/passport");
const messages_module_1 = require("../messages/messages.module");
let RequestsModule = class RequestsModule {
};
RequestsModule = __decorate([
    common_1.Module({
        controllers: [requests_controller_1.RequestsController],
        providers: [requests_service_1.RequestsService, request_repository_1.RequestRepository],
        imports: [users_module_1.UsersModule, passport_1.PassportModule.register({ defaultStrategy: 'jwt' }), messages_module_1.MessagesModule]
    })
], RequestsModule);
exports.RequestsModule = RequestsModule;
//# sourceMappingURL=requests.module.js.map
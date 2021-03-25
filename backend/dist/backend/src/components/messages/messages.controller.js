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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const routes_1 = require("../../../../shared/routes");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../users/user/user.decorator");
const user_entity_1 = require("../users/user/user.entity");
const message_entity_1 = require("./message/message.entity");
let MessagesController = class MessagesController {
    constructor(messages) {
        this.messages = messages;
    }
    getMessages(user, toUserId) {
        return this.messages.getMessages(user.id, toUserId);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, user_decorator_1.User()),
    __param(1, common_1.Param('toUser', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getMessages", null);
MessagesController = __decorate([
    common_1.Controller(routes_1.SubPath.messages()),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
exports.MessagesController = MessagesController;
//# sourceMappingURL=messages.controller.js.map
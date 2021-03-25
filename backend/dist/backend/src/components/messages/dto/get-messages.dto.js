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
exports.GetMessagesDto = void 0;
const get_messages_dto_interface_1 = require("../../../../../shared/types/message/get-messages.dto.interface");
const user_entity_1 = require("../../users/user/user.entity");
const message_entity_1 = require("../message/message.entity");
const class_transformer_1 = require("class-transformer");
class GetMessagesDto {
    constructor(fromUser, toUser, messages) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.messages = messages;
    }
    static transformUserToPlain(user) {
        return { id: user.id };
    }
}
__decorate([
    class_transformer_1.Transform(({ value }) => GetMessagesDto.transformUserToPlain(value), { toPlainOnly: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], GetMessagesDto.prototype, "fromUser", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => GetMessagesDto.transformUserToPlain(value), { toPlainOnly: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], GetMessagesDto.prototype, "toUser", void 0);
exports.GetMessagesDto = GetMessagesDto;
//# sourceMappingURL=get-messages.dto.js.map
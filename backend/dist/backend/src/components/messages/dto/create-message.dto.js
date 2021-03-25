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
exports.CreateMessageDto = void 0;
const class_validator_1 = require("class-validator");
const create_message_dto_interface_1 = require("../../../../../shared/types/message/create-message.dto.interface");
class CreateMessageDto {
    constructor(fromUserId, toUserId, text) {
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.text = text;
    }
}
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "fromUserId", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "toUserId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "text", void 0);
exports.CreateMessageDto = CreateMessageDto;
//# sourceMappingURL=create-message.dto.js.map
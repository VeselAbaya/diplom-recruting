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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const message_repository_1 = require("./message/message.repository");
const message_entity_1 = require("./message/message.entity");
const create_message_dto_1 = require("./dto/create-message.dto");
let MessagesService = class MessagesService {
    constructor(messages) {
        this.messages = messages;
    }
    getMessages(fromUserId, toUserId) {
        return this.messages.getMessages(fromUserId, toUserId);
    }
    save(message) {
        return this.messages.save(message);
    }
};
MessagesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map
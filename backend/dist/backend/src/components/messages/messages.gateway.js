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
var MessagesGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_service_1 = require("./messages.service");
const common_1 = require("@nestjs/common");
const create_message_dto_1 = require("./dto/create-message.dto");
let MessagesGateway = MessagesGateway_1 = class MessagesGateway {
    constructor(messages) {
        this.messages = messages;
    }
    static getRoomName(fromUserId, toUserId) {
        return [fromUserId, toUserId].sort().join('_');
    }
    async handleMessage(client, message) {
        await this.messages.save(message);
        this.server.to(message.toUserId).emit('newMessage', message);
        this.server.to(MessagesGateway_1.getRoomName(message.fromUserId, message.toUserId)).emit('message', message);
    }
    handleMessagesOpen(client, data) {
        client.leaveAll();
        client.join([MessagesGateway_1.getRoomName(data.fromUserId, data.toUserId), data.fromUserId]);
    }
    handleUserIsOnline(client, data) {
        client.join(data.userId);
    }
    handleDisconnect(client) {
        client.leaveAll();
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('message'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('messagesOpen'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleMessagesOpen", null);
__decorate([
    websockets_1.SubscribeMessage('userIsOnline'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleUserIsOnline", null);
__decorate([
    __param(0, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleDisconnect", null);
MessagesGateway = MessagesGateway_1 = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesGateway);
exports.MessagesGateway = MessagesGateway;
//# sourceMappingURL=messages.gateway.js.map
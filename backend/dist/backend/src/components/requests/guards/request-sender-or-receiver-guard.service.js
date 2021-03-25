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
exports.RequestSenderOrReceiverGuard = void 0;
const common_1 = require("@nestjs/common");
const request_repository_1 = require("../request/request.repository");
let RequestSenderOrReceiverGuard = class RequestSenderOrReceiverGuard {
    constructor(requests) {
        this.requests = requests;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const isSender = await this.requests.userIsSenderOfRequest(req.user, req.params.id);
        const isReceiver = await this.requests.userIsReceiverOfRequest(req.user, req.params.id);
        return isSender || isReceiver;
    }
};
RequestSenderOrReceiverGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [request_repository_1.RequestRepository])
], RequestSenderOrReceiverGuard);
exports.RequestSenderOrReceiverGuard = RequestSenderOrReceiverGuard;
//# sourceMappingURL=request-sender-or-receiver-guard.service.js.map
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
exports.RequestSenderGuard = void 0;
const common_1 = require("@nestjs/common");
const request_repository_1 = require("../request/request.repository");
let RequestSenderGuard = class RequestSenderGuard {
    constructor(requests) {
        this.requests = requests;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        return this.requests.userIsSenderOfRequest(req.user, req.params.id);
    }
};
RequestSenderGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [request_repository_1.RequestRepository])
], RequestSenderGuard);
exports.RequestSenderGuard = RequestSenderGuard;
//# sourceMappingURL=request-sender.guard.js.map